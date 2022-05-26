import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperDate from "../Common/Stepper/stepperDate";
import StepperSelect from "../Common/Stepper/stepperSelector";
import SponsorshipService from "../../services/sponsorships.service";
import moment from "moment";
import DataTable from "../Common/Table/dataTable";
export default function EditSponsorships(props) {
  const [sponsor, setSponsor] = useState({
    sponsorId: "",
    sponsorName: "",
    studentId: "",
    studentName: "",
    studentRollNumber: "",
    startDate: "",
    endDate: "",
    amount: "",
    numberOfInstallments: "1",
    status: "",
    installment: [
      {
        installmentNumber: 0,
        installmentAmount: 0,
        installmentDate: "",
        isPaid: false,
      },
    ],
  });
  const [dummyState, rerender] = React.useState(1);
  const [stepper, setStepper] = useState(0);
  const handleClick = (e, row) => {
    // update installment is paid
    // find particular installment and update isPaid
    console.log("row", row);
    const installment = sponsor.installment.find(
      (installment) => installment.installmentNumber === row.installmentNumber
    );
    console.log("installment", installment);
    installment.isPaid = e.target.checked;
    // update installment
    setSponsor({
      ...sponsor,
      installment: [...sponsor.installment],
    });
    console.log("sponsor", sponsor);
  };

  const columns = [
    {
      Header: "Installments",
      columns: [
        {
          Header: "Installment Number",
          accessor: "installmentNumber",
        },
        {
          Header: "Installment Amount",
          accessor: "installmentAmount",
        },
        {
          Header: "Installment Date",
          accessor: "installmentDate",
        },
        {
          Header: "Is Paid",
          accessor: "isPaid",
          Cell: (row) => (
            <div>
              <input
                type="checkbox"
                checked={row.row.original.isPaid ? true : false}
                onClick={(e) => handleClick(e, row.row.original)}
              />
            </div>
          ),
        },
      ],
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
    const id = props.match.params.id;
    SponsorshipService.getSponsorship(id).then((res) => {
      console.log(res.data);
      setSponsor(res.data);
    });
  }, [dummyState]);

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
  };

  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  const updateEndDate = (date, months, amount) => {
    const startDate = new Date(date);
    const endDate = addMonths(startDate, parseInt(months));
    // convert to string in the format dd/mm/yyyy
    const endDateString = endDate.toLocaleDateString("en-CA");
    const data = createInstallmentData(date, months, amount);
    setSponsor({
      ...sponsor,
      endDate: endDateString,
      startDate: date,
      numberOfInstallments: months,
      amount: amount,
      installment: data,
    });
  };

  const handleDate = (event) => {
    event.preventDefault();
    const { value } = event.target;
    updateEndDate(value, sponsor.numberOfInstallments, sponsor.amount);
  };

  const handleInstallment = (event) => {
    event.preventDefault();
    const { value } = event.target;
    updateEndDate(sponsor.startDate, value, sponsor.amount);
  };

  const handleAmount = (event) => {
    event.preventDefault();
    const { value } = event.target;
    updateEndDate(sponsor.startDate, sponsor.numberOfInstallments, value);
  };

  const createInstallmentData = (value, months, amount) => {
    const startDate = new Date(value);
    const installmentData = [];
    for (let i = 0; i < months; i++) {
      installmentData.push({
        installmentNumber: i + 1,
        installmentAmount: amount,
        installmentDate: moment(startDate).add(i, "month").format("DD/MM/YYYY"),
        isPaid: false,
      });
    }
    return installmentData;
  };

  const update = () => {
    console.log("update");

    const id = props.match.params.id;
    SponsorshipService.updateSponsorship(id, sponsor).then(
      (res) => {
        alert("Donation Updated Successfully");
        console.log("164");
        props.history.push("/finance/edit-sponsorship/" + id);
        rerender(dummyState + 1);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    );
  };

  const headers = [
    {
      target: "#donor-part",
      name: "Background Information",
    },

    {
      target: "#submit-part",
      name: "Submit",
    },
  ];

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Edit Sponsorship </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/finance"> Home </a>
                </li>
                <li className="breadcrumb-item active">Edit Sponsorship</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">Sponsorship</h3>
              </div>
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  <StepperHeader headers={headers} />
                  <div className="bs-stepper-content">
                    <div id="donor-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperContent
                            name={"Sponsor Name"}
                            value={sponsor.sponsorName}
                            placeholder={"Name"}
                          />
                          <StepperContent
                            name={"Amount"}
                            placeholder={"Amount"}
                            value={sponsor.amount}
                            onChange={handleAmount}
                          />
                        </div>
                        <div className="col-md-6">
                          <StepperContent
                            name={"Roll Number"}
                            value={sponsor.studentRollNumber}
                          />
                          <StepperContent
                            name={"Student Name"}
                            value={sponsor.studentName}
                            placeholder={"Name"}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>
                    <div id="submit-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-4">
                          <StepperDate
                            name={"Start Date"}
                            value={sponsor.startDate}
                            onChange={handleDate}
                          />
                        </div>
                        <div className="col-md-4">
                          <StepperDate
                            name={"End Date"}
                            value={sponsor.endDate}
                          />
                        </div>
                        <div className="col-md-4">
                          <StepperSelect
                            name={"Number of Installments"}
                            placeholder={"Number of installments"}
                            value={sponsor.numberOfInstallments}
                            onChange={handleInstallment}
                            options={["1", "6", "12"]}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="card-body">
                          <DataTable
                            data={sponsor.installment}
                            columns={columns}
                            props={props}
                          ></DataTable>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={update}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
