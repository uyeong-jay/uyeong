import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayoutWrapper = styled.div`
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
