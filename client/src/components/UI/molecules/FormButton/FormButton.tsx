import React from 'react';
import styled from '@_settings/styled';
import MiniLoader from '@modals/MiniLoader';
import WideButton from '@atoms/WideButton';

interface Props {
  formIsLoading: boolean;
  variant: string;
  text: string;
  disabled?: boolean;
}

interface FormButtonProps {
  disabled?: boolean;
}

const StyledFormButton = styled.div<FormButtonProps>`
  border: 2px solid ${({ theme }) => theme.BD_C};
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  //MiniLoader
  & > div:last-of-type {
    // border: 1px solid black;
    margin-bottom: 0px;
  }

  //WideButton
  & > button:last-of-type {
    // border: 1px solid black;
    position: relative;
    top: 0px;
    right: 0px;
    color: ${({ theme }) => theme.FONT_C};
    padding: 5px;
    letter-spacing: 1px;
    font-weight: bold;
    font-size: 14px;
  }
`;

const FormButton = ({ formIsLoading, variant, text, disabled }: Props) => {
  return (
    <StyledFormButton>
      {formIsLoading ? (
        <MiniLoader w="20px" h="20px" />
      ) : (
        <WideButton variant={variant} text={text} type="submit" disabled={disabled ? true : false} />
      )}
    </StyledFormButton>
  );
};

export default FormButton;
