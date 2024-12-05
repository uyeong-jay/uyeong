import Image from 'next/image';
import React, { useState } from 'react';
import { badgeData as badges } from './BadgeData';
import { DIV } from './BadgesStyle';

interface BadgeItem {
  name: string;
  width: number;
  color: string;
  logoName: string;
}

interface ClickedBadges {
  [key: string]: boolean; // 각 배지 이름에 해당하는 클릭 상태를 boolean으로 표현
}

const Badges = () => {
  const [clickedBadges, setClickedBadges] = useState<ClickedBadges>({});
  const [isAllBadgesActive, setAllBadgesActive] = useState(false);

  const onClickBadge = (badgeName: string) => {
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

  const renderBadge = (badgeItem: BadgeItem, isClicked: boolean) => (
    <div
      key={badgeItem.name}
      onClick={() => onClickBadge(badgeItem.name)}
      style={{ width: badgeItem.width, height: 27 }}
    >
      {isClicked ? (
        <Image
          width={badgeItem.width}
          height={21}
          alt={badgeItem.logoName}
          src={`https://img.shields.io/badge/${badgeItem.name}-${badgeItem.color}?style=plastic&logo=${badgeItem.logoName}&logoColor=white`}
          priority
          unoptimized //src에 url 그대로 사용하기 위해 이미지 최적화 비활성
        />
      ) : (
        <span>{badgeItem.name.replace('--', '-')}</span>
      )}
    </div>
  );

  return (
    <DIV.Frame isAllBadgesActive={isAllBadgesActive}>
      <button onClick={onClickAllBadgesInactive}></button>
      <button onClick={onClickAllBadgesActive}></button>
      {/* front, back, devOps */}
      {badges.map((badge) => (
        <div key={badge.name}>
          <p>- {badge.name} -</p>
          <ul>
            <li>
              {/*  badge detail */}
              {badge.contents.map((badgeItem) => {
                const isClicked = clickedBadges[badgeItem.name] ?? false; // 클릭 여부 확인
                return renderBadge(badgeItem, isAllBadgesActive ? !isClicked : isClicked);
              })}
            </li>
          </ul>
        </div>
      ))}
    </DIV.Frame>
  );
};

export default Badges;
