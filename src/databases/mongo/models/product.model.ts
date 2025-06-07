// models/Product.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IProduct } from '@/types/interfaces';
import { ProductStatus, BillingType, RecurringInterval } from '@/types/enums';

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  sku: {
    type: String,
    unique: true,
    required: true
  },
  category: String,
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  taxable: {
    type: Boolean,
    default: true
  },
  taxRate: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.ACTIVE
  },
  billingType: {
    type: String,
    enum: Object.values(BillingType),
    default: BillingType.ONE_TIME
  },
  recurringInterval: {
    type: String,
    enum: Object.values(RecurringInterval),
    required: function(this: IProduct) {
      return this.billingType === BillingType.RECURRING;
    }
  }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ sku: 1 });
productSchema.index({ status: 1, billingType: 1 });

export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);