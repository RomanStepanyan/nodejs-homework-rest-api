const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config();
const AVATARS_DIR = path.join(
  process.cwd(),
  "public",
  process.env.FOLDER_AVATARS
);

router.use("", express.static(AVATARS_DIR));

module.exports = router;
