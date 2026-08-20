import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { config } from '../config/config.js';
import serviceAccount from '../firebase-service-account.json' with { type: "json" };

const APP_NAME = 'quran-werd-discord-bot';
const app = getApps().find(({ name }) => name === APP_NAME) ?? initializeApp({
  credential: cert(serviceAccount),
  databaseURL: config.firebaseDatabaseURL
}, APP_NAME);

export const db = getDatabase(app);
