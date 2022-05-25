import SponsorshipData from "../models/sponsorships.js";
export const registerSponsorship = async (req, res) => {
  console.log("Sponsorship registered successfully!");
  const sponsorship = req.body;
  let max;
  let sponsorship_number = 1;
  let length = await SponsorshipData.countDocuments();
  if (length > 0) {
    max = await SponsorshipData.findOne()
      .sort({ sponsorshipNumber: -1 })
      .limit(1);
    console.log(max.sponsorshipNumber);
    sponsorship_number = max.sponsorshipNumber + 1;
  }
  const savedSponsorship = await new SponsorshipData({
    ...sponsorship,
    sponsorshipNumber: sponsorship_number,
  });
  try {
    savedSponsorship.save();
    res.status(201).send({ sponsorship, id: savedSponsorship._id });
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};
export const getSponsorship = async (req, res) => {
  try {
    const id = req.params.id;
    const singleSponsorship = await SponsorshipData.findById(id, { _id: 0 });

    res.status(200).json(singleSponsorship);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSponsorships = async (req, res) => {
  try {
    const allSponsorships = await SponsorshipData.find(
      {},
      {
        sponsorshipNumber: 1,
        sponsorName: 1,
        studentName: 1,
        studentRollNumber: 1,
        startDate: 1,
        endDate: 1,
        amount: 1,
        numberOfInstallments: 1,
      }
    );
    console.log(allSponsorships);
    res.status(200).json(allSponsorships);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSponsorship = async (req, res) => {
  console.log("Sponsorship updated successfully!");
  console.log(req.body);
  try {
    const id = req.params.id;
    const b = req.body;
    console.log(b);
    await SponsorshipData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const sponsorship = await SponsorshipData.findById(id);
    res.status(200).json(sponsorship);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSponsorship = async (req, res) => {
  const id = req.params.id;
  try {
    await SponsorshipData.findByIdAndDelete(id);
    res.status(200).json({ message: "Sponsorship deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSponsorshipsBySponsor = async (req, res) => {
  try {
    const id = req.params.id;
    const sponsorship = await SponsorshipData.find({ sponsorId: id });
    res.status(200).json(sponsorship);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
