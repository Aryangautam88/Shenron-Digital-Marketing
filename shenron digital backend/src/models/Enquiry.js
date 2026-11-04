import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, maxlength: 254 },
  company: { type: String, maxlength: 150, default: "" },
  phone: { type: String, maxlength: 30, default: "" },
  message: { type: String, required: true, maxlength: 5000 },
  services: [String],
  consentAt: { type: Date, required: true },
  status: { type: String, enum: ["new", "in-progress", "resolved"], default: "new" },
  notes: { type: String, maxlength: 5000, default: "" },
  reply: {
    draft: { type: String, maxlength: 10000, default: "" },
    lastMessage: String,
    sentAt: Date,
    lockedUntil: Date,
  },
  acknowledgement: {
    status: { type: String, enum: ["pending", "sending", "sent", "failed"], default: "pending" },
    attempts: { type: Number, default: 0 },
    nextAttemptAt: { type: Date, default: Date.now },
    sentAt: Date,
  },
}, { timestamps: true });
schema.index({ createdAt: -1 });
schema.index({ "acknowledgement.status": 1, "acknowledgement.nextAttemptAt": 1 });
export const Enquiry = mongoose.model("Enquiry", schema);
