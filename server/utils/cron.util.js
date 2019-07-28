const config = require('../../configs/server.config');
const { JOB_SCHEDULE } = config;
const moment = require('moment');
const cron = require('node-cron');

const {
  moveFileToAnother,
  readDirectory,
  createUniqueFormatDirectory
} = require('./file.util');

const { IMAGE_PATH, TMP_PATH } = require('../../configs/file.config');

cron.schedule(JOB_SCHEDULE, async () => {
  const fileList = await readDirectory(TMP_PATH);
  if (fileList.length) {
    const currentProcessDirectoryName = moment().format('YYYYMMDDHHmm');
    const eachMinutePath = await createUniqueFormatDirectory(
      currentProcessDirectoryName,
      IMAGE_PATH
    );
    await Promise.all(
      fileList.map(async file => {
        await moveFileToAnother(TMP_PATH, eachMinutePath, file);
      })
    );
    console.log(`Move files success at ${currentProcessDirectoryName}`);
  } else {
    console.log(`File not found. Nothing to do`);
  }
});
