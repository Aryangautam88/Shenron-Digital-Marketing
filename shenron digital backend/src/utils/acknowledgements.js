import { createMailer } from "./mailer.js";
import { Enquiry } from "../models/Enquiry.js";

// Persisted queue survives restarts. Expired leases allow recovery after a crash.
export function startAcknowledgements(env) {
  if (!env.smtpHost || !env.mailFrom) {
    console.warn("SMTP is not configured. Enquiries will be saved; acknowledgement emails remain queued.");
    return () => {};
  }
  const transport = createMailer(env);
  let busy = false;
  let stopped = false;
  async function tick() {
    if (busy || stopped) return;
    busy = true;
    try {
      await Enquiry.updateMany({ "acknowledgement.status": "sending", "acknowledgement.attempts": { $gte: 5 }, "acknowledgement.nextAttemptAt": { $lte: new Date() } }, { $set: { "acknowledgement.status": "failed" } });
      const enquiry = await Enquiry.findOneAndUpdate({
        "acknowledgement.status": { $in: ["pending", "sending"] },
        "acknowledgement.nextAttemptAt": { $lte: new Date() },
        "acknowledgement.attempts": { $lt: 5 },
      }, { $set: { "acknowledgement.status": "sending", "acknowledgement.nextAttemptAt": new Date(Date.now() + 5 * 60 * 1000) }, $inc: { "acknowledgement.attempts": 1 } }, { new: true, sort: { createdAt: 1 } });
      if (!enquiry) return;
      try {
        await transport.sendMail({
          from: env.mailFrom, to: enquiry.email,
          subject: "We've received your enquiry — Kravs Infotech",
          text: `Hello ${enquiry.name},\n\nThank you for contacting Kravs Infotech. We have received your enquiry and our team will review it and get in touch.\n\nReference: ${enquiry._id}\n\nBest regards,\nKravs Infotech`,
        });
        await Enquiry.updateOne({ _id: enquiry._id }, { $set: { "acknowledgement.status": "sent", "acknowledgement.sentAt": new Date() } });
      } catch (error) {
        await Enquiry.updateOne({ _id: enquiry._id }, { $set: {
          "acknowledgement.status": enquiry.acknowledgement.attempts >= 5 ? "failed" : "pending",
          "acknowledgement.nextAttemptAt": new Date(Date.now() + 60000 * 2 ** enquiry.acknowledgement.attempts),
        } });
        console.error("Acknowledgement delivery failed; check SMTP configuration. Enquiry remains saved.");
        console.error("SMTP diagnostic:", JSON.stringify({ code: error.code, command: error.command, responseCode: error.responseCode }));
      }
    } catch { console.error("Could not process the acknowledgement queue."); }
    finally { busy = false; }
  }
  const timer = setInterval(tick, 10000);
  timer.unref();
  void tick();
  return () => { stopped = true; clearInterval(timer); transport.close(); };
}
