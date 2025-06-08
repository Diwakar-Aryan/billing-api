import App from './app';
import MongoClientClass from './databases/mongo/setup.mongo';
import logger from './logger';
import routes from './routes';
async function startServer() {
  try {
    await MongoClientClass.initialize().initializeMongoConnection();
    const app = new App(routes);
    await app.listen();
  } catch (error) {
    logger.error(`Errored out in server ${error}`)
    // console.log(`Errored out in server ${error}`);
  }

}

startServer();
