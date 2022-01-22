import { DefaultInOutRule } from "simple-markdown";
import Spoiler from "./Spoiler";

const spoilerRegex = /^~!(.*?)!~/s;

const ruleSpoiler: DefaultInOutRule = {
  order: 1,
  match: source => {
    return spoilerRegex.exec(source);
  },
  parse: (capture, nestedParse, state) => {
    return {
      content: nestedParse(capture[1]),
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
