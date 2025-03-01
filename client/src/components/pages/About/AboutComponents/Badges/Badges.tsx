import React, { useState } from 'react';
import { badgeData as badges } from './BadgeData';
import { DIV } from './BadgesStyle';
import Badge from './Badge';

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
                return (
                  <Badge
                    key={badgeItem.name}
                    badgeItem={badgeItem}
                    isClicked={isAllBadgesActive ? !isClicked : isClicked}
                    onClickBadge={onClickBadge}
                  />
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
