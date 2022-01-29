import React from "react";
export default function StepperContent(params) {
  return (
    <div className="form-group">
      <label>{params.name}</label>
      <input
        type="text"
        className="form-control"
        placeholder={params.placeholder}
        value={params.value}
        onChange={params.onChange}
      />
    </div>
  );
}
