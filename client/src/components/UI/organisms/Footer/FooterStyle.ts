import styled from '@_settings/styled';

export const FOOTER = {} as any;

FOOTER.Frame = styled.footer`
  border-top: 2px solid ${({ theme }) => theme.BD_C};
  boackground-color: ${({ theme }) => theme.BG_C};
  padding: 20px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 90%;
  color: ${({ theme }) => theme.FONT_C};

  & > div {
    // border: 1px solid black;
    height: 40px;
    display: flex;
    position: relative;

    & .logo {
      // border: 1px solid black;
      display: inline-block;
      width: 30px;
      height: 40px;
      position: absolute;
      top: 5px;
      left: -5px;
      // margin: 0 8px 0 -1px;
      font-size: 20px;
      overflow: hidden;
      fill: ${({ theme }) => theme.LOGO_C};
    }
  }

  & > ul {
    // border: 1px solid black;
    width: 100%;
    margin: 20px 0 10px 0;

    & > li {
      // border: 1px solid black;
      margin-right: 10px;
      display: block;
    }

    @media screen and (min-width: ${({ theme }) => theme.BP.TABLET}) {
      & > li {
        display: inline-block;
      }
    }
  }
`;
