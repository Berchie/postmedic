const config = require("./utils/config");
const express = require("express");
const app = express();
const logger = require("./utils/logger");

app.get("/", (req, res) => {
  res.status(200).end("Welcome to PostMedic API");
});

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
