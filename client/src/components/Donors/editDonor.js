import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import DataTable from "../Common/Table/dataTable";
import DonorService from "../../services/donor.service";
export default function EditDonor(props) {
  const [donor, setDonor] = useState({
    name: "",
    type: "Type",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [stepper, setStepper] = useState(0);
  const [dummyState, rerender] = React.useState(1);
  const [donationList, setDonationList] = useState([]);
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

  const updateDonor = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    DonorService.updateDonor(id, donor).then(
      (response) => {
        alert("Donor updated successfully");
        props.history.push("finance/donor/" + id);
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

  const updateDonation = (id) => {
    props.history.push("/finance/edit-donation/" + id);
  };

  const deleteDonation = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Donor ?"
    );
    if (confirmBox === true) {
      DonorService.deleteDonor(id).then(
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

  const newDonation = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    props.history.push("/finance/donation/" + id);
  };

  const columns = [
    {
      Header: "Donors Information",
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
              <button onClick={(e) => updateDonation(row.row.original._id)}>
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
              <button onClick={(e) => deleteDonation(row.row.original._id)}>
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
    DonorService.getDonor(id).then((response) => {
      setDonor(response.data);
    });

    DonorService.getAllDonationsByDonor(id).then(
      (response) => {
        setDonationList(response.data);
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
              <h1> Parent's Voice Assocation - Donors </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active">Edit Donor </li>
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
                            value={donor.name}
                            placeholder={"Name"}
                            onChange={(e) =>
                              setDonor({ ...donor, name: e.target.value })
                            }
                          />
                          <StepperContent
                            name={"Email"}
                            placeholder={"Email"}
                            value={donor.email}
                            onChange={(e) =>
                              setDonor({ ...donor, email: e.target.value })
                            }
                          />
                          <StepperContent
                            name={"Contact Number"}
                            placeholder={"Contact Number"}
                            value={donor.contactNumber}
                            onChange={(e) =>
                              setDonor({
                                ...donor,
                                contactNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <StepperTextArea
                            name={"Address"}
                            placeholder={"Address"}
                            value={donor.address}
                            onChange={(e) =>
                              setDonor({ ...donor, address: e.target.value })
                            }
                          />
                          <StepperSelect
                            name={"Type"}
                            placeholder={"Type"}
                            value={donor.type}
                            onChange={(e) =>
                              setDonor({ ...donor, type: e.target.value })
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
                        onClick={updateDonor}
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
                    onClick={newDonation}
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
                  data={donationList}
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
