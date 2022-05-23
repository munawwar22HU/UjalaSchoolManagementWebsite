import mongoose from "mongoose";
const feesSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  transportFee: {
    type: Number,
    required: true,
  },
  tutionFee: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalFee: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  issueDate: {
    type: String,
    required: true,
  },
  paidFee: {
    type: Number,
  },
  paidDate: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  issuedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issuedByName: {
    type: String,
    required: true,
  },
  voucherNumber: {
    type: Number,
    required: true,
  },
});

const fees = mongoose.model("fees", feesSchema);
export default fees;
