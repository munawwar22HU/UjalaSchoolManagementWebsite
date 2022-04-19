import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import StudentService from "../../services/student.service";
import axios from "axios";
export default function TeacherUpdate(props) {
  const [student, setStudent] = useState({
    name: "",
    sex: "Sex",
    dateOfBirth: "",
    religion: "",
    address: "",
    contactNumber: "",
    email: "",
    registrationNumber: "",
    dateOfAdmission: "",
    previousSchool: "",
    motherName: "",
    motherCNIC: "",
    motherContactNumber: "",
    motherAddress: "",
    motherOccupation: "",
    fatherName: "",
    fatherCNIC: "",
    fatherContactNumber: "",
    fatherAddress: "",
    fatherOccupation: "",
    image: "",
  });

  const headers = [
    {
      target: "#student-part",
      name: "Student Information",
    },
    {
      target: "#mother-part",
      name: "Mother Information",
    },
    {
      target: "#father-part",
      name: "Father Information",
    },
    {
      target: "#upload-part",
      name: "Submit",
    },
  ];

  const customOnchange = (event, key) => {
    setStudent({ ...student, key: event.target.value });
  };

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
    StudentService.getStudent(id).then(
      (response) => {
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
  }, []);

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
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
                          {/* Name */}
                          <StepperContent
                            placeholder={"Full Name"}
                            value={student.name}
                            name={"Name"}
                          />
                          {/* Sex */}
                          <StepperSelect
                            name={"Sex"}
                            value={student.sex}
                            options={["Sex", "Male", "Female", "Other"]}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                sex: event.target.value,
                              })
                            }
                          />
                          {/*Date Of Birth*/}
                          <StepperContent
                            name={"Date Of Birth"}
                            value={student.dateOfBirth}
                            placeholder={"DD-MM-YYYY"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                dateOfBirth: event.target.value,
                              })
                            }
                          />
                          {/*Religion*/}
                          <StepperContent
                            name={"Religion"}
                            value={student.religion}
                            placeholder={"Religion"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                religion: event.target.value,
                              })
                            }
                          />
                          {/*Previous School*/}
                          <StepperContent
                            name={"Previous School"}
                            value={student.previousSchool}
                            placeholder={"Previous School"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                previousSchool: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Address */}
                          <StepperTextArea
                            name={"Address"}
                            value={student.address}
                            rows={1}
                            placeholder={"Address"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                address: event.target.value,
                              })
                            }
                          />
                          {/* Contact Number */}
                          <StepperContent
                            name={"Contact Number"}
                            value={student.contactNumber}
                            placeholder={"Contact Number"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                contactNumber: event.target.value,
                              })
                            }
                          />
                          {/* Email  Address */}
                          <StepperContent
                            name={"Email Address"}
                            value={student.email}
                            placeholder={"Email Address"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                email: event.target.value,
                              })
                            }
                          />
                          {/* Registration Number */}
                          <StepperContent
                            name={"Registration Number"}
                            value={student.registrationNumber}
                            placeholder={"Registration Number"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                registrationNumber: event.target.value,
                              })
                            }
                          />
                          {/* Date of Admission */}
                          <StepperContent
                            name={"Date of Admission"}
                            value={student.dateOfAdmission}
                            placeholder={"Date of Addmission"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                dateOfAdmission: event.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>
                    {/* Mother Information*/}
                    <div id="mother-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          {/* Name */}
                          <StepperContent
                            name={"Full Name"}
                            value={student.motherName}
                            placeholder={"Full Name"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                motherName: event.target.value,
                              })
                            }
                          />
                          {/* CNIC */}
                          <StepperContent
                            name={"CNIC"}
                            value={student.motherCNIC}
                            placeholder={"CNIC"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                motherCNIC: event.target.value,
                              })
                            }
                          />
                          {/* Address */}
                          <StepperTextArea
                            name={"Permenant Address"}
                            value={student.motherAddress}
                            rows={4}
                            placeholder={"Permenant Address"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                motherAddress: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Contact Number */}
                          <StepperContent
                            name={"Contact Number"}
                            value={student.motherContactNumber}
                            placeholder={"Contact Number"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                motherContactNumber: event.target.value,
                              })
                            }
                          />
                          {/* Occupation */}
                          <StepperContent
                            name={"Occupation"}
                            value={student.motherOccupation}
                            placeholder={"Occupation"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                motherOccupation: event.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                        style={{ margin: 5 }}
                      >
                        Previous
                      </button>

                      <button
                        className="btn btn-primary"
                        onClick={nextStepper}
                        style={{ margin: 5 }}
                      >
                        Next
                      </button>
                    </div>
                    {/* Father Information*/}
                    <div id="father-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          {/* Name */}
                          <StepperContent
                            name={"Full Name"}
                            value={student.fatherName}
                            placeholder={"Full Name"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                fatherName: event.target.value,
                              })
                            }
                          />
                          {/* CNIC */}
                          <StepperContent
                            name={"CNIC"}
                            value={student.fatherCNIC}
                            placeholder={"CNIC"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                fatherCNIC: event.target.value,
                              })
                            }
                          />
                          {/* Address */}
                          <StepperTextArea
                            name={"Permenant Address"}
                            value={student.fatherAddressAddress}
                            rows={4}
                            placeholder={"Permenant Address"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                fatherAddress: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Contact Number */}
                          <StepperContent
                            name={"Contact Number"}
                            value={student.fatherContactNumber}
                            placeholder={"Contact Number"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                fatherContactNumber: event.target.value,
                              })
                            }
                          />
                          {/* Occupation */}
                          <StepperContent
                            name={"Occupation"}
                            value={student.fatherOccupation}
                            placeholder={"Occupation"}
                            onChange={(event) =>
                              setStudent({
                                ...student,
                                fatherOccupation: event.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                        style={{ margin: 5 }}
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={nextStepper}
                        style={{ margin: 5 }}
                      >
                        Next
                      </button>
                    </div>
                    {/* Upload Information*/}
                    <div id="upload-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label> File input </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="exampleInputFile"
                                  onChange={handleUpload}
                                />
                                <label className="custom-file-label">
                                  {file ? file.name : "Choose File"}
                                </label>
                              </div>

                              <div className="input-group-append">
                                <span
                                  className="input-group-text"
                                  onClick={handleServer}
                                >
                                  {" "}
                                  Upload{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="box-profile">
                            <div className="text-center">
                              <img
                                className="profile-user-img img-circle"
                                src={student.image}
                                alt="User profile picture"
                                style={{ width: 300, height: 300 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
                      >
                        Submit
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
