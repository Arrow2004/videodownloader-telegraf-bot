const instagram_download = require("@juliendu11/instagram-downloader");
module.exports = async function download(url) {
  const value = await instagram_download.downloadMedia(url, "videos/");
  return value;
};
