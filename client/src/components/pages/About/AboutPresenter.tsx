import styled from '@_settings/styled';
import Head from 'next/head';
import Image from 'next/image';
import GitHubChart from '@atoms/GitHubChart';

const AboutPresenter = () => {
  const StyledAbout = styled.section`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 750px;

    & > header {
      border: 1px solid #dadada;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > span {
        margin: 10px;
      }

      & > span img {
        border-radius: 100px;
      }

      & > p {
        border: 1px solid #dadada;
        margin: 10px;

        & > .underline {
          position: relative;
        }

        & > .underline:after {
          content: '';
          position: absolute;
          left: -10px;
          bottom: -10px;
          width: 0px;
        }

        & .underline:nth-of-type(1):after {
          //animation: 이름 유지시간 효과 딜레이시간 마지막상태유지;
          animation: underline_purple 2s ease-in-out 0s forwards;
          background: url('/pencils/purple_pencil.png');
          background-size: 110px 15px;
        }
        & .underline:nth-of-type(2):after {
          animation: underline_blue 2s ease-in-out 0.6s forwards;
          background: url('/pencils/blue_pencil.png');
          background-size: 70px 15px;
        }
        & .underline:nth-of-type(3):after {
          animation: underline_green 2s ease-in-out 1.2s forwards;
          background: url('/pencils/green_pencil.png');
          background-size: 50px 15px;
        }

        @keyframes underline_purple {
          from {
            opacity: 0;
            width: 0px;
            height: 15px;
          }
          to {
            opacity: 0.7;
            width: 110px;
            height: 15px;
          }
        }
        @keyframes underline_blue {
          from {
            opacity: 0;
            width: 0px;
            height: 15px;
          }
          to {
            opacity: 0.7;
            width: 70px;
            height: 15px;
          }
        }
        @keyframes underline_green {
          from {
            opacity: 0;
            width: 0px;
            height: 15px;
          }
          to {
            opacity: 0.7;
            width: 50px;
            height: 15px;
          }
        }
      }
    }

    & > section {
      border: 1px solid #dadada;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }
  `;

  return (
    <>
      <Head>
        <title>UYeong | About</title>
      </Head>
      <StyledAbout>
        <header>
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
        </header>
        <section>
          <GitHubChart />
          skill
        </section>
      </StyledAbout>
    </>
  );
};

export default AboutPresenter;
