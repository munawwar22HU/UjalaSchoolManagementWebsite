import mongoose from "mongoose";
const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  registrationNumber: {
    required: true,
    type: Number,
  },
});
const sponsor = mongoose.model("sponsor", sponsorSchema);
export default sponsor;
