import React, { ChangeEvent /* DetailedHTMLProps, InputHTMLAttributes */ } from 'react';
import styled from '@_settings/styled';

interface Props {
  labelText: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const StyledLabel = styled.label`
  display: inline-block;
  margin-right: 10px;
  color: darkslategray;
  white-space: pre-line;
`;

const StyledInput = styled.input`
  border: 2px dotted darkslategray;
  margin: 5px 0 30px 0;
  width: 70%;
  height: 40px;
  text-align: center;
  color: lightslategray;
`;

const InputBox = ({ labelText, name, type, value, onChange }: Props) => {
  return (
    <>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledInput name={name} type={type} value={value} onChange={onChange} />
    </>
  );
};

InputBox.defaultProps = {
  type: 'text',
};

export default InputBox;
