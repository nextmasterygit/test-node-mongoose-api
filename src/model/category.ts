import mongoose from 'mongoose';
import { CategorySchemaType } from '../interface/modelInterface';

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
const Category = mongoose.model<CategorySchemaType>('Category', productSchema);

export { Category };
