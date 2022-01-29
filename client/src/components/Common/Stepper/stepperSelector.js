import React from "react";
export default function StepperSelect(params) {
  return (
    <div className="form-group">
      <label>{params.name}</label>
      <select
        className="form-control select2"
        style={{ width: "100%" }}
        value={params.value}
        onChange={params.onChange}
      >
        {params.options.map((option, i) => (
          <option key={i} selected={i === 0 ? null : "selected"}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
