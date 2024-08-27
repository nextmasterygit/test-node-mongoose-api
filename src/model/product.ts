import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      sparse: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      lowercase: true,
      index: true,
      required: [true, 'Name is missing'],
      unique: true,
      trim: true
    },
    images: [],
    price: {
      type: Number
    },
    publishby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      index: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      index: true
    }
  },
  { timestamps: true }
);
const Member = mongoose.model('Member', productSchema);

export { Member };
