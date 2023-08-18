import styled from '@_settings/styled';

interface Props {
  variant: string;
  text: string;
  type: 'button' | 'submit';
  onClick?: () => void; //아무것도 반환하지 않는 함수(undefined를 반환 하는 함수)에 사용하는 타입
  disabled: boolean;
}

interface ButtonProps {
  variant: string;
}

const StyledButton = styled.button<ButtonProps>`
  font-weight: bold;

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
          // border: 1px solid magenta;
          // background-color: rgb(238, 130, 238, 0.6);
          // border: 1px solid #333333;
          background-color: transparent;
          color: ${props.theme.FONT_C};
          font-weight: bold;
        `;
      case 'logout':
        return `
          // border: 1px solid black;
          background-color: white;
        `;
      default:
        return `
          // border: 1px solid black;
          background-color: white;
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

export default Button;
