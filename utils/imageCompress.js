const fs = require('fs');
const path = require('path');
const { compressImages } = require('../src/API/cropImage');
const ActualContent = require('../src/Models/ActualContent');
const Category = require('../src/Models/Category');
const Command = require('../src/Models/Command');
const Corps = require('../src/Models/Corps');
const Link = require('../src/Models/Link');
const MediaCategory = require('../src/Models/MediaCategory');
const News = require('../src/Models/News');
const Page = require('../src/Models/Page');

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

const updateDB = (currentImgNames, newImgNames) => {
  currentImgNames.forEach(async (currName) => {
    const currBase = path.parse(currName).name;
    const imgIndex = newImgNames.findIndex((img) => img.startsWith(currBase));

    await ActualContent.updateMany({ img: currName }, { img: newImgNames[imgIndex] });
    await Category.updateMany({ signImg: currName }, { signImg: newImgNames[imgIndex] });
    await Command.updateMany({ signImg: currName }, { signImg: newImgNames[imgIndex] });
    await Corps.updateMany({ img: currName }, { img: newImgNames[imgIndex] });
    await Link.updateMany({ img: currName }, { img: newImgNames[imgIndex] });
    await News.find({ mainPhoto: currName }, { mainPhoto: newImgNames[imgIndex] });
    await Page.find({ mainPhoto: currName }, { mainPhoto: newImgNames[imgIndex] });

    const imageGalery = await MediaCategory
      .find({ photos: currName })
      .select({ _id: 1, photos: 2 })
      .lean();

    const galeryIndex = imageGalery.photos.indexOf(currName);
    if (galeryIndex > -1) {
      const newGaleryImgs = [
        ...imageGalery.photos.slice(0, galeryIndex),
        newImgNames[imgIndex],
        ...imageGalery.photos.slice(galeryIndex + 1),
      ];
      await MediaCategory.findByIdAndUpdate(imageGalery._id, { photos: newGaleryImgs });
    }

    const newsSlider = await News
      .find({ slider: currName })
      .select({ _id: 1, slider: 2 })
      .lean();

    const newsIndex = newsSlider.slider.indexOf(currName);
    if (newsIndex > -1) {
      const newsSliderUpdated = [
        ...newsSlider.photos.slice(0, newsIndex),
        newImgNames[imgIndex],
        ...newsSlider.photos.slice(newsIndex + 1),
      ];

      await News.findByIdAndUpdate(newsSlider._id, { slider: newsSliderUpdated });
    }

    const pagesSlider = await Page
      .find({ slider: currName })
      .select({ _id: 1, slider: 2 })
      .lean();

    const pagesIndex = pagesSlider.slider.indexOf(currName);
    if (pagesIndex > -1) {
      const pagesSliderUpdated = [
        ...pagesSlider.photos.slice(0, pagesIndex),
        newImgNames[imgIndex],
        ...pagesSlider.photos.slice(pagesIndex + 1),
      ];

      await News.findByIdAndUpdate(pagesSlider._id, { slider: pagesSliderUpdated });
    }
  });
};

const imageCompressUtil = async (sourceDir, outputDir) => {
  if (!sourceDir || !outputDir) return;

  const imageNames = fs.readdirSync(sourceDir);

  const imagesWithPath = imageNames
    .map((item) => path.join(sourceDir, item))
    .filter((item) => isImage(item));

  const compressedNames = await compressImages(imagesWithPath, outputDir);

  updateDB(imageNames, compressedNames);
};

imageCompressUtil(sourceDir, outputDir)
  .then(() => {
    console.info('Image Compress Util. Work done!');
  });
