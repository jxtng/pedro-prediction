const isDevelopment = process.env.NODE_ENV === "development";

const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log("[LOG]:", ...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info("[INFO]:", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn("[WARN]:", ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error("[ERROR]:", ...args);
    }
  },
};

export default logger;
