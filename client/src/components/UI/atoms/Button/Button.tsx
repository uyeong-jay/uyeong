import styled from '@_settings/styled';

interface Props {
  variant: string;
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void; //아무것도 반환하지 않는 함수(undefined를 반환 하는 함수)에 사용하는 타입
}

const StyledButtonWrapper = styled.div`
  & .add {
    background-color: blue;
    color: red;
  }
  & .delete {
    background-color: red;
  }
  & .update {
    background-color: green;
  }
  & .login {
    border: 1px solid red;
    background-color: rgb(255, 105, 180, 0.5);
  }
  & .logout {
    border: 1px solid magenta;
    background-color: rgb(238, 130, 238, 0.6);
  }
`;

const Button = ({ variant, text, type, onClick }: Props) => {
  return (
    <StyledButtonWrapper>
      <button className={`${variant}`} type={type} onClick={onClick}>
        {text}
      </button>
    </StyledButtonWrapper>
  );
};

Button.defaultProps = {
  text: 'button',
  type: 'button',
};

export default Button;
