import FeesData from "../models/fees.js";
export const registerFees = async (req, res) => {
  console.log("registerFees");
  const fees = req.body;
  let max;
  let fees_number = 1;
  let length = await FeesData.countDocuments();
  if (length > 0) {
    max = await FeesData.findOne().sort({ voucherNumber: -1 }).limit(1);
    console.log(max.voucherNumber);
    fees_number = max.voucherNumber + 1;
  }

  const savedFees = await new FeesData({
    ...fees,
    voucherNumber: fees_number,
    status: "unpaid",
  });
  console.log(savedFees);
  try {
    savedFees.save();

    res.status(201).send(savedFees);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const getFees = async (req, res) => {
  try {
    const id = req.params.id;
    const singleVoucher = await FeesData.findById(id, {
      _id: 0,
      __v: 0,
    });

    res.status(200).json(singleVoucher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateFees = async (req, res) => {
  try {
    const id = req.params.id;
    await FeesData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const voucher = await FeesData.findById(id);
    res.status(200).json(voucher);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFees = async (req, res) => {
  try {
    const id = req.params.id;
    await FeesData.findByIdAndRemove(id).exec();
    res.send("Successfull Deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const getVouchers = async (req, res) => {
  try {
    const allVouchers = await FeesData.find(
      {},
      {
        studentId: 1,
        studentName: 1,
        rollNumber: 1,
        class: 1,
        voucherNumber: 1,
        totalFee: 1,
        issueDate: 1,
        dueDate: 1,
        status: 1,
      }
    );

    res.status(200).json(allVouchers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const generateAll = async (req, res) => {
  try {
    // generate voucher for each student in the array
    const array = req.body;
    let max;
    let fees_number = 1;
    let length = await FeesData.countDocuments();
    if (length > 0) {
      max = await FeesData.findOne().sort({ voucherNumber: -1 }).limit(1);
      console.log(max.voucherNumber);
      fees_number = max.voucherNumber + 1;
    }
    // traverse the array using the for of loop
    for (const student of array) {
      // create a new voucher object
      const newVoucher = new FeesData({
        ...student,
        voucherNumber: fees_number,
        status: "unpaid",
      });
      // save the voucher object
      let save = await newVoucher.save();
      // increment the voucher number
      fees_number++;
    }
    // return promise

    res.status(200).json({ message: "Successfully Generated" });
  } catch (error) {
    console.log(error);
  }
};

export const getStudentPaidVouchers = async (req, res) => {
  try {
    const allVouchers = await FeesData.find(
      {
        status: "paid",
        studentId: req.params.id,
      },
      {
        class: 1,
        voucherNumber: 1,
        totalFee: 1,
        issueDate: 1,
        dueDate: 1,
        paidDate: 1,
        paidFee: 1,
      }
    );

    res.status(200).json(allVouchers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentUnpaidVouchers = async (req, res) => {
  try {
    const allVouchers = await FeesData.find(
      {
        status: "unpaid",
        studentId: req.params.id,
      },
      {
        class: 1,
        voucherNumber: 1,
        totalFee: 1,
        issueDate: 1,
        dueDate: 1,
      }
    );

    res.status(200).json(allVouchers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
