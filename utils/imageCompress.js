const fs = require('fs');
const path = require('path');
const { compressImages } = require('../src/API/cropImage');
const filenameProcessor = require('../src/API/filenameProcessor');

const args = process.argv.slice(2);

const sourceDirKeyIndex = args.findIndex((param) => param === '-s' || param === '--source-dir') + 1;
const sourceDir = args[sourceDirKeyIndex];

const outputDirKeyIndex = args.findIndex((param) => param === '-o' || param === '--output-dir') + 1;
const outputDir = args[outputDirKeyIndex];

const isFile = (pathUrl) => {
  try {
    return fs.lstatSync(pathUrl).isFile();
  } catch (error) {
    return false;
  }
};

const isDirectory = (pathUrl) => fs.lstatSync(pathUrl).isDirectory();
const isImage = (pathUrl) => {
  if (isFile(pathUrl)) {
    const parsedPath = path.parse(pathUrl);
    const ext = parsedPath.ext.toLowerCase();

    return (ext.endsWith('jpg')
        || ext.endsWith('jpeg')
        || ext.endsWith('webp')
        || ext.endsWith('png')
        || ext.endsWith('svg')
        || ext.endsWith('gif'));
  }
  return false;
};

const imageCompressUtil = async (sourceDir, outputDir) => {
  if (!sourceDir || !outputDir) return;

  try {
    const imageNames = fs.readdirSync(sourceDir);
    const fixedImageWithPathNames = [];

    const imagesWithPath = imageNames
      .map((item) => path.join(sourceDir, item))
      .filter((item) => isImage(item));

    imagesWithPath.forEach((file) => {
      const { base, dir } = path.parse(file);
      const newName = filenameProcessor(base);

      fs.renameSync(
        path.join(file),
        path.join(dir, newName),
      );

      fixedImageWithPathNames.push(path.join(dir, newName));
    });

    const compressedNames = await compressImages(fixedImageWithPathNames, outputDir);
    console.log(compressedNames, 'COMP NAMES');
  } catch (error) {
    throw new Error(error.message);
  }
};

imageCompressUtil(sourceDir, outputDir)
  .then(() => {
    console.info('Image Compress Util. Work done!');
  })
  .catch((error) => {
    fs.writeFileSync('imageCompressUtilError.log', error);
  });
