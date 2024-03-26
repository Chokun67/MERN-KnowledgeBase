import mongoose from 'mongoose';

const factSchema = mongoose.Schema(
  {
    fact: {
      type: String,
      required: true,
    },
    descliption: {
      type: String,
      required: true,
    },picture:{
      type: String,
      required: false
    },category_id:{
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

export const Fact = mongoose.model('facts', factSchema);
