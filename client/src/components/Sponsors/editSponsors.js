import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import DataTable from "../Common/Table/dataTable";
import SponsorService from "../../services/sponsor.service";
export default function EditSponsor(props) {
  const [sponsor, setSponsor] = useState({
    name: "",
    type: "Type",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [stepper, setStepper] = useState(0);
  const [dummyState, rerender] = React.useState(1);
  const [sponsorshipList, setSponsorshipList] = useState([]);
  const [message, setMesagge] = useState({
    text: "",
  });

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
  };

  const headers = [
    {
      target: "#donor-part",
      name: "Donor Information",
    },
    {
      target: "#submit-part",
      name: "Submit",
    },
  ];

  const updateSponsor = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    SponsorService.updateSponsor(id, sponsor).then(
      (response) => {
        alert("Sponsor updated successfully");
        props.history.push("finance/sponsor/" + id);
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
        alert(resMessage);
      }
    );
  };

  const updateSponsorship = (id) => {
    props.history.push("/finance/edit-sponsorship/" + id);
  };

  const deleteSponsorship = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Donor ?"
    );
    if (confirmBox === true) {
      SponsorService.deleteSponsor(id).then(
        () => {
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
        }
      );
    }
  };

  const newSponsorship = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    props.history.push("/finance/sponsorship/add-sponsorship/" + id);
  };

  const columns = [
    {
      Header: "Sponsorship Information",
      columns: [
        {
          Header: "Receipt Number",
          accessor: "receiptNumber",
        },
        {
          Header: "Donor Name",
          accessor: "donorName",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Date",
          accessor: "date",
        },
        {
          Header: "Edit",
          accessor: "edit",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => updateSponsorship(row.row.original._id)}>
                <i className="fas fa-user-edit" aria-hidden="true" />
              </button>
            </div>
          ),
        },
        {
          Header: "Delete",
          accessor: "delete",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => deleteSponsorship(row.row.original._id)}>
                <i className="fas fa-trash-alt" aria-hidden="true" />
              </button>
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
    SponsorService.getSponsor(id).then((response) => {
      setSponsor(response.data);
    });

    SponsorService.getAllSponsorshipsBySponsor(id).then(
      (response) => {
        setSponsorshipList(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }, [dummyState]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1> Sponsor</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active">Edit Sponsor </li>
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
                <h3 className="card-title"> Add Donor </h3>
              </div>
              <div className="card-body p-0">
                <div className="bs-stepper" id="stepper1">
                  <StepperHeader headers={headers} />
                  <div className="bs-stepper-content">
                    <div id="donor-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-6">
                          <StepperContent
                            name={"Name"}
                            value={sponsor.name}
                            placeholder={"Name"}
                            onChange={(e) =>
                              setSponsor({ ...sponsor, name: e.target.value })
                            }
                          />
                          <StepperContent
                            name={"Email"}
                            placeholder={"Email"}
                            value={sponsor.email}
                            onChange={(e) =>
                              setSponsor({ ...sponsor, email: e.target.value })
                            }
                          />
                          <StepperContent
                            name={"Contact Number"}
                            placeholder={"Contact Number"}
                            value={sponsor.contactNumber}
                            onChange={(e) =>
                              setSponsor({
                                ...sponsor,
                                contactNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <StepperTextArea
                            name={"Address"}
                            placeholder={"Address"}
                            value={sponsor.address}
                            onChange={(e) =>
                              setSponsor({
                                ...sponsor,
                                address: e.target.value,
                              })
                            }
                          />
                          <StepperSelect
                            name={"Type"}
                            placeholder={"Type"}
                            value={sponsor.type}
                            onChange={(e) =>
                              setSponsor({ ...sponsor, type: e.target.value })
                            }
                            options={["Type", "Individual", "Organization"]}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>
                    <div id="submit-part" className="content" role="tabpanel">
                      <button
                        className="btn btn-primary"
                        onClick={previousStepper}
                      >
                        Next
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={updateSponsor}
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
        <div className="row">
          {/* Card to display student details */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Donations</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-large btn-dark"
                    onClick={newSponsorship}
                  >
                    Add new
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    data-toggle="tooltip"
                    title="Collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <DataTable
                  data={sponsorshipList}
                  columns={columns}
                  props={props}
                ></DataTable>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
