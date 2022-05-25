import mongoose from "mongoose";
const sponsorshipSchema = new mongoose.Schema({
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sponsor",
    required: true,
  },
  sponsorName: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentRollNumber: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  numberOfInstallments: {
    type: Number,
    required: true,
  },
  installment: [
    {
      installmentNumber: {
        type: Number,
        required: true,
      },
      installmentDate: {
        type: String,
        required: true,
      },
      installmentAmount: {
        type: Number,
        required: true,
      },
      isPaid: {
        type: Boolean, // true if paid
        required: true,
      },
    },
  ],
  sponsorshipNumber: {
    type: Number,
    required: true,
  },
});

const sponsorship = mongoose.model("sponsorship", sponsorshipSchema);
export default sponsorship;
