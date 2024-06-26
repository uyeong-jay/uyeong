import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import styled from '@_settings/styled';

interface Props {
  labelText?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  spellCheck?: boolean;
}

const StyledTextareaBox = styled.div`
  // border: 1px solid red;
`;

const StyledLabel = styled.label`
  // border: 1px solid red;
  color: ${({ theme }) => theme.FONT_C};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const StyledTextarea = styled.textarea`
  // border: 1px solid red;
  border: none;
  background-color: ${({ theme }) => theme.BG_C};
  transition: background-color 0.25s linear; // for theme mode
  resize: none; //textarea 크기조절 막기
  color: ${({ theme }) => theme.FONT_C};
  caret-color: ${({ theme }) => theme.FONT_C};
`;

const TextareaBox = (
  { labelText, name, value, onChange, placeholder, required, spellCheck }: Props,
  ref?: ForwardedRef<HTMLTextAreaElement>,
) => {
  return (
    <StyledTextareaBox>
      {labelText && <StyledLabel>{labelText}</StyledLabel>}
      <StyledTextarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required ? true : false}
        spellCheck={spellCheck ? false : true}
        ref={ref}
      />
    </StyledTextareaBox>
  );
};

export default forwardRef(TextareaBox);
