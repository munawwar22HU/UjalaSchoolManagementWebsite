import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import DonorService from "../../services/donor.service";
export default function AddDonor(props) {
  const [donor, setDonor] = useState({
    name: "",
    type: "Type",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [stepper, setStepper] = useState(0);

  const headers = [
    {
      target: "#donor-part",
      name: "Background Information",
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

  const createDonor = () => {
    DonorService.registerDonor(donor).then(
      (response) => {
        console.log(response);
        alert("Donor added successfully");
        props.history.push("/finance/donor/" + response.data.id);
        //props.history.push("/student/certificate/" + response.data._id);
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

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1> Add Donor </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/finance"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Add Donor </li>
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
                <h3 className="card-title"> Donor </h3>
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
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={createDonor}
                      >
                        Submit
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
