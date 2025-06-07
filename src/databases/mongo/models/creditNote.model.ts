import mongoose, { Schema, Model } from 'mongoose';
import { ICreditNote } from '@/types/interfaces';
import { CreditNoteReason, CreditNoteStatus } from '@/types/enums';

const creditNoteSchema = new Schema<ICreditNote>({
  creditNoteNumber: {
    type: String,
    required: true,
    unique: true
  },
  invoiceId: {
    type: String,
    ref: 'Invoice'
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
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  reason: {
    type: String,
    enum: Object.values(CreditNoteReason),
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: Object.values(CreditNoteStatus),
    default: CreditNoteStatus.DRAFT
  }
}, {
  timestamps: true
});

// Indexes
creditNoteSchema.index({ customerId: 1 });
creditNoteSchema.index({ invoiceId: 1 });

export const CreditNote: Model<ICreditNote> = mongoose.model<ICreditNote>('CreditNote', creditNoteSchema);