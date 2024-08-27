import mongoose, { Document, Schema } from "mongoose";

interface IClass extends Document {
  name: string;
  address: string;
  admins: mongoose.Types.ObjectId[];
  students: mongoose.Types.ObjectId[];
  teachers: mongoose.Types.ObjectId[];
}

const classModelSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String },
    logo: { type: String },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
    principal: { type: mongoose.Schema.Types.ObjectId, ref: "Principal" },
    fees: { type: mongoose.Schema.Types.ObjectId, ref: "Fees" },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    classMonitors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Super-Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const classModel = mongoose.model<IClass>("Class", classModelSchema);

export default classModel;
