import App from './app';
import logger from './logger';
import HealthRoutes from './routes/health.routes';
// import MongoClientClass from "./databases/mongo/setup";

async function startServer() {
  try {
    // await MongoClientClass.initialize().initializeMongoConnection();

    const app = new App([new HealthRoutes()]);
    await app.listen();
  } catch (error) {
    logger.error(`Errored out in server ${error}`)
    // console.log(`Errored out in server ${error}`);
  }
}
startServer();
