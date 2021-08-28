const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
async function getInfo(url) {
  qualities = [140, 133, 18, 135, 136, 137];
  resFormats = [];
  info = await ytdl.getInfo(url);
  info.formats.map((e) => {
    qualities.includes(e.itag)
      ? resFormats.push({
          quality: e.qualityLabel ? e.qualityLabel : "mp3",
          itag: e.itag,
          has: [e.hasAudio, e.hasVideo],
          apporxSize: (
            ((e.approxDurationMs / 1000) * e.bitrate) /
            (8 * 1024 * 1024)
          ).toFixed(2),
        })
      : 0;
  });
  return resFormats;
}

async function download(url, itag, id, isMp3) {
  var audio = ytdl(url, {
    filter: (format) => format.itag === 140,
  });
  var audioWritable = fs.createWriteStream("youtube/" + id + ".mp3");
  var stream = audio.pipe(audioWritable);
  var endAudio = new Promise((resolve, reject) => {
    stream.on("error", (err) => {
      console.log(err);
      return false;
    });
    stream.on("finish", () => {
      if (isMp3) {
        resolve("youtube/" + id + ".mp3");
      } else {
        resolve(false);
      }
    });
  });
  let res = await endAudio;
  if (res) {
    return res;
  }
  var videoReadableStream = ytdl(url, {
    filter: (format) => format.itag === itag,
  });
  var endVideo = new Promise((resolve, reject) => {
    ffmpeg()
      .addInput(videoReadableStream)
      .addInput("youtube/" + id + ".mp3")
      .saveToFile(`youtube/${id}.mp4`)
      .on("end", () => {
        resolve(`youtube/${id}.mp4`);
      });
  });
  res = await endVideo;
  return endVideo;
}
module.exports = { download, getInfo };
//download("https://youtu.be/O_1HOhck3vk", 134, 871447523, false);
