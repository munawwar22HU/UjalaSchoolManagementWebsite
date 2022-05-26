import React, { useEffect, useState } from "react";
import DataTable from "../Common/Table/dataTable.js";
import StudentService from "../../services/student.service.js";

export default function StudentFeesDetails(props) {
  const [studentsList, setStudentList] = useState([]);
  const [message, setMesagge] = useState({
    text: "",
  });

  const updateStudent = (id) => {
    props.history.push("/finance/manage-student-fees/" + id);
  };

  const columns = [
    {
      Header: "Students Information",
      columns: [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: " Image",
          accessor: "image",
          Cell: (row) => (
            <div>
              <img
                className="profile-user-img img-circle"
                src={row.row.original.image}
                alt="User profile "
              />
            </div>
          ),
        },
        {
          Header: "Roll Number",
          accessor: "rollNumber",
        },
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Sex",
          accessor: "sex",
          disableSortBy: true,
        },
        {
          Header: "Address",
          accessor: "address",
          disableSortBy: true,
        },
        {
          Header: "Contact Number",
          accessor: "contactNumber",
        },
        {
          Header: "Status",
          accessor: "status",
          disableSortBy: true,
        },
        {
          Header: "Edit",
          accessor: "edit",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => updateStudent(row.row.original._id)}>
                <i className="fas fa-user-edit" aria-hidden="true" />
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
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
        setMesagge({ ...message, text: resMessage });
      }
    );
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>View Students</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/finance">Home</a>
                </li>
                <li className="breadcrumb-item active">View Students</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section className="content">
        <div className="row ">
          <div className="col-12 text-center">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">All Students</h3>
              </div>
              {/* /.card-header */}
              {message.text && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message.text}
                  </div>
                </div>
              )}

              <div className="card-body">
                <DataTable
                  data={studentsList}
                  columns={columns}
                  props={props}
                ></DataTable>
              </div>

              <div className="card-footer"></div>

              {/* /.card-body*/}
            </div>
            {/* /.card */}
          </div>
        </div>
      </section>

      {/* Main content */}
    </div>
  );
}
