import React, { useState, useEffect, memo } from 'react';

interface Props {
  initialTime: number;
  onTimeout: () => void;
}

const CountdownTimer = ({ initialTime, onTimeout }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isCountdownFinished, setCountdownFinished] = useState(false);

  //Added this useEffect cause of "Cannot update a component (`JoinContainer`) while rendering a different component (`CountdownTimer`)".
  useEffect(() => {
    if (isCountdownFinished) onTimeout();
  }, [isCountdownFinished, onTimeout]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          setCountdownFinished(true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="count-down-timer">
      <p>
        {`${minutes}`}:{`${seconds}`.padStart(2, '0')}
      </p>
    </div>
  );
};

export default memo(CountdownTimer);
