import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const StyledAppLayout = styled.div`
  // border: 1px solid red;
  // width: 100%;
  position: relative;
  min-width: 320px;
  min-height: 100%;
  padding-bottom: 200px;
  background-color: ${({ theme }) => theme.BG_C};
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
