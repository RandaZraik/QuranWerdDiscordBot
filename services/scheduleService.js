import fs from 'fs';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/config.js';
import logger from '../logger.js';
import { db } from './firebaseService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, process.env.QURAN_MODE === 'tadabbur' ? '../images/quranTadabbur' : '../images/quran');
const TOTAL_QURAN_PAGES = 604;

async function getCurrentPageIndex() {
  try {
    const snapshot = await db.ref('pageIndex').once('value');
    const data = snapshot.val();
    if (data && data.currentPageIndex) {
      return data.currentPageIndex;
    } else {
      await setCurrentPageIndex(1);
      return 1;
    }
  } catch (error) {
    logger.error("Error reading page index from Firebase: " + error.message);
    return 1;
  }
}

async function setCurrentPageIndex(pageIndex) {
  try {
    await db.ref('pageIndex').set({ currentPageIndex: pageIndex });
  } catch (error) {
    logger.error("Error writing page index to Firebase: " + error.message);
  }
}

function getImagePaths(startPage, count) {
    return Array.from({ length: count }, (_, i) => {
        const page = (startPage + i) % TOTAL_QURAN_PAGES || TOTAL_QURAN_PAGES;
        return path.join(IMAGES_DIR, `page${String(page).padStart(3, '0')}.png`);
    });
}

async function postImages(channel) {
    let currentPageIndex = await getCurrentPageIndex();
    const imagePaths = getImagePaths(currentPageIndex, config.pagesPerPost);
    let successfulPosts = 0;

    for (const imagePath of imagePaths) {
        try {
            await channel.send({ files: [imagePath] });
            logger.info(`SUCCESS: ${imagePath}`);
            successfulPosts += 1;
        } catch (error) {
            logger.error(`FAIL: ${imagePath} - ${error.message}`);
        }
    }

    if (successfulPosts > 0) {
        await setCurrentPageIndex((currentPageIndex + successfulPosts) % TOTAL_QURAN_PAGES || 1);
    }
}

export async function postWerd(client, channelId) {
    const channel = await client.channels.fetch(channelId).catch(() => {
        logger.error("Failed to fetch channel for daily posts.");
        return null;
    });
    if (channel) await postImages(channel);
}

// Schedules daily posting based on the configured cron schedule
export function scheduleWerd(client, channelId, cronSchedule) {
    cron.schedule(cronSchedule, async () => {
        postWerd(client, channelId);
    });

    logger.info(`Scheduled daily Quran Werd`);
}
