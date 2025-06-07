// types/interfaces.ts
import { Document } from 'mongoose';
import {
  CustomerType,
  CustomerStatus,
  ProductStatus,
  BillingType,
  RecurringInterval,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
  SubscriptionStatus,
  BillingCycle,
  DiscountType,
  TaxType,
  CreditNoteReason,
  CreditNoteStatus
} from './enums';

// Common Types
export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

// Document Interfaces
export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: IAddress;
  billingAddress?: IAddress;
  taxId?: string;
  customerType: CustomerType;
  status: CustomerStatus;
  paymentTerms: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  name: string;
  description?: string;
  sku: string;
  category?: string;
  unitPrice: number;
  currency: string;
  taxable: boolean;
  taxRate: number;
  status: ProductStatus;
  billingType: BillingType;
  recurringInterval?: RecurringInterval;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoice extends Document {
  invoiceNumber: string;
  customerId: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  terms?: string;
  paymentLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInvoiceDetail extends Document {
  invoiceId: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  discountType: DiscountType;
  taxRate: number;
  taxAmount: number;
  lineTotal: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment extends Document {
  paymentNumber: string;
  invoiceId: string;
  customerId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  status: PaymentStatus;
  transactionId?: string;
  gatewayResponse?: any;
  notes?: string;
  refundAmount: number;
  refundDate?: Date;
  refundReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscription extends Document {
  customerId: string;
  productId: string;
  planName?: string;
  startDate: Date;
  endDate?: Date;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
  status: SubscriptionStatus;
  nextBillingDate: Date;
  lastBillingDate?: Date;
  autoRenew: boolean;
  trialEndDate?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaxConfig extends Document {
  name: string;
  rate: number;
  type: TaxType;
  applicableRegions: string[];
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreditNote extends Document {
  creditNoteNumber: string;
  invoiceId?: string;
  customerId: string;
  issueDate: Date;
  amount: number;
  currency: string;
  reason: CreditNoteReason;
  description?: string;
  status: CreditNoteStatus;
  createdAt: Date;
  updatedAt: Date;
}