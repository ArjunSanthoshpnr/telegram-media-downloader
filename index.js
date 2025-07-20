require("dotenv").config();
const { Telegraf } = require("telegraf");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const {
  isImage,
  isVideo,
  getFileExtension,
  convertToMp4,
} = require("./util/fileUtils");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Handle /download command in private channel
bot.on("channel_post", async (ctx) => {
  const text = ctx.channelPost.text;
  const match = text?.match(/^\/download (https?:\/\/[^\s]+)/);

  if (!match) return; // not the /download command

  const url = match[1];
  const channelId = ctx.channelPost.chat.id;

  await ctx.telegram.sendMessage(channelId, "⏳ Downloading...");

  const cmd = `yt-dlp -o "downloads/%(title).40s.%(ext)s" "${url}"`;

  exec(cmd, async (err) => {
    if (err) return ctx.telegram.sendMessage(channelId, "❌ Download failed");

    const files = fs.readdirSync("downloads");
    const latest = files.sort(
      (a, b) =>
        fs.statSync(`downloads/${b}`).mtime -
        fs.statSync(`downloads/${a}`).mtime
    )[0];
    const filePath = `downloads/${latest}`;

    try {
      if (isImage(filePath)) {
        await ctx.telegram.sendPhoto(channelId, { source: filePath });
      } else if (isVideo(filePath)) {
        let ext = getFileExtension(filePath);
        let mp4Path = filePath;
        if (ext !== "mp4") {
          mp4Path = filePath.replace(/\.[^.]+$/, ".mp4");
          await convertToMp4(filePath, mp4Path);
        }
        await ctx.telegram.sendVideo(channelId, { source: mp4Path });
        if (mp4Path !== filePath) fs.unlinkSync(filePath);
        fs.unlink(mp4Path, () => {});
        return;
      } else {
        await ctx.telegram.sendDocument(channelId, { source: filePath });
      }
    } catch (e) {
      await ctx.telegram.sendMessage(
        channelId,
        "❌ Upload failed: " + e.message
      );
    }

    fs.unlink(filePath, () => {});
  });
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
