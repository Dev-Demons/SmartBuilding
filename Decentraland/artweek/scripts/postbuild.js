const fs = require("fs");
const glob = require("glob");
const path = require("path");

const PACKAGE_JSON_PUBLIC_PATH = "./public/package.json";
const PACKAGE_JSON_TEMP_PATH = "./package.json.tmp";

const allFiles = glob.globSync("public/**/*.!(html)");
fs.mkdirSync("public/artweek", { recursive: true });
for (const file of allFiles) {
  const newFilePath = file.replace("public", "public/artweek");
  const newFileDirectory = path.dirname(newFilePath);
  if (!fs.existsSync(newFileDirectory)) {
    fs.mkdirSync(newFileDirectory, { recursive: true });
  }
  fs.renameSync(file, newFilePath);
}

if (fs.existsSync(PACKAGE_JSON_TEMP_PATH)) {
  fs.copyFileSync(PACKAGE_JSON_TEMP_PATH, PACKAGE_JSON_PUBLIC_PATH);
  fs.unlinkSync(PACKAGE_JSON_TEMP_PATH);
}
