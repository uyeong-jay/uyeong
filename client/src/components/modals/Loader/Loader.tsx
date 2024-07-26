import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import styled from '@_settings/styled';

interface LoaderProps {
  initialColorIndexes?: number[] | undefined;
}

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
  font-size: 30px;
  user-select: none;
`;

const loadingLetters = ['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'];
const colors = [
  '#DC143C' /* crimson */,
  '#D02090' /* violetred */,
  '#FF69B4' /* hotPink */,
  '#FF1493' /* deepPink */,
  '#DB7093' /* palevioletRed */,
  '#C71585' /* mediumvioletRed */,
  '#FF00FF' /* fuchsia */,
  '#E30B5D' /* raspberry */,
  '#F08080' /* lightcoral */,
  '#FFC0CB' /* pink */,
];

const getRandomColorIndexes = (): number[] => {
  const indexes = loadingLetters.map((_, index) => index % colors.length);

  // Fisher-Yates Shuffle
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
};

export const getServerSideProps: GetServerSideProps<LoaderProps> = async () => {
  const initialColorIndexes = getRandomColorIndexes();
  return {
    props: {
      initialColorIndexes,
    },
  };
};

const Loader: React.FC<LoaderProps> = ({ initialColorIndexes }) => {
  const [colorIndexes, setColorIndexes] = useState<number[] | undefined>(
    initialColorIndexes || loadingLetters.map((_, index) => index),
  );

  useEffect(() => {
    if (!initialColorIndexes) {
      setColorIndexes(getRandomColorIndexes());
    }

    const interval = setInterval(() => {
      setColorIndexes(getRandomColorIndexes());
    }, 500);

    return () => clearInterval(interval);
  }, [initialColorIndexes]);

  return (
    <StyledLoader>
      {loadingLetters.map((letter, index) => (
        <span key={index} style={{ color: colorIndexes && colors[colorIndexes[index]], fontSize: '24px' }}>
          {letter}
        </span>
      ))}
    </StyledLoader>
  );
};

export default Loader;
