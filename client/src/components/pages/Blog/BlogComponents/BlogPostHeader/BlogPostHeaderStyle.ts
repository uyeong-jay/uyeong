import styled from '@_settings/styled';

interface MiddleProps {
  category: string;
}

export const HEADER = {} as any;
export const DIV = {} as any;

HEADER.Frame = styled.header`
  // border: 1px solid black;
  width: 100%;
  margin-top: 20px;
  color: ${({ theme }) => theme.FONT_C};
`;

DIV.TitleWrapper = styled.div`
  // border: 1px solid black;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > h1 {
    // border: 1px solid black;
    width: 100%;
    margin: 20px 0 25px 0;
  }
`;

DIV.EditButtonGroup = styled.div`
  // border: 1px solid red;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

DIV.Middle = styled.div<MiddleProps>`
  // border: 1px solid black;
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  width: 100%;
  font-weight: bold;

  //category
  & > span:nth-of-type(1) {
    ${(props) => {
      if (props.category) return `border-right: 1px solid ${props.theme.BD_C};`;
      else return 'border: none;';
    }}
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 0 20px;
  }

  //date
  & > span:nth-of-type(2) {
    ${(props) => {
      if (props.category) return `border-left: 1px solid ${props.theme.BD_C};`;
      else return 'border: none;';
    }}
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding-left: 20px;
  }
`;

DIV.Bottom = styled.div`
  // border: 1px solid black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;

  & > span {
    // border: 1px solid black;
    margin: 10px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
