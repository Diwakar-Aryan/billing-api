import { Customer } from "@/databases/mongo/models/customer.model";
import { ICustomer } from "@/types/interfaces";
import { BaseRepository } from "./base/base.repository";

export class CustomersRepository extends BaseRepository<ICustomer> {
  constructor() {
    super(Customer);
  }

}
