import { useEffect } from 'react';
import AboutPresenter from './AboutPresenter';

const AboutContainer = () => {
  // about 페이지 렌더링이 완료되었을때 해당 페이지에서만 사용될 폰트 다운로드
  // (바로 보이지 않아도 되는 용량이 있는 폰트만)
  useEffect(() => {
    const MaplestoryFont = new FontFace('MaplestoryOTFBold', "url(/fonts/MaplestoryOTFBold.woff) format('woff')");

    const GangwonEduFont = new FontFace('GangwonEdu_OTFBoldA', "url(/fonts/GangwonEdu_OTFBoldA.woff) format('woff')");

    Promise.all([MaplestoryFont.load(), GangwonEduFont.load()]) // 2종류의 폰트 동시에 다운로드
      .then((loadedFonts) => {
        loadedFonts.forEach((font) => {
          document.fonts.add(font); // 브라우저에 폰트를 등록
        });
      })
      .catch((err) => {
        console.log('font failed to load', err);
      });
  }, []);

  return <AboutPresenter />;
};

export default AboutContainer;
