import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperDate from "../Common/Stepper/stepperDate";
import FeesService from "../../services/fees.service";

export default function EditFeeVoucher(props) {
  const [voucher, setVoucher] = useState({
    studentId: "",
    issuedById: "",

    studentName: "",
    rollNumber: "",
    class: "",
    issuedByName: "",

    transportFee: 0,
    tutionFee: 0,
    discount: 0,
    totalFee: 0,

    dueDate: "",
    issueDate: "",
    voucherNumber: 0,

    paidFee: 0,
    paidDate: "",
    status: "",
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

  const [dummyState, rerender] = React.useState(1);

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
    FeesService.getVoucher(id).then(
      (response) => {
        setVoucher(response.data);
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

  const updateVoucher = (event) => {
    event.preventDefault();
    const id = props.match.params.id;

    FeesService.updateVoucher(id, voucher).then(
      (response) => {
        alert("Student Updated Successfully");
        history.push(`/finance/edit-fee-voucher/${id}`);
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

                          <StepperContent
                            name={"Voucher Number"}
                            value={voucher.voucherNumber}
                          />
                        </div>

                        <div className="col-md-6">
                          <StepperDate
                            name={"Payment Date"}
                            value={voucher.paidDate}
                            onChange={(event) =>
                              setVoucher({
                                ...voucher,
                                paidDate: event.target.value.toString(),
                              })
                            }
                          />

                          <StepperContent
                            name={"Fees Paid"}
                            value={voucher.paidFee}
                            onChange={(event) =>
                              setVoucher({
                                ...voucher,
                                paidFee: event.target.value.toString(),
                              })
                            }
                          />

                          <StepperSelect
                            name={"Status"}
                            value={voucher.status}
                            options={["Select", "paid", "unpaid"]}
                            onChange={(event) =>
                              setVoucher({
                                ...voucher,
                                status: event.target.value,
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
                        onClick={updateVoucher}
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
