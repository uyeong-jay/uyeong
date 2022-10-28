import styled from '@_settings/styled';

interface Props {
  variant: string;
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

interface WideButtonProps {
  variant: string;
}

const StyledWideButton = styled.button<WideButtonProps>`
  width: 100%;
  margin-top: 10px;
  padding-left: 30px;
  text-align: left;
  ${(props) => {
    switch (props.variant) {
      case 'add':
        return `
          background-color: blue;
          color: red;
        `;
      case 'delate':
        return `
          background-color: red;
        `;
      case 'update':
        return `
          border: 1px solid limegreen;
          background-color: rgb(127, 255, 0, 0.6);
        `;
      case 'login':
        return `
          border: 1px solid red;
          background-color: rgb(255, 105, 180, 0.5);
        `;
      case 'join':
        return `
          border: 1px solid teal;
          background-color: rgb(0, 255, 255, 0.5);
        `;
    }
  }}
`;

const WideButton = ({ variant, text, type, onClick, disabled }: Props) => {
  return (
    <StyledWideButton variant={variant} type={type} onClick={onClick} disabled={disabled}>
      {text}
    </StyledWideButton>
  );
};

WideButton.defaultProps = {
  type: 'button',
  disabled: false,
};

export default WideButton;
