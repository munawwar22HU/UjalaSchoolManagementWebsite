import StudentData from "../models/student.js";
import TeacherData from "../models/teacher.js";

export const getAllClasses = async (req, res) => {
  // return all classes along with teacher name and the count of students in that class using TeacherData and StudentData
  // get all classes from the TeacherData
  const classes = await TeacherData.find({}, { class: 1, _id: 0 });
  let classList = [];
  for (const classObj of classes) {
    const teacher = await TeacherData.findOne({ class: classObj.class });
    console.log(teacher);
    const studentCount = await StudentData.find({
      class: classObj.class,
      status: "active",
    }).countDocuments();
    console.log(studentCount);
    classList.push({
      class: classObj.class,
      teacher: teacher.name,
      teacherId: teacher._id,
      strength: studentCount,
    });
  }
  // return array as json
  res.status(200).send(classList);
  //return classList;
};
