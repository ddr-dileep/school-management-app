import mongoose, { Schema } from "mongoose";

const studentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    subjects: [{ type: String }],
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    fees: { type: mongoose.Schema.Types.ObjectId, ref: "Fees" },
    isDeleted: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: true },
    profilePic: { type: String },
    dob: { type: Date },
    previousWorkingHistory: [],
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    gender: { type: String },
    nationality: { type: String },
    religion: { type: String },
    fathersName: { type: String },
    mothersName: { type: String },
    occupation: { type: String },
    familyIncome: { type: String },
    records: [],
  },
  { timestamps: true }
);

const studentModel = mongoose.model<IStudent>("Student", studentSchema);
export default studentModel;

interface IStudent extends Document {
  name: string;
  age: number;
  subjects: string[];
  class: mongoose.Types.ObjectId;
  school: mongoose.Types.ObjectId;
  fees: mongoose.Types.ObjectId;
  isDeleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  isStudent: boolean;
  profilePic: string;
  dob: Date;
  previousWorkingHistory: any[];
  address: string;
  phone: string;
  email: string;
  gender: string;
  nationality: string;
  religion: string;
  fathersName: string;
  mothersName: string;
  occupation: string;
  familyIncome: string;
  records: any[];
  isAccountActive: boolean;
}
