import winston = require('winston');

export const Logger = (service: string) =>
  winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    defaultMeta: { service },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      }),
    ],
  });
