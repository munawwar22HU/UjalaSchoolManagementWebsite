import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import StepperTextArea from "../Common/Stepper/stepperTextArea";
import SponsorService from "../../services/sponsor.service";
export default function AddSponsor(props) {
  const [sponsor, setSponsor] = useState({
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
      name: "Donor Information",
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

  const createSponsor = () => {
    SponsorService.registerSponsor(sponsor).then(
      (response) => {
        console.log(response);
        alert("Sponsor added successfully");
        props.history.push("/finance/edit-sponsor/" + response.data.id);
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
              <h1>Sponsors </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Add Sponsor </li>
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
                <h3 className="card-title"> Add Sponsor </h3>
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
                      <button
                        className="btn btn-primary"
                        style={{ margin: 5 }}
                        type="button"
                        onClick={createSponsor}
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
