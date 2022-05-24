import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperDate from "../Common/Stepper/stepperDate";
import StepperTextArea from "../Common/Stepper/stepperTextArea";

import DonorService from "../../services/donor.service";
import AuthService from "../../services/auth.service";
import StepperCheckbox from "../Common/Stepper/stepperCheckbox";
import axios from "axios";

export default function AddDonation(props) {
  const [donation, setDonation] = useState({
    donorId: "",
    receivedById: "",

    donorName: "",
    amount: 0,
    date: "",
    receivedBy: "",

    isCheque: false,
    iban: "",
    bankName: "",
    branchAddress: "",
    chequeImage:
      "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg",
  });

  const [stepper, setStepper] = useState(0);

  const headers = [
    {
      target: "#donor-part",
      name: "Donor Information",
    },
    // {
    //   target: "#donation-part",
    //   name: "Donation Information",
    // },
    {
      target: "#submit-part",
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
    const id = props.match.params.id;
    DonorService.getDonor(id).then((res) => {
      console.log(res.data);
      setDonation({
        ...donation,
        donorId: id,
        donorName: res.data.name,
        receivedById: AuthService.getCurrentUser().id,
        receivedBy: AuthService.getCurrentUser().name,
      });
    });
  }, []);

  const [file, setFile] = React.useState("");

  const nextStepper = () => {
    stepper.next();
  };

  const previousStepper = () => {
    stepper.previous();
  };
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
        setDonation({ ...donation, chequeImage: res.data.url });
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const createDonation = () => {
    DonorService.registerDonation(donation).then(
      (response) => {
        console.log(response);
        alert("Donor added successfully");
        props.history.push("/finance/edit-donation/" + response.data.id);
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
              <h1> Donation </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home"> Home </a>
                </li>
                <li className="breadcrumb-item active"> Add Donation </li>
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
                            name={"Donor Name"}
                            value={donation.donorName}
                            placeholder={"Name"}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                donorName: e.target.value,
                              })
                            }
                          />
                          <StepperContent
                            name={"Amount"}
                            placeholder={"Amount"}
                            value={donation.amount}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                amount: e.target.value,
                              })
                            }
                          />
                          <StepperDate
                            name={"Date"}
                            value={donation.date}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                date: e.target.value.toString(),
                              })
                            }
                          />
                          <StepperContent
                            name={"Received By"}
                            placeholder={"Received By"}
                            value={donation.receivedBy}
                          />
                          <StepperCheckbox
                            name={"Cheque"}
                            value={donation.isCash}
                            onChange={(e) =>
                              setDonation({
                                ...donation,
                                isCheque: e.target.checked,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <div class="Container">
                            <StepperContent
                              name={"Bank Name"}
                              placeholder={"Bank Name"}
                              value={donation.bankName}
                              disabled={donation.isCheque ? false : true}
                              onChange={(e) =>
                                setDonation({
                                  ...donation,
                                  bankName: e.target.value,
                                })
                              }
                            />
                            <StepperContent
                              name={"IBAN"}
                              placeholder={"IBAN"}
                              value={donation.iban}
                              disabled={donation.isCheque ? false : true}
                              onChange={(e) =>
                                setDonation({
                                  ...donation,
                                  iban: e.target.value,
                                })
                              }
                            />
                            <StepperTextArea
                              name={"Address"}
                              placeholder={"Address"}
                              value={donation.address}
                              disabled={donation.isCheque ? false : true}
                              onChange={(e) =>
                                setDonation({
                                  ...donation,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={nextStepper}>
                        Next
                      </button>
                    </div>
                    <div id="submit-part" className="content" role="tabpanel">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="box-profile">
                            <div className="text-center">
                              <img
                                className="profile-user-img img-circle"
                                src={donation.chequeImage}
                                alt="cheque"
                                style={{ width: 300, height: 300 }}
                                disabled={donation.isCheque ? false : true}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label> File input </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="exampleInputFile"
                                  onChange={handleUpload}
                                  disabled={donation.isCheque ? false : true}
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
                        onClick={createDonation}
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
