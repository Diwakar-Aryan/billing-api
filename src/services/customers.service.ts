import { Customer } from '@/databases/mongo/models/customer.model';
import { ICustomer } from '@/types/interfaces';
import { CustomerStatus } from '@/types/enums';

export class CustomerService {
  public async createCustomer(customerData: Partial<ICustomer>): Promise<ICustomer> {
    const existingCustomer = await Customer.findOne({
      $or: [
        { email: customerData.email },
        ...(customerData.phone ? [{ phone: customerData.phone }] : [])
      ]
    });
    if (existingCustomer) {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        existingCustomer._id,
        { $set: customerData },
        { new: true, runValidators: true }
      );
      if (!updatedCustomer) {
        throw new Error('Failed to update customer');
      }
      return updatedCustomer;
    }
    const customer = new Customer(customerData);
    return await customer.save();
  }

  public async getAllCustomers(query: any = {}): Promise<ICustomer[]> {
    return await Customer.find(query).sort({ createdAt: -1 });
  }

  public async getCustomerByEmail(email: string): Promise<ICustomer | null> {
    return await Customer.findOne({ email });
  }

  public async updateCustomer(id: string, customerData: Partial<ICustomer>): Promise<ICustomer | null> {
    return await Customer.findByIdAndUpdate(
      id,
      { $set: customerData },
      { new: true, runValidators: true }
    );
  }

  public async deleteCustomer(id: string): Promise<ICustomer | null> {
    return await Customer.findByIdAndUpdate(
      id,
      { status: CustomerStatus.INACTIVE },
      { new: true }
    );
  }

}
