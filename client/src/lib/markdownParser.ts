import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import wikiLinkPlugin from "remark-wiki-link";

const parser = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)
  .use(wikiLinkPlugin, {
    hrefTemplate: (permalink: string) => {
      permalink = permalink.replace(/_+$/, "");
      return `/zettel/${permalink}`;
    },
    wikiLinkClassName: "internal-link",
    aliasDivider: "|",
  });
function parseMarkdown(src: string) {
  return parser.processSync(src);
}

export default parseMarkdown;
