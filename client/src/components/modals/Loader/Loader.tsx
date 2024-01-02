import styled from '@_settings/styled';
import React, { useState } from 'react';
import useInterval from '@hooks/useInterval';

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(204, 207, 209, 0.5);
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

// [loading...] 문자 모아 놓음
const loadingLetters = ['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'];

//pink color와 비슷한 색 종류별로 모아 놓음
const pinkColors = ['pink', 'lightpink', 'hotpink', 'deeppink', 'palevioletred', 'mediumvioletred'];

//color가 1초마다 바뀌도록 하기
const Loader = () => {
  const [randomNum, setRandomNum] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [colors, setColors] = useState(pinkColors);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [delay, setDelay] = useState(500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRunning, setIsRunning] = useState(true);

  // 0.5초 마다 다른 random 숫자 가져오기
  useInterval(
    () => {
      setRandomNum(Math.floor(Math.random() * colors.length));
    },
    isRunning ? delay : null,
  );

  return (
    <StyledLoader>
      {loadingLetters.map((v, i) => {
        return (
          //state값이 아닌 외부함수의 리턴값을 넣으면 map의 모든 value값에  각각 서로 다르게 적용이 가능하게 됨
          <span style={{ color: `${shuffle(colors)[randomNum]}` }} key={i}>
            {v}
          </span>
        );
      })}
    </StyledLoader>
  );
};

export default Loader;
//로딩이 오래 걸릴만한곳을 찾아서 주로 쓰기
