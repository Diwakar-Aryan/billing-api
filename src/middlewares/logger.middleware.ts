import winston from "winston";

const logDir = "../log/"
const NODE_ENV = "development"

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors)

export enum Environment {
  DEV = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}