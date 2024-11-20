module.exports = {
  "**/*.(js|md|json|yml)": (filenames) => `yarn prettier --write ${filenames.join(" ")}`,

  "nginx/*.js": (filenames) => `yarn prettier --write ${filenames.join(" ")}`,

  "**/*.(conf)": (files) => "node nginx/nginx-format.js",
};
