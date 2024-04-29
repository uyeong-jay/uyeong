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
  autofill?: boolean;
}

interface InputProps {
  disabled: boolean;
  autofill?: boolean;
}

const StyledInputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  // border: 1px solid black;
  color: ${({ theme }) => theme.FONT_C};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const StyledInput = styled.input<InputProps>`
  // border: 1px solid red;
  border: none;
  background-color: ${({ theme }) => theme.BG_C};
  margin: 0;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.FONT_C};
  outline: none;

  &:autofill,
  &:autofill:hover,
  &:autofill:focus,
  &:autofill:active {
    background-clip: text;
    text-fill-color: ${({ theme }) => theme.FONT_C};
    ${(props) => {
      if (props.autofill) {
        return `
          box-shadow: inset 0 0 0 50px ${props.theme.LIGHT_BG_C};
          transition: background-color 5000s ease-in-out 0s; //구 크롬 
        `;
      }
    }}
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.FONT_C};
    ${(props) => {
      if (props.autofill) {
        return `
          box-shadow: inset 0 0 0 50px ${props.theme.LIGHT_BG_C};
          transition: background-color 5000s ease-in-out 0s; //구 크롬 
        `;
      }
    }}
  }

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
    autofill = true,
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
        autofill={autofill ? true : false}
        spellCheck={false}
      />
    </StyledInputBox>
  );
};

export default forwardRef(InputBox);
