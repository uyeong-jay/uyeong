import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

//AppLayout 안 은 자유롭게 배치 >> no flex
const StyledAppLayout = styled.div`
  border: 1px solid black;
  width: 1000px;
  min-height: calc(100vh - 70px);
  margin: auto;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  color: ${({ theme }) => theme.COLOR};
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
