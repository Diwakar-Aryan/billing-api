// models/Customer.ts
import mongoose, { Schema, Model } from 'mongoose';
import { ICustomer, IAddress } from '@/types/interfaces';
import { CustomerType, CustomerStatus } from '@/types/enums';

const addressSchema = new Schema<IAddress>({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String }
});

const customerSchema = new Schema<ICustomer>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: addressSchema,
  billingAddress: addressSchema,
  taxId: String,
  customerType: {
    type: String,
    enum: Object.values(CustomerType),
    default: CustomerType.INDIVIDUAL
  },
  status: {
    type: String,
    enum: Object.values(CustomerStatus),
    default: CustomerStatus.ACTIVE
  },
  paymentTerms: {
    type: Number,
    default: 30
  }
}, {
  timestamps: true
});

// Indexes
customerSchema.index({ email: 1 });
customerSchema.index({ status: 1 });

export const Customer: Model<ICustomer> = mongoose.model<ICustomer>('Customer', customerSchema);