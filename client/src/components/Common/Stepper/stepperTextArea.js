import React from "react";
export default function StepperTextArea(params) {
  return (
    <div className="form-group">
      <label>{params.name}</label>
      <textarea
        className="form-control"
        rows={params.rows}
        placeholder={params.placeholder}
        value={params.value}
        onChange={params.onChange}
      />
    </div>
  );
}
