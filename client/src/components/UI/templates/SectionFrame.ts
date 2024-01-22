import styled from '@_settings/styled';

export const SECTION = {} as any;

SECTION.Frame = styled.section`
  // border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px 25px 100px 25px;
  margin-bottom: 100px;
  color: ${({ theme }) => theme.FONT_C};
`;
