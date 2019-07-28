const moment = require('moment');

const currentProcessDirectoryName = moment().format('YYYYMMDDHHmm');

const IMAGE_PATH = './images';
const TMP_PATH = './tmp';

module.exports = {
  IMAGE_PATH,
  TMP_PATH,
  currentProcessDirectoryName
};
