import { DIV } from './AboutStyle';
import Head from 'next/head';
import LocationIcon from '@icons/LocationIcon';
import EnvelopeIcon from '@icons/EnvelopeIcon';
import GithubIcon from '@icons/GithubIcon';
import InstagramIcon from '@icons/InstagramIcon';
import Badges from '../AboutComponents/Badges/Badges';
import NavLinkBox from '@molecules/NavLinkBox';
import AboutAvatar from '@pages/About/AboutComponents/AboutAvatar';
import QuoteLeftIcon from '@icons/QuoteLeftIcon';
import QuoteRightIcon from '@icons/QuoteRightIcon';
import PageTitle from '@atoms/PageTitle';
import PageFrame from '@templates/PageFrame';
import Link from 'next/link';

const AboutPresenter = () => {
  return (
    <>
      <Head>
        <title>UYeong | About</title>
      </Head>
      <PageFrame>
        <PageTitle text="About" />

        {/* 1 */}
        <DIV.AboutMeAvatar>
          <AboutAvatar />
        </DIV.AboutMeAvatar>

        {/* 2 */}
        <DIV.AboutMe>
          <div>
            <p>U Yeong Jang</p>
            <p>Front-end developer</p>
            <Link href="/">Managing my daily blog</Link>
          </div>
          <div>
            <ul>
              <li>
                <LocationIcon /> Korea, Repulic of
              </li>
              <NavLinkBox href="mailto: wjacob2103@gmail.com" passHref={true} target="_blank" rel="noopener noreferrer">
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
        </DIV.AboutMe>

        {/* 3 */}
        <DIV.AboutMeQuote>
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
        </DIV.AboutMeQuote>

        {/* 4 */}
        <DIV.AboutMeDetail>
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
        </DIV.AboutMeDetail>
      </PageFrame>
    </>
  );
};

export default AboutPresenter;
