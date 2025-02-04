
# Quran Werd Discord Bot

A simple Discord bot designed to post Quran Werd daily in a designated channel.

## Requirements

- Node.js (version 18 or higher)
- Docker (if running in a container)
- [Discord bot](https://discord.com/developers/applications) created with the appropriate permissions:
   - Send Messages.
   - Privileged Gateway Intents.
- Firebase Realtime Database: Create a firebase database to maintain the next page index to post.

## Environment Setup

- `.env` File: Configure it with the necessary environment variables:
   ```
   DISCORD_TOKEN=<YOUR_DISCORD_BOT_TOKEN>
   CHANNEL_ID=<YOUR_CHANNEL_ID>
   CRON_SCHEDULE=<YOUR_CRON_SCHEDULE>            # Example: '38 7 * * *' to post daily at 7:38 AM
   PAGES_PER_POST=<NUMBER_OF_PAGES_TO_POST>      # Number of Quran pages to post each day
   FIREBASE_DATABASE_URL=<FIREBASE_DATABASE_URL> # e.g., https://<your-project-id>-default-rtdb.firebaseio.com
   ```
- Firebase Service Account File:
   - In the Firebase Console, generate a private key from your project’s Service accounts tab.
   - Download the JSON file and save it as `firebase-service-account.json` in the root folder.
   - For more info: [Firebase Admin Setup](https://firebase.google.com/docs/admin/setup).
- Logs:
   - `logs/logs.txt`: Gets auto created to track bot activity, errors, and posting events.

## Running the Bot

- To run it locally;
   ```
   npm install
   npm start
   ```

- To run it with Docker:
   - For Windows, run the PowerShell script: `.\run.ps1`.
   - For Linux, run the Bash script: `./run.sh`.
