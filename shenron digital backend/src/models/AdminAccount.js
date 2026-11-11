import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  sessionVersion: { type: Number, default: 0 },
  resetHash: String,
  resetExpiresAt: Date,
  resetRequestedAt: Date,
}, { timestamps: true });

export const AdminAccount = mongoose.model("AdminAccount", schema);

// The environment password bootstraps the account only. Resets persist in MongoDB.
export async function getAdminAccount(env) {
  return AdminAccount.findOneAndUpdate({ email: env.adminEmail }, {
    $setOnInsert: { passwordHash: env.adminPasswordHash, sessionVersion: 0 },
  }, { upsert: true, new: true });
}
