import React, { useEffect, useState } from "react";

import DataTable from "../dataTable.js";
import TeacherService from "../../services/teacher.service";

export default function TeacherDetails(props) {
  const [teachersList, setTeacherList] = useState([]);
  const [dummyState, rerender] = React.useState(1);
  const [message, setMesagge] = useState({
    text: "",
  });

  const updateTeacher = (id) => {
    props.history.push("/student/teacher/" + id);
  };

  const deleteTeacher = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Teacher ?"
    );
    if (confirmBox === true) {
      TeacherService.deleteTeacher(id).then(
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
          setMesagge({ ...message, text: resMessage });
        }
      );
    }
  };

  const columns = [
    {
      Header: "Teacher's Information",
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
          Header: "Address",
          accessor: "address",
          disableSortBy: true,
        },
        {
          Header: "Contact Number",
          accessor: "contactNumber",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Class",
          accessor: "class",
          disableSortBy: true,
        },
        {
          Header: "Edit",
          accessor: "edit",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => updateTeacher(row.row.original._id)}>
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
              <button onClick={(e) => deleteTeacher(row.row.original._id)}>
                <i className="fas fa-trash-alt" aria-hidden="true" />
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    console.log("dummyState's state has updated to: " + dummyState);
    TeacherService.getAllTeachers().then(
      (response) => {
        setTeacherList(response.data);
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
              <h1>Teacher Details</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/student">Home</a>
                </li>
                <li className="breadcrumb-item active">Teacher Details</li>
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
                <h3 className="card-title">All Teachers</h3>
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
                  data={teachersList}
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
