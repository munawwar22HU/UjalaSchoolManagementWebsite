import React from "react";

export default function StepperHeader({ headers }) {
  const n = headers.length;
  return (
    <div className="bs-stepper-header" role="tablist">
      {headers.map((header, i) => (
        <>
          <div className="step" data-target={header.target} key={i}>
            <button type="button" className="step-trigger" role="tab">
              <span className="bs-stepper-circle"> {i + 1} </span>
              <span className="bs-stepper-label">{header.name}</span>
            </button>
          </div>
          {i + 1 !== n && <div className="line" />}
        </>
      ))}
    </div>
  );
}
