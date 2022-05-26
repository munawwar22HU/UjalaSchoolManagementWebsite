import React from "react";
import { useEffect, useState } from "react";
import StudentService from "../../services/student.service";
import TeacherService from "../../services/teacher.service";
import FeesService from "../../services/fees.service";
import DataTable from "../Common/Table/dataTable.js";

export default function Classroom(props) {
  const [teacher, setTeacher] = useState({
    name: "",
    class: "",
    image: "",
    sex: "",
    address: "",
    contactNumber: "",
  });

  const [studentList, setStudentList] = useState([]);
  const [dummyState, rerender] = React.useState(1);
  const [message, setMesagge] = useState({
    text: "",
  });

  const updateStudent = (id) => {
    props.history.push("/student/students/" + id);
  };

  const deleteStudent = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Teacher ?"
    );
    if (confirmBox === true) {
      StudentService.deleteStudent(id).then(
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
        {
          Header: "Delete",
          accessor: "delete",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => deleteStudent(row.row.original._id)}>
                <i className="fas fa-trash-alt" aria-hidden="true" />
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    const id = props.match.params.id;
    TeacherService.getTeacher(id).then(
      (response) => {
        setTeacher(response.data);

        StudentService.getStudentsInClass(response.data.class).then(
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
      {/* Content Header (Page header) Start */}
      <section className="content-header">
        {/* /.container-fluid */}
        <div className="container-fluid">
          <div className="row mb-2">
            {/* Page Heading Start */}
            <div className="col-sm-6">
              <h1>Class - {teacher.class}</h1>
            </div>
            {/* Page Heading End */}
            {/* Homepage Link Start */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/finance">Home</a>
                </li>
                <li className="breadcrumb-item active">
                  {" "}
                  Class - {teacher.class}{" "}
                </li>
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
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Name"
                        value={teacher.name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Sex</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Sex"
                        value={teacher.sex}
                      />
                    </div>

                    <div className="form-group">
                      <label>Name</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Student Name"
                        value={teacher.address}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-circle"
                          src={teacher.image}
                          alt="User profile picture"
                          style={{ width: 300, height: 300 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Card to display student details */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Students</h3>
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
                <DataTable
                  data={studentList}
                  columns={columns}
                  props={props}
                ></DataTable>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Content (Page Content) End */}
    </div>
  );
}
