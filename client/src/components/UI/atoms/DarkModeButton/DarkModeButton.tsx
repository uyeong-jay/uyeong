import React from 'react';
import styled from '@_settings/styled';

interface DarkModeProps {
  isDarkTheme: boolean;
  onClickDarkMode: () => void;
}

const StyledDarkModeButton = styled.div`
  & > button {
    // border: 1px solid black;
    background-color: inherit;
    cursor: pointer;
    position: absolute;
    top: 14px;
    right: calc(100px + 6.7vw);
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.FONT_C};

    & > svg {
      // border: 1px solid red;
      position: absolute; // 모바일에서는 width가 재대로 적용되지 않아 absolute 추가
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @media screen and (min-width: 833px) {
      right: 130px;
    }
  }

  &.app {
    --transition-duration: 100ms;
    --text: ${({ theme }) => theme.FONT_C};
  }

  &.app {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    transition: color, background-color var(--transition-duration);
  }

  &.app svg {
    transition: stroke var(--transition-duration);
    stroke: var(--text);
  }

  &.app .moon-icon {
    stroke-dasharray: 0px 1px;
    opacity: 0;
    transition: stroke-dasharray 0.5s ease-in, opacity 100ms ease-in;
  }

  &.app .sun-icon {
    stroke-dasharray: 1px 1px;
    opacity: 1;
    transition: stroke-dasharray 0.5s ease-in, opacity 100ms ease-in;
  }

  &.app.dark .moon-icon {
    stroke-dasharray: 1px 1px;
    opacity: 1;
  }

  &.app.dark .sun-icon {
    stroke-dasharray: 0px 1px;
    opacity: 0;
  }
`;

const DarkModeButton = ({ isDarkTheme, onClickDarkMode }: DarkModeProps) => {
  return (
    <StyledDarkModeButton className={`app ${isDarkTheme ? 'dark' : ''}`}>
      <button onClick={onClickDarkMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 25 25"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          // preserveAspectRatio="xMidYMid slice"
        >
          {/* Moon  */}
          <path pathLength="1" className="moon-icon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>

          {/* Sun  */}
          <circle pathLength="1" className="sun-icon" cx="12" cy="12" r="5"></circle>
          <line pathLength="1" className="sun-icon" x1="12" y1="1" x2="12" y2="3"></line>
          <line pathLength="1" className="sun-icon" x1="12" y1="21" x2="12" y2="23"></line>
          <line pathLength="1" className="sun-icon" x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line pathLength="1" className="sun-icon" x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line pathLength="1" className="sun-icon" x1="1" y1="12" x2="3" y2="12"></line>
          <line pathLength="1" className="sun-icon" x1="21" y1="12" x2="23" y2="12"></line>
          <line pathLength="1" className="sun-icon" x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line pathLength="1" className="sun-icon" x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
    </StyledDarkModeButton>
  );
};

export default DarkModeButton;
