import React, { useState, useEffect } from "react";
import authService from "../../../services/auth.service";
import axios from "axios";
export default function Profile(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    image: "",
    id: "",
  });

  const [password, updatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      props.history.push("/login");
    } else {
      setUser({
        ...user,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        image: currentUser.image,
        id: currentUser.id,
      });
    }
  }, []);

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

  // Updates user
  const updateUser = async (event) => {
    const currentUser = authService.getCurrentUser();
    axios
      .put(`/auth/${user.id}`, user)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...currentUser, image: res.data.image })
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Updates password
  const updatePasswordHandler = async (event) => {
    event.preventDefault();
    const currentUser = authService.getCurrentUser();
    const { oldPassword, newPassword, retypePassword } = password;

    const user = {
      id: currentUser.id,
      oldPassword,
      newPassword,
    };
    axios
      .post(`/auth/updatePassword`, user)
      .then((res) => {
        alert("Password updated successfully");
        authService.logout();
        props.history.push("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="content-wrapper fill-window">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile Page</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active">Profile Page</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={user.image}
                      alt="User profile picture"
                    />
                  </div>
                  <h3 className="profile-username text-center">{user.name}</h3>
                  <p className="text-muted text-center">{user.role}</p>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {/* About Me Box */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Personal Information</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <strong>
                    <i className="fas fa-book mr-1" /> Email
                  </strong>
                  <p className="text-muted">{user.email}</p>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Change Photo
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#settings"
                        data-toggle="tab"
                      >
                        Change Password
                      </a>
                    </li>
                  </ul>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      <div className="row">
                        <div className="col-md-6">
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
                        </div>
                        <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={updateUser}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="settings">
                      <form className="form-horizontal">
                        <div className="form-group">
                          <label
                            htmlFor="oldPassword"
                            className="col-sm-2 col-form-label"
                          >
                            Old Password
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="password"
                              className="form-control"
                              id="oldPassword"
                              placeholder="Old Password"
                              value={password.oldPassword}
                              onChange={(e) => {
                                updatePassword({
                                  ...password,
                                  oldPassword: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="newPassword"
                            className="col-sm-2 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              placeholder="New Password"
                              value={password.newPassword}
                              onChange={(e) => {
                                updatePassword({
                                  ...password,
                                  newPassword: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="retypePassword"
                            className="col-sm-2 col-form-label"
                          >
                            Retype New Password
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="password"
                              className="form-control"
                              id="retypePassword"
                              placeholder="Retype New Password"
                              value={password.retypePassword}
                              onChange={(e) => {
                                updatePassword({
                                  ...password,
                                  retypePassword: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          {password.newPassword === password.retypePassword ? (
                            <span className="text-success">
                              <i className="fas fa-check-circle" />
                              Password match
                            </span>
                          ) : (
                            <span className="text-danger">
                              <i className="fas fa-check-circle" />
                              Password not match
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="col-sm-10">
                            <button
                              type="submit"
                              className="btn btn-danger"
                              disabled={
                                password.newPassword === password.retypePassword
                                  ? false
                                  : true
                              }
                              onClick={updatePasswordHandler}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* /.tab-pane */}
                  </div>
                  {/* /.tab-content */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}
