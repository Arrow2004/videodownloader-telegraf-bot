const { Markup, Telegraf } = require("telegraf");
const env = require("dotenv");
const instagram = require("./instagram");
const { testUrl, testYoutube, testInsta } = require("./checkUrl");
const { download, getInfo } = require("./youtube");
const fs = require("fs");
const { type } = require("os");
env.config();

const bot = new Telegraf(process.env.token);
bot.start((ctx) => ctx.reply("Welcome"));
bot.on("text", async (ctx) => {
  let url = ctx.message.text;
  console.log(`${testUrl(url)} ${testYoutube(url)} ${testInsta(url)}`);
  if (!testUrl(url)) {
    return ctx.reply(
      `Kechirasiz!!! 
  Noto'g'ri url kiritilgan`
    );
  }
  if (testYoutube(url)) {
    const videoInfo = await getInfo(url);
    let qualities1 = [];
    let text = "\n";
    for (const e of videoInfo) {
      text += `${e.quality}  - ${e.apporxSize}`;
      text += "\n";
      qualities1.push(Markup.button.callback(e.quality, `i${e.itag}_${url}`));
      /* qualities1.length < 3
        ? qualities1.push(Markup.button.callback(e.quality, e.quality))
        : qualities2.push(Markup.button.callback(e.quality, e.quality));*/
    }
    ctx.reply(
      "Men sizga ushbu videoni quyidagi sifatlarda yuklab bera olaman... \n Quyidan tanlang:" +
        text,
      {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard(qualities1).resize(),
      }
    );
  }
  if (testInsta(url)) {
    if (url.indexOf("?")) {
      url = url.slice(0, url.indexOf("?"));
    }
    let result = await instagram(url);
    console.log(result);
    await ctx.reply("Yuklash boshlandi...\n Iltimos kuting");
    if (result.type == "Video") {
      await ctx.replyWithVideo(
        { source: result.file },
        { caption: url + "\n@youtubeinstadownloader_bot yordamida yuklandi" }
      );
      await fs.unlink(result.file, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
      await fs.unlink(result.thumbnail, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
    } else {
      await ctx.replyWithPhoto(
        { source: result.file },
        { caption: url + "\n@youtubeinstadownloader_bot yordamida yuklandi" }
      );
      await fs.unlink(result.file, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });
    }
  }
});

// Calbacks for youtube
bot.action(/i137_+/, async (ctx) => {
  console.log("Men ishladim 137");
  url = ctx.match.input.substr(5);
  console.log(url + " " + ctx.chat.id);
  file = await download(url, 137, ctx.chat.id, false);
  console.log(file);
  await ctx.replyWithVideo(
    {
      source: file,
    },
    {
      caption: `${url} - @youtubeinstadownloader_bot yordamida yuklandi...`,
    }
  );
  fs.unlink(file, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
});
bot.action(/i136_+/, async (ctx) => {
  console.log("Men ishladim 136");
  url = ctx.match.input.substr(5);
  console.log(url + " " + ctx.chat.id);
  file = await download(url, 136, ctx.chat.id, false);
  console.log(file);
  await ctx.replyWithVideo(
    {
      source: file,
    },
    {
      caption: `${url} - @youtubeinstadownloader_bot yordamida yuklandi...`,
    }
  );
  fs.unlink(file, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
});
bot.action(/i135_+/, async (ctx) => {
  console.log("Men ishladim 135");
  url = ctx.match.input.substr(5);
  console.log(url + " " + ctx.chat.id);
  file = await download(url, 135, ctx.chat.id, false);
  console.log(file);
  await ctx.replyWithVideo(
    {
      source: file,
    },
    {
      caption: `${url} - @youtubeinstadownloader_bot yordamida yuklandi...`,
    }
  );
  fs.unlink(file, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
});
bot.action(/i18_+/, async (ctx) => {
  console.log("Men ishladim 18");
  url = ctx.match.input.substr(4);
  console.log(url + " " + ctx.chat.id);
  file = await download(url, 18, ctx.chat.id, false);
  console.log(file);
  await ctx.replyWithVideo(
    {
      source: file,
    },
    {
      caption: `${url} - @youtubeinstadownloader_bot yordamida yuklandi...`,
    }
  );
  fs.unlink(file, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
});
bot.action(/i133_+/, async (ctx) => {
  console.log("Men ishladim 133");
  url = ctx.match.input.substr(5);
  console.log(url + " " + ctx.chat.id);
  file = await download(url, 133, ctx.chat.id, false);
  console.log(file);
  await ctx.replyWithVideo(
    {
      source: file,
    },
    {
      caption: `${url} - @youtubeinstadownloader_bot yordamida yuklandi...`,
    }
  );
  fs.unlink(file, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
});
bot.action(/i140_+/, async (ctx) => {
  console.log("Men ishladim 140");
  url = ctx.match.input.substr(5);
  console.log(url + " " + ctx.chat.id);
  file = await download(url, 140, ctx.chat.id, true);
  await ctx.replyWithAudio(
    {
      source: file,
    },
    {
      caption: `${url} - @youtubeinstadownloader_bot yordamida yuklandi...`,
    }
  );
  fs.unlink(file, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });
});
bot.launch();
console.log(process.env.token);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
