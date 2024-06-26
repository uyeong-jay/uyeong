import styled from '@_settings/styled';
import Footer from '@organisms/Footer';
import Header from '@organisms/Header';

interface AppLayoutProps {
  children: React.ReactNode;
  isDarkTheme: boolean;
  onClickDarkMode: () => void;
}

const StyledAppLayout = styled.div`
  // border: 1px solid red;
  position: relative;
  min-width: 320px;
  min-height: 100%;
  padding-bottom: 200px;
  background-color: ${({ theme }) => theme.BG_C};
  transition: background-color 0.25s linear; // for theme mode
`;

const AppLayout = ({ children, isDarkTheme, onClickDarkMode }: AppLayoutProps) => {
  return (
    <StyledAppLayout>
      <Header isDarkTheme={isDarkTheme} onClickDarkMode={onClickDarkMode} />
      {children}
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;
