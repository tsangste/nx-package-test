import { utilities, WinstonModule } from 'nest-winston'
import winston from 'winston'
import Transport from 'winston-transport'

export function createLogger(serviceName: string) {
  const winstonTransports: Transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        utilities.format.nestLike(serviceName, { colors: process.env.NO_COLOR === 'false', prettyPrint: true })
      ),
    }),
  ]

  return WinstonModule.createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    defaultMeta: { service: serviceName },
    transports: winstonTransports,
  })
}
