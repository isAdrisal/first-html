#!/usr/bin/env node

const handleArgs = require("./src/handle-args");
const fetchData = require("./src/fetch-data");
const truncateBody = require("./src/truncate-body");
const writeFile = require("./src/write-file");

const args = process.argv.slice(2);
const scriptArgs = handleArgs(args);

const url = scriptArgs.url;
const outdir = scriptArgs.outdir ? scriptArgs.outdir : null;

(async (url) => {
  try {
    const data = await fetchData(url);
    const text = data.text;
    const encoding = data.encoding;
    const truncatedText = truncateBody(text, encoding);
    writeFile(url, truncatedText, outdir);
  } catch (error) {
    console.error("Hmm, something went wrong 😕",error);
  };
})(url);