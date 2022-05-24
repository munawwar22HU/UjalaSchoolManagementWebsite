import DonationData from "../models/donation.js";
export const registerDonation = async (req, res) => {
  console.log("Donation registered successfully!");
  const donation = req.body;
  let max;
  let receipt_number = 1;
  let length = await DonationData.countDocuments();
  if (length > 0) {
    max = await DonationData.findOne().sort({ receiptNumber: -1 }).limit(1);
    console.log(max.receiptNumber);
    receipt_number = max.receiptNumber + 1;
  }
  const savedDonation = await new DonationData({
    ...donation,
    receiptNumber: receipt_number,
  });
  try {
    savedDonation.save();
    res.status(201).send({ donation, id: savedDonation._id });
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const getDonation = async (req, res) => {
  try {
    const id = req.params.id;
    const singleDonation = await DonationData.findById(id, { _id: 0 });

    res.status(200).json(singleDonation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    const allDonations = await DonationData.find();
    console.log(allDonations);
    res.status(200).json(allDonations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateDonation = async (req, res) => {
  try {
    const id = req.params.id;
    await DonationData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const donation = await DonationData.findById(id);
    res.status(200).json(donation);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDonation = async (req, res) => {
  const id = req.params.id;
  try {
    await DonationData.findByIdAndRemove(id).exec();
    res.send("Successfull Deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const getDonationsByDonor = async (req, res) => {
  const id = req.params.id;
  try {
    const allDonations = await DonationData.find({ donorId: id });
    res.status(200).json(allDonations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
