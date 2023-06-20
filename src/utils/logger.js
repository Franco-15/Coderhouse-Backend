import winston from "winston";
import __dirname from "./utils.js";
import program from "../config/commander.config.js";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "redBG",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "gray",
        debug: "white",
    },
};

const developmentTransport = [
    new winston.transports.Console({
        level: "debug",
    }),
];

const productionTransport = [
    new winston.transports.Console({
        level: "info",
    }),
    new winston.transports.File({
        filename: `${__dirname}/../logs/errors.log`,
        level: "info",
    }),
];

const enviromentTransport =
    program.opts().environment === "production"
        ? productionTransport
        : developmentTransport;

const outputFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} - [${level}]: ${message}`;
});

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.timestamp(),
        outputFormat
    ),
    transports: enviromentTransport,
});

export const logger_init = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} ${req.originalUrl}`);
    next();
};
