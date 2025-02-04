import admin from 'firebase-admin';
import { config } from '../config/config.js';
import serviceAccount from '../firebase-service-account.json' assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseDatabaseURL
  });
}

export const db = admin.database();
