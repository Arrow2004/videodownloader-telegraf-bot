const instagram_download = require("@juliendu11/instagram-downloader");
module.exports = async function download(url) {
  try {
    const value = await instagram_download.downloadMedia(url, "instagram/");
    return value;
  } catch (e) {
    return { error: e };
    console.log(e);
  }
};
