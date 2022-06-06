import styled from '@_settings/styled';

interface Props {
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void; //아무것도 반환하지 않는 함수(undefined를 반환 하는 함수)에 사용하는 타입
}

const StyledButton = styled.button`
  border: none;
`;

const Button = ({ type, onClick, text }: Props) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};
export default Button;
