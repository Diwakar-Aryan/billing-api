import { Request, Response } from 'express';
import { CustomerService } from '@/services/customers.service';
import { HttpResponse } from '@/interfaces/http.response';

export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  public createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await this.customerService.createCustomer(req.body);
      const response = new HttpResponse('Customer created successfully', customer);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const response = new HttpResponse(
        error.message,
        null
      );
      res.status(response.statusCode).json(response);
    }
  };

  public getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
      const customers = await this.customerService.getAllCustomers(req.query);
      const response = new HttpResponse('Customers retrieved successfully', customers);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const response = new HttpResponse(
        error.message,
      null
      );
      res.status(response.statusCode).json(response);
    }
  };


  public updateCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await this.customerService.updateCustomer(req.params.id, req.body);
      if (!customer) {
        const response = new HttpResponse('Customer not found', null);
        res.status(response.statusCode).json(response);
        return;
      }
      const response = new HttpResponse('Customer updated successfully', customer);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const response = new HttpResponse(
        error.message,
        null
      );
      res.status(response.statusCode).json(response);
    }
  };

  public deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const customer = await this.customerService.deleteCustomer(req.params.id);
      if (!customer) {
        const response = new HttpResponse('Customer not found', null);
        res.status(response.statusCode).json(response);
        return;
      }
      const response = new HttpResponse('Customer deleted successfully', customer);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const response = new HttpResponse(
        error.message ,
        null
      );
      res.status(response.statusCode).json(response);
    }
  };

}
