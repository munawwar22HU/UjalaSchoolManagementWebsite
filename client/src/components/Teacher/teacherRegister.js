import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import StepperDate from "../Common/Stepper/stepperDate";
import TeacherService from "../../services/teacher.service";
import axios from "axios";
export default function TeacherRegister(props) {
  const [teacher, setTeacher] = useState({
    name: "",
    sex: "Sex",
    dateOfBirth: "",
    address: "",
    contactNumber: "",
    email: "",
    dateOfJoining: "",
    class: "Class",
    previousSchool: "",
    qualification: "",
    image:
      "https://res.cloudinary.com/doow2fp6w/image/upload/v1650314984/uqsv76s8cag9pqmwzvd9.png",
  });

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
        setTeacher({ ...teacher, image: res.data.url });
      })
      .catch(function (err) {
        console.error(err);
      });

    console.log("url is", teacher.image);
  };

  const headers = [
    {
      target: "#student-part",
      name: "Personal Information",
    },
    {
      target: "#mother-part",
      name: "Background Information",
    },
    {
      target: "#upload-part",
      name: "Submit",
    },
  ];

  useEffect(() => {
    const stepperEl = document.querySelector("#stepper1");
    setStepper(
      new Stepper(stepperEl, {
        linear: false,
        animation: true,
      })
    );
  }, []);

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
  };

  const createTeacher = () => {
    TeacherService.registerTeacher(teacher).then(
      (response) => {
        props.history.push("/student/teacher/" + response.data.id);
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
              <h1> Register Teacher </h1>
            </div>
            {/* Page Heading End */}
            {/* Homepage Link Start */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Register Teacher </li>
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
                <h3 className="card-title"> Add - Teacher </h3>
              </div>
              {/* Card Header Start */}
              {/* Card Body Start */}
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  {/* BS - STEPPER HEADER Start */}
                  <StepperHeader headers={headers} />
                  {/* BS - STEPPER HEADER End */}
                  {/* BS - STEPPER CONTENT Start */}
                  <div className="bs-stepper-content">
                    {/* Student Information*/}
                    <div id="student-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          {/* Name */}
                          <StepperContent
                            placeholder={"Full Name"}
                            value={teacher.name}
                            name={"Name"}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                name: event.target.value,
                              })
                            }
                          />
                          {/* Sex */}
                          <StepperSelect
                            name={"Sex"}
                            value={teacher.sex}
                            options={["Sex", "Male", "Female", "Other"]}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                sex: event.target.value,
                              })
                            }
                          />
                          {/*Date Of Birth*/}
                          <StepperDate
                            name={"Date Of Birth"}
                            value={teacher.dateOfBirth}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                dateOfBirth: event.target.value.toString(),
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Address */}
                          <StepperTextArea
                            name={"Address"}
                            value={teacher.address}
                            rows={1}
                            placeholder={"Address"}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                address: event.target.value,
                              })
                            }
                          />
                          {/* Contact Number */}
                          <StepperContent
                            name={"Contact Number"}
                            value={teacher.contactNumber}
                            placeholder={"Contact Number"}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                contactNumber: event.target.value,
                              })
                            }
                          />
                          {/* Email  Address */}
                          <StepperContent
                            name={"Email Address"}
                            value={teacher.email}
                            placeholder={"Email Address"}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                email: event.target.value,
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
                            name={"Previous School"}
                            value={teacher.previousSchool}
                            placeholder={"Previous School"}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                previousSchool: event.target.value,
                              })
                            }
                          />
                          {/* CNIC */}
                          <StepperContent
                            name={"Qualification"}
                            value={teacher.qualification}
                            placeholder={"Qualification"}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                qualification: event.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          {/* Contact Number */}
                          <StepperSelect
                            name={"Class"}
                            value={teacher.class}
                            options={[
                              "Class",
                              "One",
                              "Two",
                              "Three",
                              "Four",
                              "Five",
                              "Six",
                              "Seven",
                              "Eight",
                              "Nine",
                              "Ten",
                            ]}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                class: event.target.value,
                              })
                            }
                          />
                          {/* Occupation */}

                          <StepperDate
                            name={"Date Of Joining"}
                            value={teacher.dateOfJoining}
                            onChange={(event) =>
                              setTeacher({
                                ...teacher,
                                dateOfJoining: event.target.value,
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
                                src={teacher.image}
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
                        onClick={createTeacher}
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
