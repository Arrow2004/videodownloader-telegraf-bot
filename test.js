const { unlink } = require("fs/promises");
async function deleteFile() {
  await unlink("youtube/871447523.mp3");
  console.log("successfully deleted mp3");
}
deleteFile();
