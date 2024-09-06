/*
 * Title: Markdown It
 * Description: Markdown It Configuration
 * Author: Istiak Ahammad
 * Date: 9/4/2025
 *
 */

/**
 * node modules
 **/
const MarkdownIt = require("markdown-it");
const hljs = require("highlight.js");

const markdown = new MarkdownIt({
  breaks: true,
  linkify: true,
  highlight: (str, lang) => {
    if (!lang && !hljs.getLanguage(lang)) return "";

    try {
        return hljs.highlight(str,{
            language:lang,
            ignoreIllegals:true
        }).value
    } catch (error) {
        console.log("Error Highlighting Language: ", error.message);
        throw error
        
    }
  },
});

module.exports = markdown;