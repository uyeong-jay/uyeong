import { StyledAbout, StyledAboutHeader, StyledAboutContents } from './AboutStyle';
import Head from 'next/head';
import Image from 'next/image';
import GitHubChart from '@atoms/GitHubChart';

const AboutPresenter = () => {
  return (
    <>
      <Head>
        <title>UYeong | About</title>
      </Head>
      <StyledAbout>
        <StyledAboutHeader>
          <span>
            <Image src={'/profile.jpg'} alt="profile" width={100} height={100} />
          </span>
          <p>
            안녕하세요! 저는 <strong className="underline">프론트 엔드</strong>를 개발자를 꿈꾸고 있는{' '}
            <strong className="underline">장우영</strong> 입니다.
            <br />
            저의 <strong className="underline">목표</strong>는 재미, 변화, 소통을 통해 계속해서 발전해내가는 개발자 되는
            것 입니다.
          </p>
        </StyledAboutHeader>
        <StyledAboutContents>
          <GitHubChart />
          skill
        </StyledAboutContents>
      </StyledAbout>
    </>
  );
};

export default AboutPresenter;
