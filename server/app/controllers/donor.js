import DonorData from "../models/donor.js";
export const registerDonor = async (req, res) => {
  console.log("Donor registered successfully!");
  const donor = req.body;
  let max;
  let registration_number = 1;
  let length = await DonorData.countDocuments();
  if (length > 0) {
    max = await DonorData.findOne().sort({ registrationNumber: -1 }).limit(1);
    console.log(max.registrationNumber);
    registration_number = max.registrationNumber + 1;
  }

  const savedDonor = await new DonorData({
    ...donor,
    registrationNumber: registration_number,
  });
  try {
    savedDonor.save();

    res.status(201).send({ donor, id: savedDonor._id });
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const getDonor = async (req, res) => {
  try {
    const id = req.params.id;
    const singleDonor = await DonorData.findById(id, { _id: 0 });

    res.status(200).json(singleDonor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDonors = async (req, res) => {
  try {
    const allDonors = await DonorData.find();
    res.status(200).json(allDonors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateDonor = async (req, res) => {
  try {
    const id = req.params.id;
    await DonorData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const donor = await DonorData.findById(id);
    res.status(200).json(donor);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDonor = async (req, res) => {
  const id = req.params.id;
  try {
    await DonorData.findByIdAndRemove(id).exec();
    res.send("Successfull Deleted!");
  } catch (error) {
    console.log(error);
  }
};


