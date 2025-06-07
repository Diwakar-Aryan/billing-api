// models/Subscription.ts
import mongoose, { Schema, Model } from 'mongoose';
import { ISubscription } from '@/types/interfaces';
import { SubscriptionStatus, BillingCycle } from '@/types/enums';

const subscriptionSchema = new Schema<ISubscription>({
  customerId: {
    type: String,
    ref: 'Customer',
    required: true
  },
  productId: {
    type: String,
    ref: 'Product',
    required: true
  },
  planName: String,
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  billingCycle: {
    type: String,
    enum: Object.values(BillingCycle),
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    default: SubscriptionStatus.ACTIVE
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  lastBillingDate: Date,
  autoRenew: {
    type: Boolean,
    default: true
  },
  trialEndDate: Date,
  cancelledAt: Date,
  cancelReason: String
}, {
  timestamps: true
});

// Indexes
subscriptionSchema.index({ customerId: 1, status: 1 });
subscriptionSchema.index({ nextBillingDate: 1, status: 1 });

export const Subscription: Model<ISubscription> = mongoose.model<ISubscription>('Subscription', subscriptionSchema);