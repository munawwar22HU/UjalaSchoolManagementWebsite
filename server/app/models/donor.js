import mongoose from "mongoose";
const donorSchema = new mongoose.Schema({
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
    type: Number,
  },
});

const donor = mongoose.model("donor", donorSchema);
export default donor;
