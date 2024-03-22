import styled from '@_settings/styled';

interface HeadingListProps {
  headingLevel: number;
  headingId: string;
  activeId: string;
}

export const NAV = {} as any;
export const LI = {} as any;

NAV.Frame = styled.nav`
  display: none;
  // border: 1px solid black;
  position: absolute;
  top: 350px;
  right: -250px;
  height: 95%;
  font-size: 14px;

  & > ul {
    // border: 1px solid black;
    position: sticky;
    top: 120px;
    right: 0;
    width: 230px;
    height: 70vh;

    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      border-radius: 50%;
      width: 2px;
    }
    ::-webkit-scrollbar-track {
      // border: 1px solid black;
      margin: 1px 0;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.BD_C};
      border-radius: 10px;
    }
  }

  //1350px(post+toc+bar) = 1280px(px)+70px,
  @media screen and (min-width: calc(${({ theme }) => theme.BP.PC} + 70px)) {
    display: block;
  }
`;

LI.Heading = styled.li<HeadingListProps>`
  // border: 1px solid black;
  margin-left: ${(props) => props.headingLevel}em;
  line-height: 2;

  & > a {
    // border: 1px solid red;
    display: block;
    width: 180px;
    opacity: 0.6;
    font-weight: bold;
    color: ${({ theme }) => theme.BD_C};
    margin-left: 0;
    transition: all 0.25s ease-out;

    ${(props) => {
      if (props.headingId === props.activeId) {
        return `
          margin-left: -5px;
          opacity: 1;
        `;
      }
    }};
  }
`;
