import styled from '@_settings/styled';

export const DIV = {} as any;

DIV.WriteFrame = styled.div`
  // border: 1px solid red;
  background-color: ${({ theme }) => theme.BG_C};
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999; //모달보다 낮은 레벨
`;

DIV.WriteLeftGroup = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0 0 25px;

  @media screen and (min-height: 500px) and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 50%;
  }
`;

DIV.WriteRightGroup = styled.div`
  // border: 1px solid green;
  width: 50%;
  display: none;

  @media screen and (min-height: 500px) and (min-width: ${({ theme }) => theme.BP.TABLET}) {
    display: block;
  }
`;
