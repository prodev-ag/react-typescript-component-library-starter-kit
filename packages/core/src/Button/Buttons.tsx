import React from "react";
import { Add } from '@library/icons';

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button>
    {props.label}
    <Add />
  </button>;
};

export default Button;
