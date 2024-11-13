import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import { config } from './config/config.js';

const logFilePath = path.resolve("logs/logs.txt");
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
if (!fs.existsSync(logFilePath))
    fs.closeSync(fs.openSync(logFilePath, 'w'));

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: logFilePath })
    ],
});

export default logger;
