# First HTML
github: [@isAdrisal/first-html](https://github.com/isAdrisal/first-html)

## Overview
A minimal CLI utility that outputs the first packet (1500 bytes) of HTML for a given URL. Use this tool to optimise loading of critical assets within your site.

Inspired by [this discussion](https://www.tunetheweb.com/blog/critical-resources-and-the-first-14kb/).

HTML is a streaming standard, which means browsers can begin parsing HTML content before the entire file has been downloaded. When optimising a web page for performance, moving critical resource declarations further up the document can result in earlier parsing, download and execution of those resources.

This tool provides an easy way to identify what content is included in the very first chunk of HTML (first 1500 bytes) received by the browser. Both gzip and brotli compression are supported, as well as pages served in plain-text.

## Getting Started

### Installation
Install the package with npm:
```
npm i first-html -g
```

### Usage
```
first-html "https://foo.bar"
```
This will examine the provided URL and save the output as a timestamped `.html` file in the current directory.

#### Arguments:
| Argument | Description                                                                                                                  |
|----------|------------------------------------------------------------------------------------------------------------------------------|
|   URL    | Absolute URL (including https://) of the page (REQUIRED)<br>Wrap URL in quotes, eg. "https://foo.bar"                        |
| --outdir | Output directory of the exported file (OPTIONAL)<br>Defaults to current directory.                                           |

```
first-html "https://foo.bar" --outdir ./output
```