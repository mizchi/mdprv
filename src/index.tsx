import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/default.css";

import remark from "remark";
import math from "remark-math";
import hljs from "remark-highlight.js";
import breaks from "remark-breaks";
import katex from "remark-html-katex";
import html from "remark-html";

import schema from "./sanitize";

const GITHUB_USERCONTENT_ROOT = "https://gist.githubusercontent.com";

const processor = remark()
  .use(breaks)
  .use(math)
  .use(katex)
  .use(hljs)
  // .use(html, { sanitize: schema });
  .use(html);

const buildUrl = (user: string, hash: string) =>
  `${GITHUB_USERCONTENT_ROOT}/${user}/${hash}/raw`;
// import url from 'url'

const [_, user, hash] = location.pathname.split("/");

fetch(buildUrl(user, hash))
  .then(res => res.text())
  .then(text => {
    const firstLine = text.split("\n")[0].replace(/^\#+\s+/, "");
    document.title = firstLine;
    const html = processor.processSync(text).toString();
    const content = document.querySelector(".__root__");
    if (content) {
      content.innerHTML = html;
    }
  });
