import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const StyledAppLayout = styled.div`
  // border: 1px solid red;
  // display: flex;
  // flex-direction: column;
  // position: relative;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
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
