import { Request, Response } from 'express';
import { HttpResponse } from '@/interfaces/http.response';
import { CustomersService } from '@/services/customers.service';
import logger from '@/logger';
import { CustomerDto } from '@/dtos/customer.dto';

export class CustomerController {
  private customerService: CustomersService;
  constructor() {
    this.customerService = new CustomersService();
  }

  public createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerData:CustomerDto = req.body;
      if (!customerData) {
        const response = new HttpResponse('Invalid customer data', null);
        res.status(response.statusCode).json(response);
        return;
      }
      const customer = await this.customerService.createCustomer(customerData);
      logger.info('Customer created successfully');
      const response = new HttpResponse('Customer created successfully', customer);
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      logger.error('Error creating customer', { error: error.message });
      const response = new HttpResponse(
        error.message,
        null
      );
      res.status(response.statusCode).json(response);
    }
  };

  public getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
      const customers = await this.customerService.getAll(req.query);
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
      const customer = await this.customerService.update(req.params.id, req.body);
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
      const customer = await this.customerService.softDeleteCustomer(req.params.id);
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
