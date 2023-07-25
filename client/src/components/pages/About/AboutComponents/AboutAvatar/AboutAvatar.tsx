import React from 'react';
import Image from 'next/image';
import styled from '@_settings/styled';

const DIV = {} as any;

DIV.Layout = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.FONT_C};

  & .about-avatar-wrapper {
    // border: 1px solid red;
    display: inline-flex;
  }

  & .about-avatar {
    // border: 1px solid red;
    border-radius: 48%;
  }

  & p {
    // border: 1px solid black;
    margin-top: 5px;
    font-size: 15px;
    letter-spacing: 2px;
  }
`;

const AboutAvatar = () => {
  return (
    <DIV.Layout>
      <div className="about-avatar-wrapper about-avatar">
        <Image
          className="about-avatar"
          src={'/images/profile.jpg'}
          alt="profile"
          objectFit="cover"
          width={100}
          height={140}
        />
      </div>
      <p>UYeong</p>
    </DIV.Layout>
  );
};

export default AboutAvatar;
