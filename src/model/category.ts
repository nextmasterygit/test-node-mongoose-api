import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      sparse: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      lowercase: true,
      index: true,
      required: [true, 'Category is missing'],
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);
const Member = mongoose.model('Member', productSchema);

export { Member };
