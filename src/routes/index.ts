import { Routes } from '@/interfaces/routes.interface';
import HealthRoutes from './health.routes';
import CustomerRoutes from './customers.routes';

const routes: Routes[] = [
  new HealthRoutes(),
  new CustomerRoutes()
];

export default routes; 