import { CustomerType, CustomerStatus } from '@/types/enums';
import { AddressDto } from './address.dto';


export class CustomerDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: AddressDto;
  billingAddress?: AddressDto;
  taxId?: string;
  customerType?: CustomerType;
  status?: CustomerStatus;
  paymentTerms?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
