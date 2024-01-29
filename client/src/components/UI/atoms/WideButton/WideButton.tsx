import styled from '@_settings/styled';

interface Props {
  variant?: string;
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

interface WideButtonProps {
  variant: string;
  disabled: boolean;
}

const StyledWideButton = styled.button<WideButtonProps>`
  width: 100%;
  text-align: center;
  font-weight: bold;

  ${(props) => {
    if (props.disabled)
      return `
        opacity: 0.5;
        cursor: default;
      `;
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
  }}
`;

const WideButton = ({ variant = '', text, type, onClick, disabled }: Props) => {
  return (
    <StyledWideButton variant={variant} type={type} onClick={onClick} disabled={disabled ? true : false}>
      {text}
    </StyledWideButton>
  );
};

WideButton.defaultProps = {
  type: 'button',
  disabled: false,
};

export default WideButton;
