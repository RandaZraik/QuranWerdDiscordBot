
# Quran Werd Discord Bot

A simple Discord bot designed to post Quran Werd daily in a designated channel.

## Requirements

- Node.js (version 18 or higher)
- Docker (if running in a container)
- [Discord bot](https://discord.com/developers/applications) created with the appropriate permissions:
   - Send Messages.
   - Privileged Gateway Intents.

## Firebase Setup
We need a database where we can maintain the next page index to post. To do so:
1. Create a Firebase project dedicated for this bot. More info: [Link](https://firebase.google.com/docs/web/setup).
2. Create a Realtime database under the created project. More info: [Link](https://firebase.google.com/docs/database/web/start).
3. Generate a private key for your Service account, and save the JSON file as `firebase-service-account.json` in the root folder. More info: [Link](https://firebase.google.com/docs/admin/setup).

## Environment Setup

- Only required if running the bot locally or via Docker.
- `.env` File:

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
   - Update the cron schedule in your workflow file `.github/workflows/schedule.yml` if needed (default is 3:00 AM UTC).
   - Push the repository to your GitHub account.
   - In your repository settings, add the following secrets:
     - DISCORD_TOKEN
     - CHANNEL_ID
     - PAGES_PER_POST
     - FIREBASE_DATABASE_URL
     - FIREBASE_SERVICE_ACCOUNT_JSON (paste the entire contents of your `firebase-service-account.json` file).
