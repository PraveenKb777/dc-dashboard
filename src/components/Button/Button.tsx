import React, { FC } from "react";
import "./index.css";
const Button: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ ...props }) => {
  return (
    <button className="button_main-cont" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
