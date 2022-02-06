import React, { useEffect, useReducer } from "react";
import { validate } from "../../Util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || "",
    isTouched: false,
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  const changeInputHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };
  const blurInputHandler = () => {
    dispatch({ type: "TOUCH" });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        onChange={changeInputHandler}
        onBlur={blurInputHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        rows={props.rows || 3}
        onChange={changeInputHandler}
        onBlur={blurInputHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
