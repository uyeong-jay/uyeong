import React from 'react';
import styled from '@_settings/styled';
import MiniLoader from '@modals/MiniLoader';

export const DIV = {} as any;

DIV.Loader = styled.div`
  // border: 1px solid red;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999; //모달 보다 낮은 레벨

  & > div {
    // border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    margin: 0 30px 25px 0;
    background-color: ${({ theme }) => theme.LIGHT_BG_C};
    border-radius: 15px;
    box-shadow: 0 2px 7px rgb(0, 0, 0, 0.2);

    @media screen and (min-width: ${({ theme }) => theme.BP.PC}) {
      margin: 0 50px 30px 0;
    }
  }
`;

const PageLoader = () => {
  return (
    <DIV.Loader>
      <div>
        <MiniLoader w={30} />
      </div>
    </DIV.Loader>
  );
};

export default PageLoader;
