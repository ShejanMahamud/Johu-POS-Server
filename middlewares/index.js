import fs from 'fs/promises';

export const logReqRes = (fileName) => {
  return async (req, res, next) => {
    try {
      const logText = `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`;
      await fs.appendFile(fileName, logText);
    } catch (error) {
      console.error("Failed to log request:", error);
    }
    next();
  };
};
