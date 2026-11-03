export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error?.code === 11000) {
    return res.status(409).json({ message: "That blog URL is already in use. Choose another slug." });
  }
  if (error?.name === "CastError") {
    return res.status(404).json({ message: "That blog could not be found." });
  }
  if (error?.name === "ValidationError") {
    return res.status(400).json({ message: Object.values(error.errors).map((item) => item.message).join(" ") });
  }

  const status = Number(error?.status) || 500;
  if (status >= 500) console.error("API request failed:", error?.message || "unknown error");
  return res.status(status).json({
    message: status >= 500 ? "The server could not complete that request." : error.message,
  });
}
