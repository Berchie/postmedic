const config = require("./utils/config");
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const mongoose = require('mongoose');


//mangoDB conncection
mongoose.connect(config.MONGODB_URI, config.MONGODB_URI_CONFIG, () =>{
  logger.info("Connect to DB!")
})


app.get("/", (req, res) => {
  res.status(200).end("Welcome to PostMedic API");
});

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
