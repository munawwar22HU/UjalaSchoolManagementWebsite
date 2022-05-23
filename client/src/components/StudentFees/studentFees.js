import React from "react";
import { useEffect, useState } from "react";
import StudentService from "../../services/student.service";
import FeesService from "../../services/fees.service";
import DataTable from "../Common/Table/dataTable.js";

export default function StudentFees(props) {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    class: "",
    image: "",
    sex: "",
    address: "",
    contactNumber: "",
  });

  const [unpaidList, setUnpaidList] = useState([]);
  const [paidList, setPaidList] = useState([]);
  const [dummyState, rerender] = React.useState(1);

  const updateVoucher = (id) => {
    props.history.push(`/finance/edit-fee-voucher/${id}`);
  };

  const deleteVoucher = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Voucher ?"
    );
    if (confirmBox === true) {
      FeesService.deleteVoucher(id).then(
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

  const unpaidColumns = [
    {
      Header: "Unpaid Fees Vouchers",
      columns: [
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Voucher Number",
          accessor: "voucherNumber",
        },
        {
          Header: "Total Fees",
          accessor: "totalFee",
        },
        {
          Header: "Issue Date",
          accessor: "issueDate",
          disableSortBy: true,
        },
        {
          Header: "Due Date",
          accessor: "dueDate",
          disableSortBy: true,
        },

        {
          Header: "Edit",
          accessor: "edit",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => updateVoucher(row.row.original._id)}>
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
              <button onClick={(e) => deleteVoucher(row.row.original._id)}>
                <i className="fas fa-trash-alt" aria-hidden="true" />
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  const paidColumns = [
    {
      Header: "Paid Fees Vouchers",
      columns: [
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Voucher Number",
          accessor: "voucherNumber",
        },
        {
          Header: "Total Fees",
          accessor: "totalFee",
        },
        {
          Header: "Issue Date",
          accessor: "issueDate",
          disableSortBy: true,
        },
        {
          Header: "Due Date",
          accessor: "dueDate",
          disableSortBy: true,
        },

        {
          Header: "Paid Date",
          accessor: "paidDate",
          disableSortBy: true,
        },
        {
          Header: "Paid Fees",
          accessor: "paidFee",
          disableSortBy: true,
        },
        {
          Header: "Edit",
          accessor: "edit",
          disableFilters: true,
          //   disableSortBy: true,
          //   Cell: (row) => (
          //     <div>
          //       <button onClick={(e) => updateStudent(row.row.original._id)}>
          //         <i className="fas fa-user-edit" aria-hidden="true" />
          //       </button>
          //     </div>
          //   ),
        },
        {
          Header: "Delete",
          accessor: "delete",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => deleteVoucher(row.row.original._id)}>
                <i className="fas fa-trash-alt" aria-hidden="true" />
              </button>
            </div>
          ),
        },
      ],
    },
  ];

  const newVoucher = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    props.history.push("/finance/add-fee-voucher/" + id);
  };

  const [message, setMesagge] = useState({
    text: "",
  });

  useEffect(() => {
    const id = props.match.params.id;
    StudentService.getStudent(id).then(
      (response) => {
        setStudent(response.data);

        FeesService.getAllUnpaidVouchers(id).then(
          (response) => {
            setUnpaidList(response.data);
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

        FeesService.getAllPaidVouchers(id).then(
          (response) => {
            setPaidList(response.data);
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
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Name"
                        value={student.name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Sex</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Sex"
                        value={student.sex}
                      />
                    </div>
                    <div className="form-group">
                      <label>Class</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Class"
                        value={student.class}
                      />
                    </div>
                    <div className="form-group">
                      <label>Roll Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Student Roll Number"
                        value={student.rollNumber}
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Number"
                        value={student.contactNumber}
                      />
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Student Name"
                        value={student.address}
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-circle"
                          src={student.image}
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
                <h3 className="card-title">Unpaid Fees Vouchers</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-large btn-dark"
                    onClick={newVoucher}
                  >
                    Add new
                  </button>
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
                  data={unpaidList}
                  columns={unpaidColumns}
                  props={props}
                ></DataTable>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Card to display student details */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Paid Fees Vouchers</h3>
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
                  data={paidList}
                  columns={paidColumns}
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
