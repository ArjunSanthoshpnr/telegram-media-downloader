const path = require("path");
const { exec } = require("child_process");

/**
 * Get the file extension in lowercase (without dot).
 * @param {string} filePath - Path to the file.
 * @returns {string} File extension.
 */
function getFileExtension(filePath) {
  return path.extname(filePath).slice(1).toLowerCase();
}

/**
 * Check if the file is an image (jpg, jpeg, png, gif, webp).
 * @param {string} filePath - Path to the file.
 * @returns {boolean}
 */
function isImage(filePath) {
  const ext = getFileExtension(filePath);
  return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
}

/**
 * Check if the file is a video (mp4, mov, mkv, webm, avi, etc).
 * @param {string} filePath - Path to the file.
 * @returns {boolean}
 */
function isVideo(filePath) {
  const ext = getFileExtension(filePath);
  return ["mp4", "mov", "mkv", "webm", "avi", "flv", "wmv", "mpeg"].includes(
    ext
  );
}

/**
 * Convert a video file to mp4 format using ffmpeg.
 * @param {string} inputPath - Path to the input video file.
 * @param {string} outputPath - Path to the output mp4 file.
 * @returns {Promise<string>} Resolves with outputPath when done.
 */
function convertToMp4(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const cmd = `ffmpeg -y -i "${inputPath}" -c:v libx264 -c:a aac "${outputPath}"`;
    exec(cmd, (err) => {
      if (err) return reject(err);
      resolve(outputPath);
    });
  });
}

module.exports = {
  getFileExtension,
  isImage,
  isVideo,
  convertToMp4,
};
