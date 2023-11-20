import mongoose from 'mongoose';

const ruleSchema = mongoose.Schema(
  {
    cause: {
      type: Array,
      required: true,
    },
    operatorCause: {
      type: String,
      required: true,
    },
    conclude: {
      type: Array,
      required: true,
    },
    operatorConclude: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Rules = mongoose.model('rule', ruleSchema);