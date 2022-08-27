import React, { ChangeEvent /* DetailedHTMLProps, InputHTMLAttributes */ } from 'react';
import styled from '@_settings/styled';

interface Props {
  labelText: string;
  variant: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  variant: string;
}

const StyledLabel = styled.label`
  color: darkslategray;
  margin-right: 10px;
`;

const StyledInput = styled.input<InputProps>`
  border: 2px dotted darkslategray;
  margin: 5px 0 30px 0;
  width: 70%;
  height: 40px;
  text-align: center;
  color: lightslategray;
  ${(props) => {
    switch (props.variant) {
      case 'email':
        return `
          border-radius: 90px 55px 80px 50px;
        `;
      case 'password':
        return `
          margin: 5px 0 5px 0;
          border-radius: 50px 80px 50px 80px;
        `;
      default:
        return `
          border-radius: 0;
        `;
    }
  }};
`;

const Input = ({ labelText, variant, name, type, value, onChange }: Props) => {
  return (
    <>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledInput variant={variant} name={name} type={type} value={value} onChange={onChange} />
    </>
  );
};

export default Input;
