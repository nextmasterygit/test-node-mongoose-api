import mongoose from 'mongoose';
import { ProductSchemaType } from '../interface/modelInterface';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      index: true,
      required: [true, 'Title is missing'],
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
const Product = mongoose.model<ProductSchemaType>('Product', productSchema);

export { Product };
