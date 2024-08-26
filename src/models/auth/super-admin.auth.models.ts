import mongoose, { Schema } from "mongoose";

const SuperAdminSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    schools: [],
    isSuperAdmin: { type: Boolean, default: true },
    isAccountActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SuperAdminModel = mongoose.model<ISuperAdmin>(
  "Super-Admin",
  SuperAdminSchema
);

export default SuperAdminModel;

interface ISuperAdmin extends Document {
  username: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
  isAccountActive: boolean;
}
