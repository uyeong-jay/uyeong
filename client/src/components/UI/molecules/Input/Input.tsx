import React, { ChangeEvent /* DetailedHTMLProps, InputHTMLAttributes */ } from 'react';
import styled from '@_settings/styled';

interface Props {
  labelText: string;
  variant: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  variant: string;
}

const StyledLabel = styled.label`
  display: inline-block;
  margin-right: 10px;
  color: darkslategray;
  white-space: pre-line;
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
      case 'nickName':
        return `
          border-radius: 50px 80px 50px 80px;
        `;
      case 'email':
        return `
          border-radius: 90px 55px 80px 50px;
        `;
      case 'password':
        return `
          border-radius: 50px 80px 50px 80px;
        `;
      case 'cf_password':
        return `
          border-radius: 90px 55px 80px 50px;
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

Input.defaultProps = {
  type: 'text',
};

export default Input;
