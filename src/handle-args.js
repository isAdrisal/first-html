module.exports = (args) => {
  const msgs = {
    "noUrl": `
    Try again with a URL including "http://" or "https://" prefix, eg. "first-html https://foo.bar"
    Use "first-html --help" for more information.
    `,

    "noOutputDir": `
    Try again with the output directory path, eg. "first-html "https://foo.bar" --outdir ./output
    Use "first-html --help" for more information.
    `,

    "help": `
    /* ================================ */
    /* ========   FIRST HTML   ======== */
    /* ================================ */
    github: @isAdrisal

    A minimal CLI utility that outputs the first packet (1500 bytes) of HTML for a given URL. Use this tool to optimise loading of critical assets within your site.

    Usage:
    first-html "<URL>" --outdir ./output

    Arguments:
    <URL>      ==>  Absolute URL (including https://) of the page (REQUIRED)
                    Wrap URL in quotes, eg. "https://foo.bar"
    
    --outdir   ==>  Output directory of the exported file(s) (OPTIONAL)
                    Defaults to current directory.
    `
  };

  if (args.length === 1 || args.length === 3) {
    let scriptArgs = {};
  
    if (args.length === 1) {
      if ((args[0] === "--help") || (args[0] === "--h")) {
        console.log(msgs.help);
        process.exit(0);
      };
  
      if (args[0].includes("http://") || args[0].includes("https://")) {
        scriptArgs.url = args[0];
      };
    };
  
    if (args.length === 3) {
      if (args[0].includes("http://") || args[0].includes("https://")) {
        scriptArgs.url = args[0];
      };
  
      if (args[1] === "--outdir") {
        scriptArgs.outdir = args[2];
      };
    };
    
    const isEmpty = Object.values(scriptArgs)
      .every(v => (v === null || v === ''));
    
    if (isEmpty) {
      console.log(msgs.noUrl);
      process.exit(9);
    } else {
      return scriptArgs;
    };
  } else {
    console.error(msgs.noUrl);
    process.exit(9);
  };
};