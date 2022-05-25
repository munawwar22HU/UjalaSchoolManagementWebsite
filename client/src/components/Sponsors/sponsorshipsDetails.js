import react, { useState, useEffect } from "react";
import DataTable from "../Common/Table/dataTable.js";
import SponsorshipsService from "../../services/sponsorships.service.js";

export default function SponsorshipDetails(props) {
  const [sponsorsList, setSponsorList] = useState([]);
  const [dummyState, rerender] = useState(1);
  const [message, setMesagge] = useState({
    text: "",
  });

  const updateSponsor = (id) => {
    props.history.push("/finance/edit-sponsorship/" + id);
  };

  const deleteSponsor = (id) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Donor ?"
    );
    if (confirmBox === true) {
      SponsorshipsService.deleteSponsorship(id).then(
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
      Header: "Donors Information",
      columns: [
        {
          Header: " Sponsorship Number",
          accessor: "sponsorshipNumber",
        },
        {
          Header: "Sponsor Name",
          accessor: "sponsorName",
        },
        {
          Header: "Student Name",
          accessor: "studentName",
        },
        {
          Header: "Roll Number",
          accessor: "studentRollNumber",
        },
        {
          Header: "Start Date",
          accessor: "startDate",
        },
        {
          Header: "End Date",
          accessor: "endDate",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Number of Installments",
          accessor: "numberOfInstallments",
        },
        {
          Header: "Edit",
          accessor: "edit",
          disableFilters: true,
          disableSortBy: true,
          Cell: (row) => (
            <div>
              <button onClick={(e) => updateSponsor(row.row.original._id)}>
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
              <button onClick={(e) => deleteSponsor(row.row.original._id)}>
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
    SponsorshipsService.getAllSponsorships().then(
      (response) => {
        setSponsorList(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
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
              <h1>Student Details</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/student">Home</a>
                </li>
                <li className="breadcrumb-item active">Donor Details</li>
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
                <h3 className="card-title">All Donors</h3>
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
                  data={sponsorsList}
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
