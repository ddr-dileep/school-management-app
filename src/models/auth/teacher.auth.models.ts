import mongoose, { Document, Schema } from "mongoose";

const teacherSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String },
    age: { type: Number },
    phone: { type: String },
    address: { type: String },
    isAccountActive: { type: Boolean, default: true },
    gender: { type: String },
    subjects: [{ type: String }],
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Super-Admin" },
    isDeleted: { type: Boolean },
    assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    salary: { type: mongoose.Schema.Types.ObjectId, ref: "Salary" },
    experience: { type: String },
    joiningDate: { type: Date },
    dob: { type: Date },
    previousWorkingHistory: [],
    isTeacher: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const teacherModel = mongoose.model<ITeacher>("Teacher", teacherSchema);
export default teacherModel;

interface ITeacher extends Document {
  name: string;
  age: number;
  subjects: string[];
  school: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
  assignedClass: mongoose.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  isAccountActive: boolean;
  gender: string;
}
