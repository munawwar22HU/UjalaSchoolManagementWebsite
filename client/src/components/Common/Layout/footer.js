import React from "react";
export default function Footer () {
    var year = new Date().getFullYear();
    return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-block">
        <b>Version</b> 3.1.0
      </div>
      <strong>
        Copyright © 2014-{year} <a href="https://adminlte.io">AdminLTE.io</a>.
      </strong>{" "}
      All rights reserved.
    </footer>
  );
}