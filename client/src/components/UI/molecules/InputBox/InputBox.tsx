import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import styled from '@_settings/styled';

interface Props {
  labelText?: string;
  name?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

interface InputProps {
  disabled: boolean;
}

const StyledInputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-right: 10px;
  color: ${({ theme }) => theme.FONT_C};
  letter-spacing: 0.5px;
`;

const StyledInput = styled.input<InputProps>`
  // border-bottom: 1px solid black;
  background-color: ${({ theme }) => theme.BG_C};
  margin: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  color: ${({ theme }) => theme.FONT_C};
  border: none;
  outline: none;
  ${(props) => {
    if (props.disabled) {
      return `
        opacity: 0.6;
      `;
    }
  }}
`;

const InputBox = (
  {
    labelText,
    type,
    name,
    value,
    defaultValue,
    onChange,
    onClick,
    onFocus,
    placeholder,
    disabled,
    readOnly,
    required,
  }: Props,
  ref?: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <StyledInputBox>
      <StyledLabel>{labelText}</StyledLabel>
      <StyledInput
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onClick={onClick}
        placeholder={placeholder}
        ref={ref}
        disabled={disabled ? true : false}
        readOnly={readOnly ? true : false}
        required={required ? true : false}
      />
    </StyledInputBox>
  );
};

export default forwardRef(InputBox);
