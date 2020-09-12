import React, { ChangeEvent, FC } from 'react';
import { StyledInputContainer } from './InputStyles';

interface InputProps {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  type: string;
}

const Input: FC<InputProps> = ({
  value,
  name,
  onChange,
  placeholder,
  label,
  type,
}) => {
  return (
    <StyledInputContainer>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
      />
    </StyledInputContainer>
  );
};

export default Input;
