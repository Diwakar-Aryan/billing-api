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

import { Type } from "class-transformer";
import { IsString, IsEmail, IsOptional, ValidateNested, IsEnum, IsNumber } from "class-validator";

export class CreateCustomerRequest {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress?: AddressDto;

  @IsOptional()
  @IsString()
  taxId?: string;

  @IsEnum(CustomerType)
  customerType?: CustomerType;

  @IsOptional()
  @IsEnum(CustomerStatus)
  status?: CustomerStatus = CustomerStatus.ACTIVE;

  @IsOptional()
  @IsNumber()
  paymentTerms?: number;

  static map(row: CreateCustomerRequest): CustomerDto | null {
    if (!row) return null;

    const entity = new CustomerDto();
    entity.firstName = row.firstName;
    entity.lastName = row.lastName;
    entity.email = row.email;
    entity.phone = row.phone;
    entity.address = row.address;
    entity.billingAddress = row.billingAddress;
    entity.taxId = row.taxId;
    entity.customerType = row.customerType;
    entity.status = row.status ?? CustomerStatus.ACTIVE;
    entity.paymentTerms = row.paymentTerms;
    return entity;
  }
}
