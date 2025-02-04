
# Quran Werd Discord Bot

A simple Discord bot designed to post Quran Werd daily in a designated channel.

## Requirements

- Node.js (version 18 or higher)
- Docker (if running in a container)
- [Discord bot](https://discord.com/developers/applications) created with the appropriate permissions:
   - Send Messages.
   - Privileged Gateway Intents.

## Firebase Setup
   - Firebase Project:
     - Create a project in Firebase dedicated for this bot.
     - For more info: [Creating a Firebase Project](https://firebase.google.com/docs/web/setup).
   - Realtime Database:
     - Create a database under the created project to maintain the next page index to post.
     - For more info: [Creating a Realtime Database](https://firebase.google.com/docs/database/web/start).
   - Service Account File:
     - In the Firebase Console, generate a private key from your project’s Service accounts tab.
     - Download the JSON file and save it as `firebase-service-account.json` in the root folder.
     - For more info: [Firebase Admin Setup](https://firebase.google.com/docs/admin/setup).

## Environment Setup

- `.env` File:
   - Only required if running the bot locally or via Docker.
   - Create `.env` file in the root folder using the existing `.env.example` template file.
   - Configure the new file with the necessary environment variables:
     ```
     DISCORD_TOKEN=<YOUR_DISCORD_BOT_TOKEN>
     CHANNEL_ID=<YOUR_CHANNEL_ID>
     CRON_SCHEDULE=<YOUR_CRON_SCHEDULE>            # Example: '38 7 * * *' to post daily at 7:38 AM
     PAGES_PER_POST=<NUMBER_OF_PAGES_TO_POST>      # Number of Quran pages to post each day
     FIREBASE_DATABASE_URL=<FIREBASE_DATABASE_URL> # e.g., https://<your-project-id>-default-rtdb.firebaseio.com
     ```
- Logs:
   - `logs/logs.txt`: Gets auto created to track bot activity, errors, and posting events.

## Running the Bot

- To run it locally:
   - Setup `.env` file as explained above.
   - Run the following commands:
     ```
     npm install
     npm start
     ```

- To run it with Docker:
   - Setup `.env` file as explained above.
   - For Windows, run the PowerShell script: `.\run.ps1`.
   - For Linux, run the Bash script: `./run.sh`.

- To run it with GitHub Actions:
   - Update the cron schedule in your workflow file `.github/workflows/schedule.yml` if needed (default is 4:00 AM UTC).
   - Push the repository to your GitHub account.
   - In your repository settings, add the following secrets:
     - DISCORD_TOKEN
     - CHANNEL_ID
     - PAGES_PER_POST
     - FIREBASE_DATABASE_URL
     - FIREBASE_SERVICE_ACCOUNT_JSON (paste the entire contents of your `firebase-service-account.json` file).
