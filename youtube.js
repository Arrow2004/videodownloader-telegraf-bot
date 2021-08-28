const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const { unlink } = require("fs/promises");
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
  var endAudio = new Promise((resolve, reject) => {
    if (itag == 18) {
      return resolve(null);
    }
    var audio = ytdl(url, {
      filter: (format) => format.itag === 140,
    });
    var audioWritable = fs.createWriteStream("youtube/" + id + ".mp3");
    let stream = audio.pipe(audioWritable);
    stream.on("error", (err) => {
      console.log(err);
      return false;
    });
    stream.on("finish", () => {
      if (isMp3) {
        return resolve("youtube/" + id + ".mp3");
      } else {
        return resolve(false);
      }
    });
  });
  let res = await endAudio;
  console.log(res);
  if (res) {
    return res;
  }
  var endVideo = new Promise((resolve, reject) => {
    var videoReadableStream = ytdl(url, {
      filter: (format) => format.itag === itag,
    });
    if (res == null) {
      console.log("Men ishlashni boshladim...");
      videoReadableStream
        .pipe(fs.createWriteStream(`youtube/${id}.mp4`))
        .on("ready", () => {
          console.log("ready");
        })
        .on("finish", function () {
          console.log("Men tugadim");
          return resolve(`youtube/${id}.mp4`);
        });
      console.log("Event kutmadi");
    } else {
      ffmpeg()
        .addInput(videoReadableStream)
        .addInput(`youtube/${id}.mp3`)
        .saveToFile(`youtube/${id}.mp4`)
        .on("end", async () => {
          await unlink(`youtube/${id}.mp3`);
          return resolve(`youtube/${id}.mp4`);
        });
    }
  });
  res = await endVideo;
  console.log(res);
  return endVideo;
}
module.exports = { download, getInfo };
//download("https://youtu.be/O_1HOhck3vk", 134, 871447523, false);
