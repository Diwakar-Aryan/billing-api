import { CustomersRepository } from "@/repositories/customers.repository";
import { ICustomer } from "@/types/interfaces";
import { CustomerStatus } from "@/types/enums";
import { BaseService } from "./base/base.servce";

const customersRepository = new CustomersRepository();

export class CustomersService extends BaseService<ICustomer> {
  constructor() {
    super(customersRepository);
  }

  public async createCustomer(customerData: Partial<ICustomer>): Promise<ICustomer> {
    const existingCustomer = await this.repository.findOne({
      $or: [
        { email: customerData.email },
        ...(customerData.phone ? [{ phone: customerData.phone }] : [])
      ]
    });

    if (existingCustomer) {
      const updatedCustomer = await this.repository.updateOne(
        { _id: existingCustomer._id },
        { $set: customerData }
      );

      if (!updatedCustomer) {
        throw new Error("Failed to update customer");
      }

      return updatedCustomer;
    }

    return this.repository.create(customerData);
  }

  public async getCustomerByEmail(email: string): Promise<ICustomer | null> {
    return this.repository.findOne({ email });
  }

  public async softDeleteCustomer(id: string): Promise<ICustomer | null> {
    return this.repository.updateOne({ _id: id }, { status: CustomerStatus.INACTIVE });
  }
}
