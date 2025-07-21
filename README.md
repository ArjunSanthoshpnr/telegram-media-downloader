# Telegram Media Downloader Bot 🤖📥

A Telegram bot built using [Telegraf.js](https://telegraf.js.org/) that can download media from **YouTube, Instagram, Twitter**, or any **direct media link**, and upload it back to a **Telegram private channel**. Uses [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) for downloads.

---

## ✨ Features

- Download videos, images, and files from supported links.
- Uploads **videos as videos**, **images as photos**, and **others as files**.
- Cleans up downloaded files after upload.
- Simple command interface for private channels.

---

## 🛠 Installation

### Prerequisites

- **yt-dlp** must be installed (see below)
- **ffmpeg** must be installed and available in your system PATH
  - On Ubuntu/Debian: `sudo apt install ffmpeg`
  - On Mac: `brew install ffmpeg`
  - On Windows: [Download from ffmpeg.org](https://ffmpeg.org/download.html)

1. **Clone the repo**

```bash
git clone https://github.com/ArjunSanthoshpnr/telegram-media-downloader.git
cd telegram-media-downloader
```

2. **Install dependencies**

```bash
npm install
```

3. _(Optional, for development)_ **Install nodemon**

```bash
npm install --save-dev nodemon
```

4. **Install yt-dlp**

```bash
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

5. **Create `.env` file**

```env
BOT_TOKEN=your_telegram_bot_token
CHANNEL_ID=@your_channel_username_or_id
```

> For private channels, use the internal ID with `-100` prefix (e.g. `-1001234567890`).

---

## 🚀 Usage

1. **Start the bot**

```bash
npm start
```

2. **For development (auto-restart on changes)**

```bash
npm run dev
```

3. **Send the bot a command** like:

```
/download https://youtube.com/your-video-link
```

> The bot will download and re-upload the content into the configured channel.

---

## 📁 Download Directory

All files are temporarily stored in the `downloads/` folder and deleted automatically after upload.

If you want to **keep** the files, comment out or remove:

```js
fs.unlink(filePath, () => {});
```

---

## 🧠 Notes

- The bot will only respond to valid URLs.
- yt-dlp handles extraction from most social media platforms.
- Media is sent as:
  - `sendPhoto` if image
  - `sendVideo` if video
  - `sendDocument` otherwise

---

## 📜 License

MIT
