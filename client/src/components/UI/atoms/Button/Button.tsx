import styled from '@_settings/styled';
import { memo } from 'react';

interface Props {
  variant: string;
  text: string;
  type: 'button' | 'submit';
  onClick?: () => void; //아무것도 반환하지 않는 함수(undefined를 반환 하는 함수)에 사용하는 타입
  disabled: boolean;
}

interface ButtonProps {
  variant: string;
  disabled: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  font-weight: bold;

  ${(props) => {
    if (props.disabled) return `opacity: 0.5;`;
  }}

  ${(props) => {
    switch (props.variant) {
      case 'create':
        return `
          color: ${props.theme.FONT_C};
        `;
      case 'delete':
        return `
          color: ${props.theme.FONT_C_DANGER};
        `;
      case 'update':
        return `
          color: ${props.theme.FONT_C_UPDATE};
        `;
      case 'login':
        return `
          color: ${props.theme.FONT_C};
        `;
      case 'logout':
        return `
          color: ${props.theme.FONT_C};
        `;
      default:
        return `
          color: ${props.theme.FONT_C};
        `;
    }
  }}};
`;

const Button = ({ variant, text, type, onClick, disabled }: Props) => {
  return (
    <StyledButton variant={variant} type={type} onClick={onClick} disabled={disabled ? true : false}>
      {text}
    </StyledButton>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  variant: '',
};

export default memo(Button);
