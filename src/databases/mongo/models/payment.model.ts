// models/Payment.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IPayment } from '@/types/interfaces';
import { PaymentMethod, PaymentStatus } from '@/types/enums';

const paymentSchema = new Schema<IPayment>({
  paymentNumber: {
    type: String,
    required: true,
    unique: true
  },
  invoiceId: {
    type: String,
    ref: 'Invoice',
    required: true
  },
  customerId: {
    type: String,
    ref: 'Customer',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethod),
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING
  },
  transactionId: String,
  gatewayResponse: {
    type: Schema.Types.Mixed
  },
  notes: String,
  refundAmount: {
    type: Number,
    default: 0
  },
  refundDate: Date,
  refundReason: String
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ invoiceId: 1 });
paymentSchema.index({ customerId: 1, status: 1 });
paymentSchema.index({ paymentDate: 1 });

export const Payment: Model<IPayment> = mongoose.model<IPayment>('Payment', paymentSchema);