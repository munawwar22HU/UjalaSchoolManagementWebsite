// Authentication
import Login from "./screens/Login.js";
// User Profile
import Profile from "./components/Common/Profile/Profile.js";
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
// Class
import ClassList from "./components/Classroom/classDetails.js";
import Classroom from "./components/Classroom/classroom.js";
// Teachers
import TeacherRegister from "./components/Teacher/teacherRegister.js";
import TeacherDetails from "./components/Teacher/teacherDetails.js";
import TeacherUpdate from "./components/Teacher/teacherUpdate.js";
// Leaving Certificate
import CertificateDetails from "./components/LeavingCertifcate/certificateDetails.js";
import CertificateUpdate from "./components/LeavingCertifcate/editCertificate.js";
import CertificateRegister from "./components/LeavingCertifcate/issueCertificate";
// Finance
import Finance from "./screens/Finance.js";
// Student Finance
import StudentFeesDetails from "./components/StudentFees/studentsFeesDetails.js";
import StudentFees from "./components/StudentFees/studentFees.js";
import ManageFees from "./components/StudentFees/manageFees.js";
import EditFeeVoucher from "./components/StudentFees/editFeeVoucher.js";
import AddFeeVoucher from "./components/StudentFees/addFeeVoucher.js";
import GenerateAll from "./components/StudentFees/generateAll.js";
// Donors
import AddDonor from "./components/Donors/addDonor.js";
import DonorDetails from "./components/Donors/donorDetails.js";
import EditDonor from "./components/Donors/editDonor.js";
// Donations
import DonationDetails from "./components/Donors/donationDetails.js";
import AddDonation from "./components/Donors/addDonation.js";
import EditDonation from "./components/Donors/editDonation.js";
// Sponsors
import AddSponsor from "./components/Sponsors/addSponsors.js";
import SponsorDetails from "./components/Sponsors/sponsorDetails.js";
import EditSponsor from "./components/Sponsors/editSponsors.js";
// Sponsorship
import SponsorshipDetails from "./components/Sponsors/sponsorshipsDetails.js";
import AddSponsorship from "./components/Sponsors/addSponsorships.js";
import EditSponsorship from "./components/Sponsors/editSponsorships.js";

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
        component: CertificateRegister,
      },
      {
        path: "/student/manage-certificate",
        component: CertificateDetails,
      },
      {
        path: "/student/class",
        component: ClassList,
      },
      {
        path: "/student/classroom/:id",
        component: Classroom,
      },
      {
        path: "/student/teacher/:id",
        component: TeacherUpdate,
      },
      {
        path: "/student/students/:id",
        component: StudentUpdate,
      },
      {
        path: "/student/certificate/:id",
        component: CertificateUpdate,
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
  ,
  {
    path: "/finance",
    component: Finance,
    routes: [
      {
        path: "/finance/profile",
        component: Profile,
      },
      {
        path: "/finance/manage-student",
        component: StudentFeesDetails,
      },
      {
        path: "/finance/manage-fees",
        component: ManageFees,
      },
      {
        path: "/finance/manage-student-fees/:id",
        component: StudentFees,
      },
      {
        path: "/finance/add-fee-voucher/:id",
        component: AddFeeVoucher,
      },
      {
        path: "/finance/edit-fee-voucher/:id",
        component: EditFeeVoucher,
      },
      {
        path: "/finance/generate-all",
        component: GenerateAll,
      },
      {
        path: "/finance/donor/add-donor",
        component: AddDonor,
      },
      {
        path: "/finance/donor/manage-donor",
        component: DonorDetails,
      },
      {
        path: "/finance/donor/manage-donation",
        component: DonationDetails,
      },
      {
        path: "/finance/donor/:id",
        component: EditDonor,
      },
      {
        path: "/finance/donation/:id",
        component: AddDonation,
      },
      {
        path: "/finance/edit-donation/:id",
        component: EditDonation,
      },
      {
        path: "/finance/add-sponsor",
        component: AddSponsor,
      },
      {
        path: "/finance/manage-sponsor",
        component: SponsorDetails,
      },
      {
        path: "/finance/edit-sponsor/:id",
        component: EditSponsor,
      },
      {
        path: "/finance/add-sponsorship/:id",
        component: AddSponsorship,
      },
      {
        path: "/finance/edit-sponsorship/:id",
        component: EditSponsorship,
      },
      {
        path: "/finance/manage-sponsorship",
        component: SponsorshipDetails,
      },
    ],
  },
];

export default routes;
