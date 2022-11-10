import React, { ChangeEvent /* DetailedHTMLProps, InputHTMLAttributes */ } from 'react';
import styled from '@_settings/styled';

interface Props {
  labelText: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const StyledInputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-right: 10px;
  color: darkslategray;
  // white-space: pre-line;
`;

const StyledInput = styled.input`
  border: 2px dotted darkslategray;
  margin: 5px 0 30px 0;
  width: 100%;
  height: 40px;
  text-align: center;
  color: lightslategray;
`;

const InputBox = ({ labelText, name, type, value, defaultValue, onChange, placeholder, disabled, readOnly }: Props) => {
  return (
    <StyledInputBox>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledInput
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled ? true : false}
        readOnly={readOnly ? true : false}
      />
    </StyledInputBox>
  );
};

InputBox.defaultProps = {
  type: 'text',
  disabled: false,
  readOnly: false,
};

export default InputBox;
