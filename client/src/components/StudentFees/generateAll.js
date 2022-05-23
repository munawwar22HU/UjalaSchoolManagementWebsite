import React, { useEffect, useState } from "react";
import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";
import FeesService from "../../services/fees.service";
import axios from "axios";
export default function GenerateAll(props) {
  const [voucher, setVoucher] = useState({
    issuedById: "",
    issuedByName: "",
    totalFee: 0,
    tutionFee: 0,
    transportFee: 0,
    discount: 0,
    totalFee: 0,
    dueDate: "",
    issueDate: "",
  });
  const [studentList, setStudentList] = useState([]);
  const [dummyState, rerender] = React.useState(1);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setVoucher({
      ...voucher,
      issuedById: currentUser.id,
      issuedByName: currentUser.name,
    });
    StudentService.getAllStudents().then(
      (response) => {
        setStudentList(response.data);
        console.log(response.data);
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
    console.log(studentList);
  }, [dummyState]);

  async function generate(array) {
    const response = await axios.post("/fees/generate-all", array);
    return response.data;
  }

  const generateAll = async (event) => {
    event.preventDefault();
    const array = studentList.map((student) => {
      return {
        studentId: student._id,
        studentName: student.name,
        class: student.class,
        rollNumber: student.rollNumber,
        ...voucher,
      };
    });
    await generate(array);
    rerender(dummyState + 1);
    props.history.push("/finance/manage-fees");
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
                <li className="breadcrumb-item active"> Student Fees </li>
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
          {/* Card to display student details */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Student Details</h3>
                <div className="card-tools">
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Issued By Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Roll Number"
                        value={voucher.issuedByName}
                      />
                    </div>

                    <div className="form-group">
                      <label>Issue Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={voucher.issueDate}
                        onChange={(event) =>
                          setVoucher({
                            ...voucher,
                            issueDate: event.target.value.toString(),
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={voucher.dueDate}
                        onChange={(event) =>
                          setVoucher({
                            ...voucher,
                            dueDate: event.target.value.toString(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tution Fee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Roll Number"
                        value={voucher.tutionFee}
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
                    <div className="form-group">
                      <label>Transport Fee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Number"
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
                    </div>
                    <div className="form-group">
                      <label>Discount</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Number"
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
                    </div>
                    <div className="form-group">
                      <label>Total Fee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Number"
                        value={voucher.totalFee}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%" }}
                    onClick={generateAll}
                  >
                    {" "}
                    Generate All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Content (Page Content) End */}
    </div>
  );
}
