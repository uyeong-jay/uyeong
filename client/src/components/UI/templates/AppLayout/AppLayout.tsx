import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const StyledAppLayout = styled.div`
  // border: 1px solid #dadada;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justufy-content: center;
  align-items: center;
  position: relative;
  width: 1200px;
  margin: 0 auto; //중간배열+중간을 크게 확대시 가운데 먼저가 아닌 왼쪽 끝부터 보이도록 함
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
