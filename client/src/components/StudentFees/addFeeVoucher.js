import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperDate from "../Common/Stepper/stepperDate";
import FeesService from "../../services/fees.service";
import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";

export default function AddFeeVoucher(props) {
  const [voucher, setVoucher] = useState({
    studentId: "",
    issuedById: "",
    studentName: "",
    rollNumber: "",
    class: "",
    issuedByName: "",
    totalFee: 0,
    transportFee: 0,
    tutionFee: 0,
    discount: 0,
    dueDate: "",
    issueDate: "",
  });

  const headers = [
    {
      target: "#student-part",
      name: "Student Information",
    },
    {
      target: "#fee-part",
      name: "Fee Breakdown",
    },
    {
      target: "#upload-part",
      name: "Submit",
    },
  ];

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
    const id = props.match.params.id;
    StudentService.getStudent(id).then(
      (response) => {
        setVoucher({
          ...voucher,
          studentId: id,
          studentName: response.data.name,
          rollNumber: response.data.rollNumber,
          class: response.data.class,
          issueDate: new Date(),
          issuedById: AuthService.getCurrentUser().id,
          issuedByName: AuthService.getCurrentUser().name,
        });
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

  // const tutionFeeChange = (e) => {
  //   e.preventDefault();
  //   setVoucher({ ...voucher, tutionFee: e.target.value });
  //   totalFeeChange();
  // };
  // const transportFeeChange = (e) => {
  //   e.preventDefault();
  //   setVoucher({ ...voucher, transportFee: e.target.value });
  //   totalFeeChange();
  // };
  // const discountChange = (e) => {
  //   e.preventDefault();
  //   setVoucher({ ...voucher, discount: e.target.value });
  //   totalFeeChange();
  // };
  // const totalFeeChange = () => {
  //   const sum =
  //     Number(voucher.tutionFee) +
  //     Number(voucher.transportFee) -
  //     Number(voucher.discount);
  //   setVoucher({ ...voucher, totalFee: sum });
  // };

  let history = useHistory();

  const createVoucher = (event) => {
    event.preventDefault();
    FeesService.createVoucher(voucher).then(
      (response) => {
        console.log(response);
        alert("Certificate Created Successfully");
        history.push("/finance/edit-fee-voucher/" + response.data._id);
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
              <h1>Add Fee Voucher</h1>
            </div>
            {/* Page Heading End */}
            {/* Homepage Link Start */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/finance"> Home </a>
                </li>
                <li className="breadcrumb-item active">Add Fee Voucher</li>
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
                <h3 className="card-title"> Fees Voucher </h3>
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
                            value={voucher.rollNumber}
                          />
                          {/* Name */}
                          <StepperContent
                            placeholder={"Full Name"}
                            value={voucher.studentName}
                            name={"Full Name"}
                          />
                        </div>

                        <div className="col-md-6">
                          <StepperContent
                            name={"Class"}
                            value={voucher.class}
                          />
                          {/* Name */}
                          <StepperContent
                            placeholder={"Issued By"}
                            value={voucher.issuedByName}
                            name={"Full Name"}
                          />
                        </div>
                      </div>

                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>

                    <div id="fee-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperContent
                            name={"Transport Fee"}
                            value={voucher.transportFee}
                            onChange={(e) => {
                              setVoucher({
                                ...voucher,
                                transportFee: e.target.value,
                                totalFee:
                                  Number(voucher.tutionFee) +
                                  Number(e.target.value) -
                                  Number(voucher.discount),
                              });
                            }}
                          />
                          {/* Name */}
                          <StepperContent
                            value={voucher.tutionFee}
                            name={"Tution Fee"}
                            onChange={(e) => {
                              setVoucher({
                                ...voucher,
                                tutionFee: e.target.value,
                                totalFee:
                                  Number(voucher.transportFee) +
                                  Number(e.target.value) -
                                  Number(voucher.discount),
                              });
                            }}
                          />
                        </div>

                        <div className="col-md-6">
                          <StepperContent
                            name={"Discount"}
                            value={voucher.discount}
                            onChange={(e) => {
                              setVoucher({
                                ...voucher,
                                discount: e.target.value,
                                totalFee:
                                  Number(voucher.tutionFee) +
                                  Number(voucher.transportFee) -
                                  Number(e.target.value),
                              });
                            }}
                          />
                          {/* Name */}
                          <StepperContent
                            name={"Total Fees"}
                            value={voucher.totalFee}
                          />
                        </div>
                      </div>

                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                      >
                        Previous
                      </button>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>

                    {/* Upload Information*/}
                    <div id="upload-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperDate
                            name={"Issue Date"}
                            value={voucher.issueDate}
                            onChange={(event) =>
                              setVoucher({
                                ...voucher,
                                issueDate: event.target.value.toString(),
                              })
                            }
                          />
                        </div>

                        <div className="col-md-6">
                          <StepperDate
                            name={"Due Date"}
                            value={voucher.dueDate}
                            onChange={(event) =>
                              setVoucher({
                                ...voucher,
                                dueDate: event.target.value.toString(),
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
                        style={{ margin: 5 }}
                        type="button"
                        onClick={createVoucher}
                      >
                        Create
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
