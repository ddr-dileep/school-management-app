import mongoose, { Document, Schema } from "mongoose";

const feesSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    terms: [{ type: String }],
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
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Super-Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const feesModel = mongoose.model<IFeesSchema>("Fees", feesSchema);
export default feesModel;

interface IFeesSchema extends Document {
  amount: number;
  terms: string[];
  class: mongoose.Types.ObjectId;
  school: mongoose.Types.ObjectId;
  isDeleted: boolean;
  createdBy: mongoose.Types.ObjectId;
}
