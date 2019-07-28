const fs = require('fs');
const { promisify } = require('util');
const { IMAGE_PATH, TMP_PATH } = require('../../configs/file.config');

const newExistFile = promisify(fs.exists);

const initFilePathConfig = async () => {
  await existDirectory(IMAGE_PATH);
  await existDirectory(TMP_PATH);
};

const createUniqueFormatDirectory = async (uniqueValue, path) => {
  const recreatePath = `${path}/${uniqueValue}`;
  await existDirectory(recreatePath);
  return recreatePath;
};

const existDirectory = async path => {
  const isExist = await newExistFile(path);
  if (!isExist) {
    fs.mkdir(path, err => {
      err ? console.log(err) : null;
    });
  }
};

const moveFileToAnother = async (oldPath, newPath, fileName) => {
  const newRename = promisify(fs.rename);
  try {
    await newRename(`${oldPath}/${fileName}`, `${newPath}/${fileName}`);
  } catch (error) {
    if (error.code === 'EXDEV') {
      await copy(`${oldPath}/${fileName}`, `${newPath}/${fileName}`);
    } else {
      throw new Error(error);
    }
  }
};

const copy = async (oldPath, newPath) => {
  try {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);
    await Promise.all([readStream, writeStream]);
    readStream.pipe(writeStream);
  } catch (error) {
    throw new Error(error);
  }
};

const newReadDirectory = promisify(fs.readdir);
const readDirectory = async directory => {
  const fileList = await newReadDirectory(directory);
  return fileList;
};

module.exports = {
  initFilePathConfig,
  moveFileToAnother,
  readDirectory,
  createUniqueFormatDirectory
};
