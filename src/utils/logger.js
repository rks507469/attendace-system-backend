import { createLogger, format, transports } from 'winston';


const loggerTransports = [
    new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    })
];

if(process.env.PRO_ENV == 'DEV') {
    loggerTransports.push(
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    );
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: loggerTransports
});

export default logger;