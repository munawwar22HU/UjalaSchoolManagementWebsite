import React, { useState, useEffect } from "react";
import "./Login.css";
import AuthService from "../services/auth.service";

export default function Login(props) {
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      props.history.push("/home");
      window.location.reload(false);
    }
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
    message: "",
    loading: false,
    toggle: false,
  });

  const toggleVisibility = () => {
    // console.log('clicked')
    const val = !user.toggle;
    setUser({ ...user, toggle: val });
    // if (password.type === 'password') {
    //   password.type = 'text'
    // } else {
    //   password.type = 'password'
    // }
  };

  const handleLogin = () => {
    setUser({ ...user, loading: true });

    AuthService.login(user).then(
      () => {
        props.history.push("/home");
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
        setUser({ ...user, message: resMessage, loading: false });
      }
    );
  };

  return (
    <div className="login-page  container">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b> Ujala </b> Center
            </a>
          </div>
          <div className="card-body">
            <form>
              {user.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {user.message}
                  </div>
                </div>
              )}
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  value={user.email}
                  onChange={(event) => {
                    setUser({ ...user, email: event.target.value });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type={user.toggle ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  value={user.password}
                  onChange={(event) => {
                    setUser({ ...user, password: event.target.value });
                  }}
                ></input>

                <div className="input-group-append">
                  <div className="input-group-text">
                    {user.toggle ? (
                      <i
                        id="eye"
                        className="fas fa-eye"
                        onClick={toggleVisibility}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-eye-slash"
                        id="eye"
                        onClick={toggleVisibility}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {user.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <button
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                    type="button"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
