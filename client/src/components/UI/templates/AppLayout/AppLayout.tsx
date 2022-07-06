import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

//AppLayout 안 은 자유롭게 배치: no flex
//AppLayout에서 height는 AppLayout안의 요소안에 넣은 vh에 의해 결정되도록 하기
const StyledAppLayout = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justufy-content: center;
  align-items: center;
  position: relative;
  width: 1000px;
  margin: 0 auto; //중간을 크게 확대시 가운데 먼저가 아닌 왼쪽 끝부터 보이도록 함
`;

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <StyledAppLayout>
      <Header />
      {children}
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;
