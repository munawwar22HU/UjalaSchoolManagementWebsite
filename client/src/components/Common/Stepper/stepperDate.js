import React from "react";
export default function StepperDate(params) {
  return (
    <div className="form-group">
      <label>{params.name}</label>
      <input
        type="date"
        className="form-control"
        placeholder={params.placeholder}
        value={params.value}
        onChange={params.onChange}
      />
    </div>
  );
}
