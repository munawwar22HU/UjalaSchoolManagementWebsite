import React, { useEffect, useState } from "react";
import DataTable from "../Common/Table/dataTable.js";
import ClassService from "../../services/class.service.js";

export default function ClassList(props) {
  const [studentsList, setStudentList] = useState([]);
  const [dummyState, rerender] = React.useState(1);
  const [message, setMesagge] = useState({
    text: "",
  });

  const updateStudent = (id) => {
    props.history.push("/student/classroom/" + id);
  };

  const columns = [
    {
      Header: "Students Information",
      columns: [
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Teacher",
          accessor: "teacher",
        },
        {
          Header: "Strength",
          accessor: "strength",
        },
        {
          Header: "View",
          accessor: "viw",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button
                onClick={(e) => updateStudent(row.row.original.teacherId)}
              >
                <i className="fas fa-eye"></i>
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    console.log("useEffect");
    console.log("dummyState's state has updated to: " + dummyState);
    ClassService.getAllClasses().then(
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
  }, [dummyState]);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Class List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/student">Home</a>
                </li>
                <li className="breadcrumb-item active">Class List</li>
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
