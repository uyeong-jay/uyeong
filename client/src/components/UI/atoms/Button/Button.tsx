import styled from '@_settings/styled';
import { memo } from 'react';

interface Props {
  variant: string;
  text: string;
  type: 'button' | 'submit';
  onClick?: () => void;
  disabled: boolean;
}

interface ButtonProps {
  variant: string;
  disabled: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  text-align: center;
  font-weight: bold;
  padding: 1px 6px;

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
      case 'join':
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
