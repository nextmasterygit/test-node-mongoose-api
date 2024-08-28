import { ObjectId } from 'mongoose';

export interface MemberSchemaType {
  _id?: string;
  fullName: string;
  phone?: string;
  cnic?: string;
  email?: string;
}
export interface ProductSchemaType {
  _id?: string;
  title: string;
  images?: string[];
  price?: number;
  publishby?: string | ObjectId;
  category?: string | ObjectId;
}
export interface CategorySchemaType {
  _id?: string;
  name: string;
}
