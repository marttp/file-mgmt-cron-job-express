const express = require('express');
const app = express();

const { initFilePathConfig } = require('./utils/file.util.js');

const { PORT } = require('../configs/server.config');

require('./utils/cron.util');

initFilePathConfig();

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});
