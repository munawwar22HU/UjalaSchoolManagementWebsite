import React, { useState, useEffect } from "react";
export default function StepperCheckbox(props) {
  const [state, setState] = React.useState({
    checked: props.value,
  });

  return (
    <div className="form-group">
      <label className="checkbox-inline">
        {props.name}{" "}
        <input
          type="checkbox"
          value={props.value}
          onChange={props.onChange}
          checked={props.value ? true : false}
        />
      </label>
    </div>
  );
}
