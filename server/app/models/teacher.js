import mongoose from "mongoose";
const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  previousSchool: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const teacher = mongoose.model("teacher", teacherSchema);
export default teacher;
