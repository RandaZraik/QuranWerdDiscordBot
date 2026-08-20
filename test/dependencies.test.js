import { generateKeyPairSync } from 'node:crypto';
import assert from 'node:assert/strict';
import test from 'node:test';
import { Client, GatewayIntentBits } from 'discord.js';
import { cert, deleteApp, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import cron from 'node-cron';

test('Discord client can be created without connecting', () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  assert.equal(client.isReady(), false);
  client.destroy();
});

test('Firebase Admin initializes through the modular API', async () => {
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const app = initializeApp({
    credential: cert({
      project_id: 'security-upgrade-test',
      client_email: 'test@security-upgrade-test.iam.gserviceaccount.com',
      private_key: privateKey.export({ type: 'pkcs8', format: 'pem' })
    }),
    databaseURL: 'https://security-upgrade-test.firebaseio.com'
  }, 'security-upgrade-test');

  assert.equal(getDatabase(app).app.name, 'security-upgrade-test');
  await deleteApp(app);
});

test('node-cron executes a task', async () => {
  let executionCount = 0;
  const task = cron.createTask('* * * * * *', () => {
    executionCount += 1;
  });

  try {
    await task.execute();
    assert.equal(executionCount, 1);
  } finally {
    await task.destroy();
  }
});
