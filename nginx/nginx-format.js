const fs = require("fs");
const path = require("path");

const directoryPath = __dirname; // 현재 디렉토리가 nginx 폴더이므로 __dirname만 사용

// 확장자를 변경하고 포맷을 적용한 뒤 다시 확장자 원복
fs.readdirSync(directoryPath).forEach((file) => {
  if (file.endsWith(".conf")) {
    const confFilePath = path.join(directoryPath, file);
    const tempFilePath = confFilePath.replace(".conf", ".nginxconf");

    // 확장자 변경
    fs.renameSync(confFilePath, tempFilePath);

    // Prettier 포맷 적용
    require("child_process").execSync(`yarn prettier --config --write ${tempFilePath}`);

    // 원래 확장자로 되돌리기
    fs.renameSync(tempFilePath, confFilePath);
  }
});
