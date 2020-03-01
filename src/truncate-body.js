const zlib = require("zlib");

const encode = (input, encoding) => {  
  if (encoding === "gzip") {
    return zlib.gzipSync(input);
  };
  if (encoding === "brotli") {
    return zlib.brotliCompressSync(input);
  };
  return input;
};

module.exports = (inputString, encoding) => {
  // First response packet with body content is 1500 bytes in length
  const threshold = 1500;
  
  // Convert to buffer for comparison with encoded buffer
  const stringBuf = Buffer.from(inputString, "utf-8");

  if (encoding === null) {
    return stringBuf.slice(0, threshold).toString("utf-8");
  };

  /*
    If encoding was used, the threshold applies to the length of the encoded response. This means we need to calculate how long the plain text response should be that will equate to an encoded response at or just below our threshold.

    First pass is done to find an approximate compression ratio, and then a loop is used to increase the byte lenth of the plain text input until the encoded result meets our threshold.
  */

  const testStringBuf = stringBuf.slice(0, threshold);
  const testEncBuf = encode(testStringBuf, encoding);
  const ratio = testStringBuf.byteLength / testEncBuf.byteLength;
  
  // Now that we have a starting point, increase string buffer length until our output meets our threshold.
  const baseLength = threshold * ratio;
  let encodedBufLength = testEncBuf.byteLength;
  let truncatedStringBuf;
  let count = 0;

  while(encodedBufLength < threshold) {
    // For each loop, increase slice length by 1 byte
    const tempStringBuf = stringBuf.slice(0, baseLength + (1 * count));
    const tempEncBuf = encode(tempStringBuf, encoding);
    const tempEncBufLength = tempEncBuf.byteLength;

    if (tempEncBufLength < threshold) {
      encodedBufLength = tempEncBufLength;
      truncatedStringBuf = tempStringBuf;
      count++;
      continue;
    };

    if (tempEncBufLength === threshold) {
      encodedBufLength = tempEncBufLength;
      truncatedStringBuf = tempStringBuf;
      break;
    };

    if (tempEncBufLength > threshold) {
      break;
    };
  };

  // Return the stringBuf that matches our threshold as a string
  return truncatedStringBuf.toString("utf-8");
};