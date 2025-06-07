// models/Invoice.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IInvoice, IInvoiceDetail } from '@/types/interfaces';
import { InvoiceStatus, DiscountType } from '@/types/enums';

const invoiceSchema = new Schema<IInvoice>({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: String,
    ref: 'Customer',
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  totalTax: {
    type: Number,
    default: 0
  },
  totalDiscount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: Object.values(InvoiceStatus),
    default: InvoiceStatus.DRAFT
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  remainingAmount: {
    type: Number,
    default: function(this: IInvoice) {
      return this.total;
    }
  },
  notes: String,
  terms: String,
  paymentLink: String
}, {
  timestamps: true
});

const invoiceDetailSchema = new Schema<IInvoiceDetail>({
  invoiceId: {
    type: String,
    ref: 'Invoice',
    required: true
  },
  productId: {
    type: String,
    ref: 'Product'
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  discountType: {
    type: String,
    enum: Object.values(DiscountType),
    default: DiscountType.FIXED
  },
  taxRate: {
    type: Number,
    default: 0
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  lineTotal: {
    type: Number,
    required: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
invoiceSchema.index({ customerId: 1, status: 1 });
invoiceSchema.index({ dueDate: 1, status: 1 });
invoiceSchema.index({ issueDate: 1 });

invoiceDetailSchema.index({ invoiceId: 1 });
invoiceDetailSchema.index({ productId: 1 });
invoiceDetailSchema.index({ invoiceId: 1, sortOrder: 1 });

export const Invoice: Model<IInvoice> = mongoose.model<IInvoice>('Invoice', invoiceSchema);
export const InvoiceDetail: Model<IInvoiceDetail> = mongoose.model<IInvoiceDetail>('InvoiceDetail', invoiceDetailSchema);