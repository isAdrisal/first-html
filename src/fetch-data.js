const fetch = require("node-fetch");

module.exports = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Specified URL returned an error", response.status, response.statusText);
    };
    const encoding = response.headers.get("content-encoding") || null;
    return {
      "text": await response.text(),
      "encoding": encoding
    };
  } catch (error) {
    throw Error(error);
  };
};