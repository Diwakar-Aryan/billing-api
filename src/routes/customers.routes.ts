import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { CustomerController } from '@/controllers/customers.controller';

class CustomerRoutes implements Routes {
  public path = '';
  public router: Router = Router();
  private customerController: CustomerController;

  constructor() {
    this.customerController = new CustomerController();
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.post(`${this.path}/customers`, this.customerController.createCustomer);

    this.router.get(`${this.path}/customers`, this.customerController.getAllCustomers);
 
    this.router.put(`${this.path}/customer/:id`, this.customerController.updateCustomer);

    this.router.delete(`${this.path}/customer/:id`, this.customerController.deleteCustomer);
  }
}

export default CustomerRoutes;
