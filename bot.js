import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/config.js';
import { updateSchedule } from './services/scheduleService.js';
import logger from './logger.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
    updateSchedule(client, config.channelId, config.cronSchedule);
});

client.login(config.token).catch(error => {
    logger.error("Failed to log in: " + error.message);
    process.exit(1);
});
