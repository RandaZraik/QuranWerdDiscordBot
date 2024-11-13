import dotenv from 'dotenv';
dotenv.config();

export const config = {
    token: process.env.DISCORD_TOKEN,
    channelId: process.env.CHANNEL_ID,
    cronSchedule: process.env.CRON_SCHEDULE || '0 4 * * *',
    pagesPerPost: parseInt(process.env.PAGES_PER_POST, 10) || 2
};
