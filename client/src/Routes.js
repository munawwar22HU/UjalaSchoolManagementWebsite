// Authentication
import Login from "./screens/Login.js";
// User Profile
import Profile from "./components/Profile.js";
// Admin
import Admin from "./screens/Admin";
import RegisterUser from "./components/Admin/registerUser.js";
import UpdateUser from "./components/Admin/updateUser.js";
import ManageUsers from "./components/Admin/mangeUsers.js";
// Students
import Student from "./screens/Student.js";
import StudentDetails from "./components/Student/studentDetails.js";
import StudentRegister from "./components/Student/studentRegister.js";
import StudentUpdate from "./components/Student/studentUpdate";
// Teachers
import TeacherRegister from "./components/Teacher/teacherRegister.js";
import TeacherDetails from "./components/Teacher/teacherDetails.js";
import TeacherUpdate from "./components/Teacher/teacherUpdate.js";
// Leaving Certificate
import CertificateDetails from "./components/LeavingCertifcate/certificateDetails.js";
import CertificateEdit from "./components/LeavingCertifcate/certificateEdit.js";
import IssueCertificate from "./components/LeavingCertifcate/issueCertificate.js";

const routes = [
  {
    path: "/login",
    component: Login,
  },

  {
    path: "/student",
    component: Student,
    routes: [
      {
        path: "/student/profile",
        component: Profile,
      },
      {
        path: "/student/add-student",
        component: StudentRegister,
      },
      {
        path: "/student/manage-student",
        component: StudentDetails,
      },
      {
        path: "/student/add-teacher",
        component: TeacherRegister,
      },
      {
        path: "/student/manage-teacher",
        component: TeacherDetails,
      },
      {
        path: "/student/add-certificate",
        component: IssueCertificate,
      },
      {
        path: "/student/manage-certificate",
        component: CertificateDetails,
      },
      {
        path: "student/certificate/:id",
        component: CertificateEdit,
      },
      {
        path: "/student/teacher/:id",
        component: TeacherUpdate,
      },
      {
        path: "/student/:id",
        component: StudentUpdate,
      },
    ],
  },
  {
    path: "/admin",
    component: Admin,
    routes: [
      {
        path: "/admin/profile",
        component: Profile,
      },
      {
        path: "/admin/register-user",
        component: RegisterUser,
      },
      {
        path: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        path: "/admin/:id",
        component: UpdateUser,
      },
    ],
  },
];

export default routes;
