import React, { useEffect, useState } from "react";
import Stepper from "bs-stepper";
import StepperHeader from "../Common/Stepper/stepperHeader";
import StepperContent from "../Common/Stepper/stepperContent";
import StepperSelect from "../Common/Stepper/stepperSelector";
import UserService from "../../services/users.service.js";
import axios from "axios";
export default function UpdateUser(props) {
  const [user, setUser] = useState({
    name: "",
    role: "Role",
    email: "",
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
        setUser({ ...user, image: res.data.url });
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const headers = [
    {
      target: "#student-part",
      name: "User Information",
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
    UserService.getUser(id).then(
      (response) => {
        setUser(response.data);
        console.log(user);
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

  const updateUser = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    UserService.updateUser(id, user).then(
      () => {
        alert("User Updated Successfully");
        window.location.reload();
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
    <div className="content-wrapper fill-window">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Register User</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active">Register User</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Card Start */}
            <div className="card card-default">
              {/* Card Header Start */}
              <div className="card-header">
                <h3 className="card-title"> Add New User </h3>
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
                            value={user.name}
                            name={"Name"}
                            onChange={(event) =>
                              setUser({
                                ...user,
                                name: event.target.value,
                              })
                            }
                          />
                          {/* Sex */}
                          <StepperSelect
                            name={"Role"}
                            value={user.role}
                            options={["Role", "Admin", "Student", "Finance"]}
                            onChange={(event) =>
                              setUser({
                                ...user,
                                role: event.target.value,
                              })
                            }
                          />
                          {/*Religion*/}
                          <StepperContent
                            name={"Email Address"}
                            value={user.email}
                            placeholder={"Email Address"}
                            onChange={(event) =>
                              setUser({
                                ...user,
                                email: event.target.value,
                              })
                            }
                          />

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
                                src={user.image}
                                alt="User profile picture"
                                style={{ width: 300, height: 300 }}
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-block"
                            style={{ margin: 5 }}
                            type="button"
                            onClick={updateUser}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
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
    </div>
  );
}
