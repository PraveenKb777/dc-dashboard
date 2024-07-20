import { DetailedHTMLProps, FC } from "react";
import "./index.css";

interface IInput
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

const Input: FC<IInput> = ({ label, ...props }) => {
  return (
    <div className="input_main-cont">
      {label ? (
        <label htmlFor="email" className="input_main-label">
          {label}
        </label>
      ) : null}
      <input className="input_main-input" {...props} />
    </div>
  );
};

export default Input;
