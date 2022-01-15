import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StudentService from "../../services/student.service";
export default function StudentRegister(props) {
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
  });

  const [stepper, setStepper] = useState(0);
  const [message, setMesagge] = useState({
    text: "",
  });

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

  const createStudent = () => {
    StudentService.registerStudent(student).then(
      () => {
        props.history.push("/home/manage-student");
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
              <h1> Register Student </h1>
            </div>
            {/* Page Heading End */}
            {/* Homepage Link Start */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Register Student </li>
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
                <h3 className="card-title"> Add - Student </h3>
              </div>
              {/* Card Header Start */}
              {/* Card Body Start */}
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  {/* BS - STEPPER HEADER Start */}
                  <div className="bs-stepper-header" role="tablist">
                    {/* Student Information Header*/}
                    <div className="step" data-target="#student-part">
                      <button type="button" className="step-trigger" role="tab">
                        <span className="bs-stepper-circle"> 1 </span>
                        <span className="bs-stepper-label">
                          Student Information
                        </span>
                      </button>
                    </div>
                    <div className="line" />
                    {/* Mother Information Header */}
                    <div className="step" data-target="#mother-part">
                      <button type="button" className="step-trigger" role="tab">
                        <span className="bs-stepper-circle"> 2 </span>
                        <span className="bs-stepper-label">
                          Mother Information
                        </span>
                      </button>
                    </div>
                    <div className="line" />
                    {/* Father Information Header */}
                    <div className="step" data-target="#father-part">
                      <button type="button" className="step-trigger" role="tab">
                        <span className="bs-stepper-circle"> 3 </span>
                        <span className="bs-stepper-label">
                          Father Information
                        </span>
                      </button>
                    </div>
                    <div className="line" />
                    {/* Upload Header */}
                    <div className="step" data-target="#upload-part">
                      <button type="button" className="step-trigger" role="tab">
                        <span className="bs-stepper-circle"> 4 </span>
                        <span className="bs-stepper-label"> Submit</span>
                      </button>
                    </div>
                  </div>
                  {/* BS - STEPPER HEADER End */}
                  {/* BS - STEPPER CONTENT Start */}
                  <div className="bs-stepper-content">
                    {/* Student Information*/}
                    <div id="student-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          {/* Name */}
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              value={student.name}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  name: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Sex */}
                          <div className="form-group">
                            <label>Sex</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={student.sex}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  sex: event.target.value,
                                });
                              }}
                            >
                              <option selected="selected">Sex</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                          {/* Date of Birth */}
                          <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="DD-MM-YYYY"
                              value={student.dateOfBirth}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  dateOfBirth: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Religion */}
                          <div className="form-group">
                            <label>Religion</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Religion"
                              value={student.religion}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  religion: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Previous School */}
                          <div className="form-group">
                            <label>Previous School</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Previous School"
                              value={student.previousSchool}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  previousSchool: event.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* Address */}
                          <div className="form-group">
                            <label>Address</label>
                            <textarea
                              className="form-control"
                              rows={1}
                              placeholder="Permenant Address"
                              value={student.address}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  address: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Contact Number */}
                          <div className="form-group">
                            <label>Contact Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Contact Number"
                              value={student.contactNumber}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  contactNumber: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Email  Address */}
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email Address"
                              value={student.email}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  email: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Registration Number */}
                          <div className="form-group">
                            <label>Registration Number</label>
                            <input
                              type="name"
                              className="form-control"
                              placeholder="Registration Number"
                              value={student.registrationNumber}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  registrationNumber: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Date of Admission */}
                          <div className="form-group">
                            <label>Date of Admission</label>
                            <input
                              type="name"
                              className="form-control"
                              placeholder="DD-MM-YYYY"
                              value={student.dateOfAdmission}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  dateOfAdmission: event.target.value,
                                });
                              }}
                            />
                          </div>
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
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              value={student.motherName}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  motherName: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* CNIC */}
                          <div className="form-group">
                            <label>CNIC</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="CNIC"
                              value={student.motherCNIC}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  motherCNIC: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Address */}
                          <div className="form-group">
                            <label>Address</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              placeholder="Permenant Address"
                              value={student.motherAddress}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  motherAddress: event.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* Contact Number */}
                          <div className="form-group">
                            <label>Contact Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Contact Number"
                              value={student.motherContactNumber}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  motherContactNumber: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Email  Address */}
                          <div className="form-group">
                            <label>Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Occupation"
                              value={student.motherOccupation}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  motherOccupation: event.target.value,
                                });
                              }}
                            />
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
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Full Name"
                              value={student.fatherName}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  fatherName: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* CNIC */}
                          <div className="form-group">
                            <label>CNIC</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="CNIC"
                              value={student.fatherCNIC}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  fatherCNIC: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Address */}
                          <div className="form-group">
                            <label>Address</label>
                            <textarea
                              className="form-control"
                              rows={4}
                              placeholder="Permenant Address"
                              value={student.fatherAddress}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  fatherAddress: event.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* Contact Number */}
                          <div className="form-group">
                            <label>Contact Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Contact Number"
                              value={student.fatherContactNumber}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  fatherContactNumber: event.target.value,
                                });
                              }}
                            />
                          </div>
                          {/* Email  Address */}
                          <div className="form-group">
                            <label>Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Occupation"
                              value={student.fatherOccupation}
                              onChange={(event) => {
                                setStudent({
                                  ...student,
                                  fatherOccupation: event.target.value,
                                });
                              }}
                            />
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
                      <div className="form-group">
                        <label> File input </label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="exampleInputFile"
                            />
                            <label className="custom-file-label">
                              Choose file
                            </label>
                          </div>
                          <div className="input-group-append">
                            <span className="input-group-text"> Upload </span>
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
                        onClick={createStudent}
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
