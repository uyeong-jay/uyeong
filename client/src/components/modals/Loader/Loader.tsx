import styled from '@_settings/styled';
import React, { useState } from 'react';
import useInterval from '@hooks/useInterval';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0007;
  z-index: 9999;
  user-select: none;
  font-size: 30px;
`;

// 재사용 가능성(o)
// 피셔-예이츠 셔플
function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//color가 1초마다 바뀌도록 하기
const Loader = () => {
  const loadingLetters = ['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'];
  const pinkColors = ['pink', 'lightpink', 'hotpink', 'deeppink', 'palevioletred', 'mediumvioletred'];

  const [randomNum, setRandomNum] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [colors, setColors] = useState(pinkColors);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [delay, setDelay] = useState(500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRunning, setIsRunning] = useState(true);

  // 1초 마다 다른 random 숫자 가져오기
  useInterval(
    () => {
      setRandomNum(Math.floor(Math.random() * colors.length));
    },
    isRunning ? delay : null,
  );

  return (
    <LoaderWrapper>
      {loadingLetters.map((v, i) => {
        return (
          //state값이 아닌 함수의 리턴값을 넣으니 loadingLetters가 모두 각각 다르게 적용이 가능하게 됨
          <span style={{ color: `${shuffle(colors)[randomNum]}` }} key={i}>
            {v}
          </span>
        );
      })}
    </LoaderWrapper>
  );
};

export default Loader;