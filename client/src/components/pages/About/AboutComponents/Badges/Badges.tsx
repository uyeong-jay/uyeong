import Image from 'next/image';
import React, { useState } from 'react';
import { badgeData as badges } from './BadgeData';
import { DIV } from './BadgesStyle';

interface ClickedBadges {
  [key: string]: boolean; // 각 배지 이름에 해당하는 클릭 상태를 boolean으로 표현
}

const Badges = () => {
  const [clickedBadges, setClickedBadges] = useState<ClickedBadges>({});
  const [isAllBadgesActive, setAllBadgesActive] = useState(false);

  const onClickBadge = (badgeName: string) => {
    if (isAllBadgesActive) return;
    setClickedBadges((prevState) => ({
      ...prevState,
      [badgeName]: !prevState[badgeName],
    }));
  };

  const onClickAllBadgesInactive = () => {
    if (!isAllBadgesActive) return;
    setAllBadgesActive(false);
    setClickedBadges({});
  };

  const onClickAllBadgesActive = () => {
    if (isAllBadgesActive) return;
    setAllBadgesActive(true);
    setClickedBadges({});
  };

  return (
    <DIV.Frame isAllBadgesActive={isAllBadgesActive}>
      <button onClick={onClickAllBadgesInactive}></button>
      <button onClick={onClickAllBadgesActive}></button>
      {badges.map((badge) => (
        <div key={badge.name}>
          <p>- {badge.name} -</p>
          <ul>
            {/* front, back, devOps */}
            <li>
              {badge.contents.map((badgeItem) => {
                // badge detail
                const isClicked = clickedBadges[badgeItem.name] ?? false; // 클릭 여부 확인
                return isAllBadgesActive || isClicked ? (
                  <div key={badgeItem.name} onClick={() => onClickBadge(badgeItem.name)}>
                    <Image
                      width={badgeItem.width}
                      height={21}
                      alt={badgeItem.logoName}
                      src={`https://img.shields.io/badge/${badgeItem.name}-${badgeItem.color}?style=plastic&logo=${badgeItem.logoName}&logoColor=white`}
                      priority
                    />
                  </div>
                ) : (
                  <div onClick={() => onClickBadge(badgeItem.name)} style={{ width: badgeItem.width, height: '27px' }}>
                    <span>{badgeItem.name.replace('--', '-')}</span>
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      ))}
    </DIV.Frame>
  );
};

export default Badges;
