import mongoose, { Document, Schema } from "mongoose";

interface ISchool extends Document {
  name: string;
  address: string;
  admins: mongoose.Types.ObjectId[];
  classes: mongoose.Types.ObjectId[];
  SchoolBuses: mongoose.Types.ObjectId[];
  principal: { type: mongoose.Schema.Types.ObjectId; ref: "Principal" };
  createdBy: { type: mongoose.Schema.Types.ObjectId; ref: "Super-Admin" };
}

const SchoolSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    address: { type: String },
    isActive: { type: Boolean, required: true, default: false },
    logo: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/school-logo-design_706452-12.jpg",
    },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    SchoolBuses: [{ type: mongoose.Schema.Types.ObjectId, ref: "SchoolBuses" }],
    principal: { type: mongoose.Schema.Types.ObjectId, ref: "Principal" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Super-Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const schoolModel = mongoose.model<ISchool>("School", SchoolSchema);

export default schoolModel;
