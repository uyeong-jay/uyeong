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
  // justify-content: center; //안먹힘
  margin: 0 auto; //justify대체, 확대시 왼쪽 구석 확대 가능
  align-items: center;
  position: relative;
  width: 1200px;
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
