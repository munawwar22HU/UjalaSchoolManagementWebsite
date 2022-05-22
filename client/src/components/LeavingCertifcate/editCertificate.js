import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import StepperDate from "../Common/Stepper/stepperDate";
//import StudentService from "../../services/student.service";
import CertificateService from "../../services/certificates.service.js";
import axios from "axios";
export default function CertificateUpdate(props) {
  const [student, setStudent] = useState({
    studentId: "",
    studentName: "",
    rollNumber: "",
    reason: "",
    approvedById: "",
    approvedByName: "",
    approvedDate: "",
  });

  const headers = [
    {
      target: "#student-part",
      name: "Student Information",
    },

    {
      target: "#upload-part",
      name: "Submit",
    },
  ];

  const [dummyState, rerender] = React.useState(1);

  const [stepper, setStepper] = useState(0);
  const [message, setMesagge] = useState({
    text: "",
  });

  const [file, setFile] = React.useState("");

  // Handles file Upload
  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Handles file upload to Server
  const handleServer = async (event) => {
    const { data: CLOUDINARY_URL } = await axios.get("/cloudinary/url");

    const { data: CLOUDINARY_UPLOAD_PRESET } = await axios.get(
      "/cloudinary/preset"
    );
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    await axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    })
      .then(function (res) {
        setStudent({ ...student, image: res.data.url });
      })
      .catch(function (err) {
        console.error(err);
      });

    console.log("url is", student.image);
  };

  useEffect(() => {
    const stepperEl = document.querySelector("#stepper1");
    setStepper(
      new Stepper(stepperEl, {
        linear: false,
        animation: true,
      })
    );
    const id = props.match.params.id;
    CertificateService.getCertificate(id).then(
      (response) => {
        console.log(response);
        setStudent(response.data);
        console.log(student);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setMesagge({ ...message, text: resMessage });
      }
    );
  }, [dummyState]);

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
  };

  let history = useHistory();

  const updateStudent = (event) => {
    event.preventDefault();
    const id = props.match.params.id;

    CertificateService.updateCertificate(id, student).then(
      (response) => {
        alert("Student Updated Successfully");
        history.push(`/student/certificate/${id}`);
        rerender(dummyState + 1);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        setMesagge({ ...message, text: resMessage });
      }
    );
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) Start */}
      <section className="content-header">
        {/* /.container-fluid */}
        <div className="container-fluid">
          <div className="row mb-2">
            {/* Page Heading Start */}
            <div className="col-sm-6">
              <h1> Update Student </h1>
            </div>
            {/* Page Heading End */}
            {/* Homepage Link Start */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/student"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Update Student </li>
              </ol>
            </div>
            {/* Homepage Link End */}
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Content Header (Page header) End */}
      {/* Content (Page Content) Start */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Card Start */}
            <div className="card card-default">
              {/* Card Header Start */}
              <div className="card-header">
                <h3 className="card-title"> Edit - Student </h3>
              </div>
              {/* Card Header Start */}
              {/* Card Body Start */}
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  {/*Header*/}
                  <StepperHeader headers={headers} />
                  <div className="bs-stepper-content">
                    {/* Student Information*/}
                    <div id="student-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperContent
                            name={"Roll Number"}
                            value={student.rollNumber}
                          />
                          {/* Name */}
                          <StepperContent
                            placeholder={"Full Name"}
                            value={student.studentName}
                            name={"Name"}
                          />
                          <StepperTextArea
                            name={"Reason"}
                            value={student.reason}
                            rows={2}
                            placeholder={"Address"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                reason: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Registration Number */}
                          <StepperContent
                            name={"Approved By"}
                            value={student.approvedByName}
                            placeholder={"Approved By"}
                          />
                          {/* Date of Admission */}
                          <StepperDate
                            name={"Date of Approval"}
                            value={student.approvedDate}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                approvedDate: event.target.value.toString(),
                              })
                            }
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>

                    {/* Upload Information*/}
                    <div id="upload-part" className="content" role="tabpanel">
                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                        style={{ margin: 5 }}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={updateStudent}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  {/* BS - STEPPER CONTENT End */}
                </div>
              </div>
              {/* Card Body End */}
              {/* Card Footer */}
              <div className="card-footer" />
            </div>
            {/* Card End */}
          </div>
        </div>
      </section>
      {/* Content (Page Content) End */}
    </div>
  );
}
