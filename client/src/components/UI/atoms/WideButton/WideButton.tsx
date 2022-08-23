import styled from '@_settings/styled';

interface Props {
  variant: string;
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  email?: string;
  password?: string;
}

const StyledWideButtonWrapper = styled.div`
  & .login {
    border: 1px solid red;
    background-color: rgb(255, 105, 180, 0.5);
    width: 100%;
    margin-top: 10px;
    padding-left: 30px;
    text-align: left;
  }

  & .join {
    border: 1px solid teal;
    background-color: rgb(0, 255, 255, 0.5);
    width: 100%;
    margin-top: 10px;
  }
`;

const WideButton = ({ variant, text, type, email, password, onClick }: Props) => {
  return (
    <StyledWideButtonWrapper>
      <button className={`${variant}`} type={type} onClick={onClick} disabled={email && password ? false : true}>
        {text}
      </button>
    </StyledWideButtonWrapper>
  );
};

WideButton.defaultProps = {
  text: 'wide-button',
  type: 'button',
};

export default WideButton;
