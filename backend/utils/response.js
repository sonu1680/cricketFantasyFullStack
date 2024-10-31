export const sendResponse = (res, statusCode, message) => {
  const status = statusCode || 500;
  const msg = message || "An error occurred";

  return res.status(status).json({ message: msg });
};
