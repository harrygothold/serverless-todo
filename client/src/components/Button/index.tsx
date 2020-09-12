import React, { FC } from 'react';
import { StyledButton } from './ButtonStyles';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  children: string;
}

const Button: FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
