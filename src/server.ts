import App from './app';
import routes from './routes';
import MongoClientClass from "./databases/mongo/setup.mongo";

async function startServer() {
  try {
    await MongoClientClass.initialize().initializeMongoConnection();
    const app = new App(routes);
    await app.listen();
  } catch (error) {
    console.log(`Errored out in server ${error}`);
  }

}

startServer();
