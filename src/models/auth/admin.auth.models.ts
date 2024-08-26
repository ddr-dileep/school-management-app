import mongoose, { Schema } from "mongoose";

const AdminSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
    isAccountActive: { type: Boolean, default: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Super-Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

export default AdminModel;

interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isAccountActive: boolean;
}
