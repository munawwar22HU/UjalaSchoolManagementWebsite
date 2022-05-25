import SponsorData from "../models/sponsor.js";
export const registerSponsor = async (req, res) => {
  console.log("Sponsor registered successfully!");
  const sponsor = req.body;
  let max;
  let registration_number = 1;
  let length = await SponsorData.countDocuments();
  if (length > 0) {
    max = await SponsorData.findOne().sort({ registrationNumber: -1 }).limit(1);
    console.log(max.registrationNumber);
    registration_number = max.registrationNumber + 1;
  }

  const savedSponsor = await new SponsorData({
    ...sponsor,
    registrationNumber: registration_number,
  });
  try {
    savedSponsor.save();

    res.status(201).send({ sponsor, id: savedSponsor._id });
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const getSponsor = async (req, res) => {
  try {
    const id = req.params.id;
    const singleSponsor = await SponsorData.findById(id, { _id: 0 });

    res.status(200).json(singleSponsor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSponsors = async (req, res) => {
  try {
    const allSponsors = await SponsorData.find();
    res.status(200).json(allSponsors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSponsor = async (req, res) => {
  console.log("Sponsor updated successfully!");
  console.log(req.body);
  try {
    const id = req.params.id;
    await SponsorData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const sponsor = await SponsorData.findById(id);
    res.status(200).json(sponsor);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSponsor = async (req, res) => {
  const id = req.params.id;
  await SponsorData.findByIdAndDelete(id);
  res.status(200).json({ message: "Sponsor deleted successfully" });
};
