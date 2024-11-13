
# Quran Werd Discord Bot

A simple Discord bot designed to post Quran Werd daily in a designated channel.

## Requirements

- Node.js (version 18 or higher)
- Docker (if running in a container)
- Discord bot created with the appropriate permissions:
   - Send Messages.
   - Privileged Gateway Intents.

## Environment Setup

- `.env`: Configure it with the necessary environment variables:
   ```
   DISCORD_TOKEN=<YOUR_DISCORD_BOT_TOKEN>
   CHANNEL_ID=<YOUR_CHANNEL_ID>
   CRON_SCHEDULE=<YOUR_CRON_SCHEDULE>          # Example: '38 7 * * *' to post daily at 7:38 AM
   PAGES_PER_POST=<NUMBER_OF_PAGES_TO_POST>    # Number of Quran pages to post each day
   ```
- `pageIndex.json`: Already exists to track the current page index.
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
