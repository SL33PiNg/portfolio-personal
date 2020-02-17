const appRoot = require('app-root-path')
const { createLogger, format, transports } = require('winston')
const { combine, json, colorize, simple } = format
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    format: json(),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: combine(colorize(), simple())
  }
}

// eslint-disable-next-line new-cap
const logger = new createLogger({
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false
})

logger.stream = {
  write(message, encoding) {
    console.log(message)
    logger.info(message)
  }
}

module.exports = logger
