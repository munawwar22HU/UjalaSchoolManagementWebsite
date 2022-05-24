import React from "react";
export default function StepperCheckbox(props) {
  return (
    <div className="form-group">
      <label className="checkbox-inline">
        {props.name}{" "}
        <input type="checkbox" value={props.value} onChange={props.onChange} />
      </label>
    </div>
  );
}
