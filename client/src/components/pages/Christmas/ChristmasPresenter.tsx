import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { DIV } from './ChristmasStyle';

const ChristmasPresenter = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ARMS = 2;
    const STARS = 100;

    const frag = document.createDocumentFragment();

    for (let i = 0; i < ARMS; i++) {
      for (let j = 0; j < STARS; j++) {
        const star = document.createElement('div');
        star.className = '🌟';

        star.style.setProperty('--i', String(i));
        star.style.setProperty('--j', String(j));
        star.style.setProperty('--rox', (Math.random() * 0.4 - 0.2).toFixed(2));
        star.style.setProperty('--roy', (Math.random() * 0.4 - 0.2).toFixed(2));
        star.style.setProperty('--roz', (Math.random() * 0.4 - 0.2).toFixed(2));
        star.style.setProperty('--sf', (Math.random() * 0.5 + 0.5).toFixed(2));

        frag.appendChild(star);
      }
    }

    container.appendChild(frag);

    // 다음 프레임에 표시
    requestAnimationFrame(() => {
      container.classList.remove('preparing');
      container.classList.add('ready');
    });
  }, []);

  return (
    <>
      <Head>
        <title>UYeong | Christmas</title>
      </Head>
      <DIV.ChristmasWrapper>
        <div className="christmas-msg">
          <span className="title">Merry Christmas!!</span>
          <span className="signature">— U Yeong</span>
        </div>
        <div className="christmas-tree">
          <div
            ref={containerRef}
            className="a3d preparing"
            style={
              {
                '--n-arms': 2,
                '--n-stars': 100,
                '--n-loops': 4,
              } as React.CSSProperties
            }
          />
        </div>
      </DIV.ChristmasWrapper>
    </>
  );
};

export default ChristmasPresenter;
