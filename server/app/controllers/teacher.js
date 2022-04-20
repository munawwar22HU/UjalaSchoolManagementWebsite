import TeacherData from "../models/teacher.js";
export const registerTeacher = async (req, res) => {
  const teacher = req.body;

  const savedTeacher = await new TeacherData(teacher);
  try {
    savedTeacher.save();

    res.status(201).send(savedTeacher);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const allTeachers = await TeacherData.find(
      {},
      {
        name: 1,
        contactNumber: 1,
        email: 1,
        address: 1,
        class: 1,
        image: 1,
      }
    );

    res.status(200).json(allTeachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  const id = req.params.id;
  try {
    await TeacherData.findByIdAndRemove(id).exec();
    res.send("Successfull Deleted!");
  } catch (error) {
    console.log(error);
  }
};

export const getTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const singleTeacher = await TeacherData.findById(id, { _id: 0 });

    res.status(200).json(singleTeacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  console.log("Update Teacher");
  try {
    const id = req.params.id;
    console.log(id);
    await TeacherData.findByIdAndUpdate(id, {
      $set: req.body,
    }).exec();
    const teacher = await TeacherData.findById(id, { _id: 0 });
    res.status(200).json(teacher);
    return;
  } catch (error) {
    console.log(error);
  }
};
