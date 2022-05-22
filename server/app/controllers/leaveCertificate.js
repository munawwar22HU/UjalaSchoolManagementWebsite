import leaveCertificate from "../models/leaveCertificate.js";
import LeaveCertificateData from "../models/leaveCertificate.js";
import StudentData from "../models/student.js";
export const registerLeaveCertificate = async (req, res) => {
  console.log("Leave registered successfully!");
  const leave = req.body;
  let max;
  let certificate_number = 1;
  let length = await LeaveCertificateData.countDocuments();
  if (length > 0) {
    max = await LeaveCertificateData.findOne()
      .sort({ certificateNumber: -1 })
      .limit(1);
    console.log(max.certificateNumber);
    certificate_number = max.certificateNumber + 1;
  }
  const savedLeaveCertificate = await new LeaveCertificateData({
    ...leave,
    certificateNumber: certificate_number,
  });

  try {
    const id = leave.studentId;
    savedLeaveCertificate.save();
    // set student status to inactive
    const student = await StudentData.findById(id);
    student.status = "inactive";
    student.save();

    res.status(201).send(savedLeaveCertificate);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

// get all Student
export const getCertificates = async (req, res) => {
  try {
    const allCertificates = await LeaveCertificateData.find({});

    res.status(200).json(allCertificates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCertificate = async (req, res) => {
  console.log(req.params);
  try {
    const id = req.params.id;
    const singleCertificate = await LeaveCertificateData.findById(id, {
      _id: 0,
      __v: 0,
    });

    res.status(200).json(singleCertificate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const id = req.params.id;
    const certficate = await LeaveCertificateData.findById(id);
    const studentId = certficate.studentId;
    const student = await StudentData.findById(studentId);
    student.status = "active";
    student.save();

    await LeaveCertificateData.findByIdAndRemove(id).exec();
    res.send("Successfull Deleted!");
  } catch (error) {
    console.log(error);
  }
};
export const updateCertificate = async (req, res) => {
  console.log("Update Certificate");
  try {
    const id = req.params.id;
    console.log(id);
    await LeaveCertificateData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const certficate = await LeaveCertificateData.findById(id);
    res.status(200).json(certficate);
    return;
  } catch (error) {
    console.log(error);
  }
};
