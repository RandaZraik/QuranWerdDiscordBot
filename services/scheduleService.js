import fs from 'fs';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/config.js';
import logger from '../logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '../images/quran');
const TOTAL_QURAN_PAGES = 604;
const PAGE_INDEX_FILE = './pageIndex.json';

function getCurrentPageIndex() {
    const data = JSON.parse(fs.readFileSync(PAGE_INDEX_FILE, 'utf8'));
    return data.currentPageIndex || 1;
}

function setCurrentPageIndex(pageIndex) {
    fs.writeFileSync(PAGE_INDEX_FILE, JSON.stringify({ currentPageIndex: pageIndex }), 'utf8');
}

function getImagePaths(startPage, count) {
    return Array.from({ length: count }, (_, i) => {
        const page = (startPage + i) % TOTAL_QURAN_PAGES || TOTAL_QURAN_PAGES;
        return path.join(IMAGES_DIR, `page${String(page).padStart(3, '0')}.png`);
    });
}

async function postImages(channel) {
    let currentPageIndex = getCurrentPageIndex();
    const imagePaths = getImagePaths(currentPageIndex, config.pagesPerPost);
    let successfulPosts = 0;

    for (const imagePath of imagePaths) {
        try {
          if (successfulPosts == 2) throw new Error('Test error');
            await channel.send({ files: [imagePath] });
            logger.info(`SUCESS: ${imagePath}`);
            successfulPosts += 1;
        } catch (error) {
            logger.error(`FAIL: ${imagePath} - ${error.message}`);
        }
    }

    if (successfulPosts > 0) {
        setCurrentPageIndex((currentPageIndex + successfulPosts) % TOTAL_QURAN_PAGES || 1);
    }
}

// Schedules daily posting based on the configured cron schedule
export function updateSchedule(client, channelId, cronSchedule) {
    cron.schedule(cronSchedule, async () => {
        const channel = await client.channels.fetch(channelId).catch(() => {
            logger.error("Failed to fetch channel for daily posts.");
            return null;
        });
        if (channel) await postImages(channel);
    });

    logger.info(`Scheduled daily Quran Werd`);
}
