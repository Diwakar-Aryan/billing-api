import { CustomersRepository } from "@/repositories/customers.repository";
import { ICustomer } from "@/types/interfaces";
import { CustomerStatus } from "@/types/enums";
import { CustomerDto } from "@/dtos/customer.dto";
import logger from '@/logger';

export class CustomersService {
  private repository: CustomersRepository;

  constructor() {
    this.repository = new CustomersRepository();
  }

  public async createCustomer(customerData: CustomerDto): Promise<ICustomer> {
    try {
      const existingCustomer = await this.repository.findOne({
        $or: [
          { email: customerData.email },
          ...(customerData.phone ? [{ phone: customerData.phone }] : [])
        ]
      });
      if (existingCustomer) {
        logger.info('Existing customer found. Updating customer.');
        const updatedCustomer = await this.repository.updateOne(
          { _id: existingCustomer._id },
          { $set: customerData }
        );

        if (!updatedCustomer) {
          logger.error('Failed to update existing customer');
          throw new Error("Failed to update customer");
        }
        logger.info('Customer updated successfully');
        return updatedCustomer;
      }
      const newCustomer = await this.repository.create(customerData);
      logger.info('New customer created');
      return newCustomer;
    } catch (error: any) {
      logger.error('Error in createCustomer');
      throw error;
    }
  }
  public async getCustomerByEmail(email: string): Promise<ICustomer | null> {
    try {
      logger.info('Fetching customer by email');
      return await this.repository.findOne({ email });
    } catch (error: any) {
      logger.error('Error fetching customer by email', { email, error: error.message });
      throw error;
    }
  }

  public async softDeleteCustomer(id: string): Promise<ICustomer | null> {
    try {
      logger.info('Soft deleting customer');
      const deletedCustomer = await this.repository.updateOne({ _id: id }, { status: CustomerStatus.INACTIVE });
      if (!deletedCustomer) {
        logger.warn('Customer not found for soft delete');
      } else {
        logger.info('Customer soft deleted successfully');
      }
      return deletedCustomer;
    } catch (error: any) {
      logger.error('Error soft deleting customer', {error: error.message });
      throw error;
    }
  }

  public async getAll(query: any): Promise<ICustomer[]> {
    try {
      const customers = await this.repository.find(query);
      logger.info(`Retrieved ${customers.length} customers`);
      return customers;
    } catch (error: any) {
      logger.error('Error fetching customers', { error: error.message });
      throw error;
    }
  }

  public async update(id: string, data: Partial<CustomerDto>): Promise<ICustomer | null> {
    try {
      const updatedCustomer = await this.repository.updateOne({ _id: id }, { $set: data });
      if (!updatedCustomer) {
        logger.warn('Customer not found for update');
      } else {
        logger.info('Customer updated successfully');
      }
      return updatedCustomer;
    } catch (error: any) {
      logger.error('Error updating customer', { error: error.message });
      throw error;
    }
  }
}
