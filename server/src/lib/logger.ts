import { createLogger, format, transports } from "winston";

const customFormat = format.printf((info: any) => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const logger = createLogger({
  level: "info", // minimum level
  format: format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    // new transports.File({ filename: "error.log", level: "error" }),
    // new transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        customFormat
      ),
    })
  );
}

export default logger;
