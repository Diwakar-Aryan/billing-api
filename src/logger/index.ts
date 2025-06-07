import devLogger from './devLogger';
import uatLogger from './uatLogger';
import productionLogger from './productionLogger';

import configClass from "../configs"
const config = configClass.initialize()

let logger: any = null;

if (config.getEnv.NODE_ENV === 'production') {
    logger = productionLogger();
}

if (config.getEnv.NODE_ENV === 'uat') {
    logger = uatLogger();
}

if (config.getEnv.NODE_ENV === 'development') {
    logger = devLogger();
}

export default logger;