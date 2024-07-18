import styled from '@_settings/styled';

interface PublicButtonProps {
  isPublicClicked: boolean;
}

interface PrivateButtonProps {
  isPrivateClicked: boolean;
}

export const DIV = {} as any;
export const BTN = {} as any;

DIV.PublishPrivacy = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div {
    // border: 1px solid black;
    display: flex;
    width: 100%;

    & > button {
      // border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.LIGHT_BG_C};
      width: 100%;
      height: 50px;
      border-radius: 20px;
      color: ${({ theme }) => theme.FONT_C};

      & .earth-icon,
      .lock-icon {
        width: 20px;
        fill: ${({ theme }) => theme.FONT_C};
        margin-right: 10px;
      }
    }
  }
`;

BTN.PublicButton = styled.button<PublicButtonProps>`
  border: 2px solid ${({ theme }) => theme.LIGHT_BG_C};
  margin-right: 8%;

  ${(props) => {
    if (props.isPublicClicked) {
      return `
        border: 2px solid ${props.theme.BD_C};
      `;
    } else {
      return `
        &:hover {
          color: ${props.theme.FONT_C}7F; //7F: opacity 50%

          .earth-icon {
            opacity: 0.5;
          }
        }
      `;
    }
  }}
`;

BTN.PrivateButton = styled.button<PrivateButtonProps>`
  border: 2px solid ${({ theme }) => theme.LIGHT_BG_C};

  ${(props) => {
    if (props.isPrivateClicked) {
      return `
        border: 2px solid ${props.theme.BD_C};
      `;
    } else {
      return `
        &:hover {
          color: ${props.theme.FONT_C}7F; //7F: opacity 50%

          .lock-icon {
            opacity: 0.5;
          }
        }
      `;
    }
  }}
`;
