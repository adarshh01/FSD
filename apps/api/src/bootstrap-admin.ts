import dotenv from 'dotenv';
import mongoose from 'mongoose'; import path from 'node:path'; import fs from 'node:fs';
import { User } from './models.js';
const rootEnv=path.resolve(process.cwd(),'../../.env');dotenv.config({path:fs.existsSync(rootEnv)?rootEnv:path.resolve(process.cwd(),'.env')});

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) throw new Error('Set BOOTSTRAP_ADMIN_EMAIL to the email of an already registered account.');
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecotrack');
  try {
    if (await User.exists({ role: 'ADMIN', active: true })) {
      console.log('An active administrator already exists. No changes were made.');
      return;
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error(`No registered account found for ${email}. Register this account first, then rerun the bootstrap command.`);
    user.role = 'ADMIN';
    user.active = true;
    user.sessionVersion = (user.sessionVersion || 0) + 1;
    await user.save();
    console.log(`Promoted ${email} to ADMIN. Sign in again to refresh the session.`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
