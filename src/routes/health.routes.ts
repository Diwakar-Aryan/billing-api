import {Router, Request, Response} from 'express';
import {Routes} from '../interfaces/routes.interface';

class HealthRoutes implements Routes {
  public path = '';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    console.log(this.path);
    this.router.get(`${this.path}/health`, (req: Request, res: Response) =>
      res.send('OK'),
    );
  }
}

export default HealthRoutes;
