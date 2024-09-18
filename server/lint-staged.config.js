module.exports = {
  // 타입스크립트 파일만 타입체크
  "**/*.(ts|tsx)": () => "yarn tsc --noEmit",

  // 타입스크립트와 자바스크립트 파일만 린트, 포맷(배열: 순서대로 실행(린트 후 포맷 됨))
  "**/*.(ts|tsx|js)": (filenames) => [
    `yarn eslint --fix ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`,
  ],

  // 마크다운과 JSON 파일만 포맷
  "**/*.(md|json)": (filenames) => `yarn prettier --write ${filenames.join(" ")}`,
};
