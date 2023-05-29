import { SECTION, DIV } from './AboutStyle';
import Head from 'next/head';
import Image from 'next/image';
import GitHubChart from '@pages/About/AboutComponents/GitHubChart';
import { SubFrame } from '@templates/SubFrame';
import LocationIcon from '@icons/LocationIcon';
import EnvelopeIcon from '@icons/EnvelopeIcon';
import GithubIcon from '@icons/GithubIcon';
import InstagramIcon from '@icons/InstagramIcon';
import Badges from '../AboutComponents/Badges/Badges';
import NavLinkBox from '@molecules/NavLinkBox';
import { useEffect } from 'react';

interface Props {
  hideInSummary?: boolean;
  setHideInSummary?: (hideInSummary: boolean) => void;
}

const AboutPresenter = ({ hideInSummary, setHideInSummary }: Props) => {
  useEffect(() => {
    setHideInSummary?.(false);
  }, [setHideInSummary]);

  return (
    <>
      <Head>
        <title>UYeong | About</title>
      </Head>
      <SubFrame>
        <SECTION.Layout>
          {/* 0 */}
          {hideInSummary ? <></> : <h1>About me</h1>}

          {/* 1 */}
          {/* pc 버전 일때는 다른 사진으로? */}
          <DIV.AboutPart1>
            <div>
              <div className="about-avatar-wrapper about-avatar">
                <Image className="about-avatar" src={'/profile.jpg'} alt="profile" width={80} height={80} />
              </div>
              <p>UYeong</p>
            </div>
          </DIV.AboutPart1>

          {/* 2 */}
          <DIV.AboutPart2>
            <div>
              <p>U Yeong Jang</p>
              <p>Front-end developer</p>
              <p>A blog that records my daily life</p>
            </div>
            <div>
              <ul>
                <li>
                  <LocationIcon /> Korea, Repulic of
                </li>
                <NavLinkBox
                  href="mailto: wjacob2103@gmail.com"
                  passHref={true}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <EnvelopeIcon /> wjacob2103@gmail.com
                </NavLinkBox>
                <NavLinkBox
                  href="https://github.com/william-jacob"
                  passHref={true}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon />
                  Github
                </NavLinkBox>
                <NavLinkBox
                  href="https://www.instagram.com/__uyeong__/"
                  passHref={true}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                  Instagram
                </NavLinkBox>
              </ul>
            </div>
          </DIV.AboutPart2>

          {/* 3 */}
          {hideInSummary ? (
            <></>
          ) : (
            <DIV.AboutPart3>
              <div>
                <GitHubChart />
              </div>
            </DIV.AboutPart3>
          )}

          {/* 4 */}
          {hideInSummary ? (
            <></>
          ) : (
            <DIV.AboutPart4>
              <div>
                <h3>Experiences</h3>
                <Badges />
              </div>
              <div>
                <h3>Likes</h3>
                <ul>
                  <li>📺👀🍿</li>
                  <li>🍺🍗🍺</li>
                  <li>
                    🧑‍💻 <strong>&#62;</strong> 👨‍💻
                  </li>
                  <li>❤️ 🐕🐈 ❤️</li>
                  <li>🌴 ✈️🌏🧳📷 🌴</li>
                  <li>⚾🏀⚽🎳🏓🚴💦</li>
                </ul>
              </div>
            </DIV.AboutPart4>
          )}
        </SECTION.Layout>
      </SubFrame>
    </>
  );
};

export default AboutPresenter;
