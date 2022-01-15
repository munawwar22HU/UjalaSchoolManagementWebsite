import Login from "./screens/Login.js";
import Student from "./screens/Student.js";
import Admin from "./screens/Admin";
import StudentDashboard from "./components/Student/studentDashboard.js";
import StudentDetails from "./components/Student/studentDetails.js";
import StudentRegister from "./components/Student/studentRegister.js";
import StudentUpdate from "./components/Student/studentUpdate";
import ExternalOrganisation from "./components/Student/externalOrganisation";
import ExternalOrganisationDetails from "./components/Student/externalOrganisationDetails";
import HealthCard from "./components/Student/healthCard.js";

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
        path: "/student/dashboard",
        component: StudentDashboard,
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
        path: "/student/add-external-organisation",
        component: ExternalOrganisation,
      },
      {
        path: "/student/manage-external-organisation",
        component: ExternalOrganisationDetails,
      },
      {
        path: "/student/health-card",
        component: HealthCard,
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
  },
];

export default routes;
