import App from './app';
import HealthRoutes from './routes/health.routes';
// import MongoClientClass from "./databases/mongo/setup";

async function startServer() {
  try {
    // await MongoClientClass.initialize().initializeMongoConnection();

    const app = new App([new HealthRoutes()]);
    await app.listen();
  } catch (error) {
    console.log(`Errored out in server ${error}`);
  }
}
startServer();
