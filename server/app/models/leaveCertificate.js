import mongoose from "mongoose";
const leaveCertificateSchema = mongoose.Schema({
  certificateNumber: {
    type: Number,
    required: true,
  },
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
  reason: {
    type: String,
    required: true,
  },
  approvedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approvedByName: {
    type: String,
    required: true,
  },
  approvedDate: {
    type: String,
    required: true,
  },
});

const leaveCertificate = mongoose.model(
  "leavecertificate",
  leaveCertificateSchema
);
export default leaveCertificate;
