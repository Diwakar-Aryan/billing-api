// models/TaxConfig.ts
import mongoose, { Schema, Model } from 'mongoose';
import { ITaxConfig } from '@/types/interfaces';
import { TaxType, CustomerStatus } from '@/types/enums';

const taxConfigSchema = new Schema<ITaxConfig>({
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  type: {
    type: String,
    enum: Object.values(TaxType),
    default: TaxType.PERCENTAGE
  },
  applicableRegions: [String],
  status: {
    type: String,
    enum: Object.values(CustomerStatus),
    default: CustomerStatus.ACTIVE
  }
}, {
  timestamps: true
});

export const TaxConfig: Model<ITaxConfig> = mongoose.model<ITaxConfig>('TaxConfig', taxConfigSchema);