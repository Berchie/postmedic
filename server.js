const config = require('./utils/config');
const express = require ('express');
const app = express();
const logger = require('./utils/logger');



app.listen(config.PORT, ()=>{
  logger.info(`Server is running on port ${config.PORT}`);
})