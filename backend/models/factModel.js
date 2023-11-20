import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    fact: {
      type: String,
      required: true,
    },
    descliption: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('facts', bookSchema);
