import mongoose from "mongoose";
const studentSchema = mongoose.Schema({
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
  religion: {
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
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dateOfAdmission: {
    type: String,
    required: true,
  },
  previousSchool: {
    type: String,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherCNIC: {
    type: String,
    required: true,
  },
  motherContactNumber: {
    type: String,
    required: true,
  },
  motherAddress: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  fatherCNIC: {
    type: String,
    required: true,
  },
  fatherContactNumber: {
    type: String,
    required: true,
  },
  fatherAddress: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

const student = mongoose.model("student", studentSchema);
export default student;
