import { SECTION, DIV } from './AboutStyle';
import Head from 'next/head';
import { SubFrame } from '@templates/SubFrame';
import LocationIcon from '@icons/LocationIcon';
import EnvelopeIcon from '@icons/EnvelopeIcon';
import GithubIcon from '@icons/GithubIcon';
import InstagramIcon from '@icons/InstagramIcon';
import Badges from '../AboutComponents/Badges/Badges';
import NavLinkBox from '@molecules/NavLinkBox';
import AboutAvatar from '@pages/About/AboutComponents/AboutAvatar';
import QuoteLeftIcon from '@icons/QuoteLeftIcon';
import QuoteRightIcon from '@icons/QuoteRightIcon';

const AboutPresenter = () => {
  return (
    <>
      <Head>
        <title>UYeong | About</title>
      </Head>
      <SubFrame>
        <SECTION.Frame>
          {/* 1 */}
          <DIV.AboutPart1>
            <AboutAvatar />
          </DIV.AboutPart1>

          {/* 2 */}
          <DIV.AboutPart2>
            <div>
              <p>U Yeong Jang</p>
              <p>Front-end developer</p>
              <p>Managing a blog that records my daily life</p>
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
          <DIV.AboutPart3>
            <div>
              <QuoteLeftIcon />
              <p>
                Life isn&#39;t about finding yourself.
                <br />
                Life is about creating yourself.
                <br /> <span>- George Bernard Shaw -</span>
              </p>
              <QuoteRightIcon />
            </div>
          </DIV.AboutPart3>

          {/* 4 */}
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
        </SECTION.Frame>
      </SubFrame>
    </>
  );
};

export default AboutPresenter;
