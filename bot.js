import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/config.js';
import { postWerd, scheduleWerd } from './services/scheduleService.js';
import logger from './logger.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
    logger.info(`Logged in as ${client.user.tag}!`);

    if (process.env.RUN_ONCE === 'true') {
        await postWerd(client, config.channelId);
        process.exit(0);
    } else {
        scheduleWerd(client, config.channelId, config.cronSchedule);
    }
});

client.login(config.token).catch(error => {
    logger.error("Failed to log in: " + error.message);
    process.exit(1);
});
