import Image from 'next/image';
import React from 'react';
import { badgeData } from './BadgeData';
import { DIV } from './BadgesStyle';

const Badges = () => {
  return (
    <DIV.Frame>
      {badgeData.map((v) => (
        <div key={v.name}>
          <p>- {v.name} -</p>
          <ul>
            {/* front, back, devOps */}
            <li>
              {v.contents.map((v) => (
                /* badge */
                <div key={v.name}>
                  <Image
                    width={v.width}
                    height={20}
                    alt={v.logoName}
                    src={`https://img.shields.io/badge/${v.name}-${v.color}?style=plastic&logo=${v.logoName}&logoColor=white`}
                    priority
                  />
                </div>
              ))}
            </li>
          </ul>
        </div>
      ))}
    </DIV.Frame>
  );
};

export default Badges;
