import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayoutWrapper = styled.div`
  border: 1px solid black;
  width: 1000px;
  margin: auto;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
  color: ${({ theme }) => theme.COLOR};
`;

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <AppLayoutWrapper>
      <Header />
      {children}
      <Footer />
    </AppLayoutWrapper>
  );
};

export default AppLayout;
