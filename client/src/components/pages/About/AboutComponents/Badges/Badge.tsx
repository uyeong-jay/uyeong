import React, { useEffect } from 'react';
import Image from 'next/image';

interface Props {
  badgeItem: {
    name: string;
    width: number;
    color: string;
    logoName: string;
  };
  isClicked: boolean;
  onClickBadge: (badgeName: string) => void;
}

const Badge = ({ badgeItem, isClicked, onClickBadge }: Props) => {
  // about 페이지 렌더링이 완료되었을때 뱃지 이미지 다운로드
  useEffect(() => {
    const BadgeImg = new window.Image();
    BadgeImg.src = `https://img.shields.io/badge/${badgeItem.name}-${badgeItem.color}?style=plastic&logo=${badgeItem.logoName}&logoColor=white`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={() => onClickBadge(badgeItem.name)} style={{ width: badgeItem.width, height: 27 }}>
      {isClicked ? (
        <Image
          width={badgeItem.width}
          height={22}
          alt={badgeItem.logoName}
          src={`https://img.shields.io/badge/${badgeItem.name}-${badgeItem.color}?style=plastic&logo=${badgeItem.logoName}&logoColor=white`}
          priority
          unoptimized //src에 url을 그대로 사용하기 위해 이미지 최적화 비활성
        />
      ) : (
        // -- , %20 를 - 로 대체
        <span>{badgeItem.name.replace(/--|%20/g, '-')}</span>
      )}
    </div>
  );
};

export default Badge;
