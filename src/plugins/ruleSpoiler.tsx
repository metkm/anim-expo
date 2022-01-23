import { DefaultInOutRule } from "simple-markdown";
import Spoiler from "./Spoiler";

const spoilerRegex = /^~!(.*?)!~/s;

const ruleSpoiler: DefaultInOutRule = {
  order: 1,
  match: (source) => {
    console.log(source);
    return spoilerRegex.exec(source.trim());
  },
  parse: (capture, nestedParse, state) => {
    return {
      content: nestedParse(capture[1].trim()),
    };
  },
  react: (node, nestedOutput, state) => {
    return (
      <Spoiler key={state.key}>
        {nestedOutput(node.content)}
      </Spoiler>
    );
  },
  html: () => ""
};

export default ruleSpoiler;
