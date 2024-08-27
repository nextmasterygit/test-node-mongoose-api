import mongoose from 'mongoose';
import { MemberSchemaType } from '../interface/modelInterface';
const memberSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      sparse: true,
      unique: true,
      trim: true
    },
    fullName: {
      type: String,
      lowercase: true,
      index: true,
      required: [true, 'Name is missing'],
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      sparse: true
    },
    cnic: {
      type: String,
      unique: true,
      sparse: true
    },

    email: {
      type: String,
      trim: true,
      sparse: true,
      lowercase: true,
      unique: true
    }
  },
  { timestamps: true }
);
const Member = mongoose.model<MemberSchemaType>('Member', memberSchema);

export { Member };
