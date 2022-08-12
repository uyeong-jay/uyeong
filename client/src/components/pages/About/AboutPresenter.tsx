import styled from '@_settings/styled';
import Head from 'next/head';
import Image from 'next/image';

const AboutPresenter = () => {
  const StyledAbout = styled.section`
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 750px;

    & > header {
      border: 1px solid red;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & img {
        border-radius: 100px;
      }

      & > p {
        border: 1px solid black;

        & > .underline {
          position: relative;
        }

        & > .underline:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 0px;
        }

        & .underline:nth-child(1):after {
          animation: underline_purple 3s ease-in-out 0s forwards;
          background: url('/pencils/purple_pencil.png');
          background-size: 100px 15px;
        }
        & .underline:nth-child(2):after {
          animation: underline_blue 3s ease-in-out 0.6s forwards;
          background: url('/pencils/blue_pencil.png');
          background-size: 100px 15px;
        }
        & .underline:nth-child(4):after {
          animation: underline_green 3s ease-in-out 1.2s forwards;
          background: url('/pencils/green_pencil.png');
          background-size: 100px 15px;
        }

        @keyframes underline_purple {
          from {
            opacity: 0;
            width: 0px;
            height: 15px;
          }
          to {
            opacity: 0.7;
            width: 100px;
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
            width: 100px;
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
            width: 100px;
            height: 15px;
          }
        }
      }
    }
  `;

  return (
    <>
      <Head>
        <title>UYeong | About</title>
      </Head>
      <StyledAbout>
        <header>
          <Image src={'/profile.jpg'} alt="profile" width={200} height={200} />
          <p>
            안녕하세요! 저는 <strong className="underline">프론트 엔드</strong>를 개발자를 꿈꾸고 있는{' '}
            <strong className="underline">장우영</strong> 입니다.
            <br />
            저의 <strong className="underline">목표</strong>는 재미, 변화, 소통을 통해 계속해서 발전해내가는 개발자 되는
            것 입니다.
          </p>
        </header>
        <section>oo</section>
      </StyledAbout>
    </>
  );
};

export default AboutPresenter;
