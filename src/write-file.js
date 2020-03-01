const fs = require("fs");

const prepareOutputDir = (dirPath) => {
  if (dirPath === null) { return null };
  const lastChar = dirPath.charAt(dirPath.length - 1);
  return (lastChar === "/") ?
    dirPath.substr(0, dirPath.length - 1) :
    dirPath;
};

module.exports = (url, text, outputDir) => {
  console.log(`Saving file...`);

  const dir = prepareOutputDir(outputDir);

  if (dir && dir !== ".") {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) { throw err };
    });
  };

  const safeURL = url.match(/(^.*\/\/)(.*)(\/?)/i)[2];
  const now = new Date(Date.now());
  const dateString = now.toISOString().split("T")[0];
  const timeString = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`
  const name = `${safeURL}-${dateString}-${timeString}.html`;
  const outputFilePath = dir ? `${dir}/${name}` : name;
  fs.writeFileSync(outputFilePath, text);
  console.log(name);
};