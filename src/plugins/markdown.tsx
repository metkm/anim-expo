import { useState } from "react";
import { Image, View } from "react-native";
import { DefaultInOutRule, DefaultRules, defaultRules, outputFor, parserFor } from "simple-markdown";

import Text from "../components/Base/Text";

const rules: DefaultRules = {
  ...defaultRules,
  text: {
    ...defaultRules.text,
    // @ts-ignore
    react: (node, nestedOutput, state) => {
      return <Text key={state.key}>{node.content.trim()}</Text>;
    },
  },
  image: {
    ...defaultRules.image,
    match: source => /^img(\d*)\((.*)\)/.exec(source),
    parse: capture => ({ link: capture[2], width: capture[1] }),
    react: (node, nestedOutput, state) => {
      return (
        <Image
          style={{ resizeMode: "contain", paddingVertical: "40%" }}
          source={{ uri: node.link }}
          key={state.key}
        />
      );
    },
  },
};

const spoilerRule: Omit<DefaultInOutRule, "html"> = {
  order: 1,
  match: source => /^~!(.*)!~/.exec(source),
  parse: (capture, parse, state) => {
    return { content: parse(capture[1], state) };
  },
  react: (node, nestedOutput, state) => {
    return (
      <View style={{ backgroundColor: "red", padding: 2 }} key={state.key}>
        {nestedOutput(node.content)}
      </View>
    );
  },
};

const parser = parserFor({ ...rules, spoiler: spoilerRule }, { inline: true });
const reactOut = outputFor({ ...rules, spoiler: spoilerRule }, "react");

export const parse = (text: string) => {
  const parsedTree = parser(text);
  return reactOut(parsedTree);
};

export default parse;
