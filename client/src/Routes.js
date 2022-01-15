import Login from "./screens/Login.js";
import Student from "./screens/Student.js";
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
    path: "/home",
    component: Student,
    routes: [
      {
        path: "/home/dashboard",
        component: StudentDashboard,
      },
      {
        path: "/home/add-student",
        component: StudentRegister,
      },
      {
        path: "/home/manage-student",
        component: StudentDetails,
      },
      {
        path: "/home/add-external-organisation",
        component: ExternalOrganisation,
      },
      {
        path: "/home/manage-external-organisation",
        component: ExternalOrganisationDetails,
      },
      {
        path: "/home/health-card",
        component: HealthCard,
      },
      {
        path: "/home/:id",
        component: StudentUpdate,
      },
    ],
  },
];

export default routes;
