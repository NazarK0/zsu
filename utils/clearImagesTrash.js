const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGiflossy = require('imagemin-giflossy');
const imageminSvgo = require('imagemin-svgo');

const args = process.argv.slice(2);

const sourceDirKeyIndex = args.findIndex((param) => param === '-s' || param === '--source-dir') + 1;
const sourceDir = args[sourceDirKeyIndex];

const isFile = (pathUrl) => {
  try {
    return fs.statSync(pathUrl).isFile();
  } catch (error) {
    return false;
  }
};

const isDirectory = (pathUrl) => fs.statSync(pathUrl).isDirectory();


const rmDirectories = () => {
  if (isDirectory(sourceDir)) {
    const imageNames = fs.readdirSync(sourceDir);

    imageNames.forEach((imageName) => {
      const relativePath = path.join(sourceDir, imageName);
      if (isDirectory(relativePath)) {
        fs.rmdirSync(relativePath, { recursive: true });
      }
    });
  }
};
const removeUnlinked = async () => {
  if (isDirectory(sourceDir)) {
    const imageNames = fs.readdirSync(sourceDir);

  }
};

(() => {
  try {
    rmDirectories();
  } catch (error) {
    fs.writeFileSync('clearImagesTrashError.log', error);
  }
})();
