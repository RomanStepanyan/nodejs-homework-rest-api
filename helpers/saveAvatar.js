const jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();

const saveAvatar = async (req) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`;
  const img = await jimp.read(pathFile);

  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);

  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), "public", FOLDER_AVATARS, newNameAvatar)
    );
  } catch (error) {
    console.log(error.message);
  }

  const url = `${req.protocol}://${req.headers.host}/api${req.path}/${newNameAvatar}`;
  return url;
};

module.exports = {
  saveAvatar,
};
