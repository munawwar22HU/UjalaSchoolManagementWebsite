import mongoose from "mongoose";
const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "donor",
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  receivedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  receivedBy: {
    type: String,
    required: true,
  },
  isCheque: {
    type: Boolean,
    required: true,
  },
  iban: {
    type: String,
  },
  bankName: {
    type: String,
  },
  branchAddress: {
    type: String,
  },
  chequeImage: {
    type: String,
  },
  receiptNumber: {
    type: Number,
    required: true,
  },
});
const donations = mongoose.model("donation", donationSchema);
export default donations;
