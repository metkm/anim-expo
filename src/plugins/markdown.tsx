import { Image, View } from "react-native";
import { DefaultInOutRule, DefaultRules, defaultRules, outputFor, parserFor } from "simple-markdown";

import Text from "../components/Base/Text";
import Spoiler from "./Spoiler";

// REGEXES
const imgRegex = /^img(\d*)\((.*)\)/;
const spoilerRegex = /^~!(.*)!~/;
const centerRegex = /^~\~\~(.*)~\~\~/s;
const youtubeRegex = /^(?:.?)youtube\((.*v=(.*))\)/;

const clearRegex = /(\r\n|\n|\r|<br>)/gm;

const rules: DefaultRules = {
  text: {
    ...defaultRules.text,
    // @ts-ignore
    react: (node, nestedOutput, state) => {
      return <Text key={state.key}>{node.content.trim()}</Text>;
    },
  },
  image: {
    ...defaultRules.image,
    match: source => imgRegex.exec(source),
    parse: capture => ({ link: capture[2], width: capture[1] }),
    react: (node, nestedOutput, state) => {
      return (
        <Image key={state.key} style={{ resizeMode: "contain", paddingVertical: "40%" }} source={{ uri: node.link }} />
      );
    },
  },
};

const spoilerRule: Omit<DefaultInOutRule, "html"> = {
  order: 2,
  match: source => spoilerRegex.exec(source),
  parse: (capture, nestedParse, state) => ({ content: nestedParse(capture[1], state) }),
  react: (node, nestedOutput, state) => {
    return <Spoiler key={state.key}>{nestedOutput(node.content)}</Spoiler>;
  },
};

const centerRule: Omit<DefaultInOutRule, "html"> = {
  order: 1,
  match: source => centerRegex.exec(source),
  parse: (capture, nestedParse, state) => {
    return {
      content: nestedParse(capture[1], state),
    };
  },
  react: (node, nestedOutput, state) => {
    return (
      <View key={state.key} style={{ alignItems: "center" }}>
        {nestedOutput(node.content)}
      </View>
    );
  },
};

const youtubeRule: Omit<DefaultInOutRule, "html"> = {
  order: 3,
  match: source => {
    return youtubeRegex.exec(source);
  },
  parse: capture => {
    return { link: capture[1], id: capture[2] };
  },
  react: (node, nestedOutput, state) => {
    return (
      <Image
        key={state.key}
        style={{ width: "100%", height: 200, borderRadius: 4 }}
        source={{ uri: `https://img.youtube.com/vi/${node.id}/0.jpg` }}
      />
    );
  },
};

const parser = parserFor({ ...rules, spoiler: spoilerRule, center: centerRule, youtube: youtubeRule });
const reactOut = outputFor({ ...rules, spoiler: spoilerRule, center: centerRule, youtube: youtubeRule }, "react");

export const parse = (text: string) => {
  text = text.replace(clearRegex, "");
  const parsedTree = parser(text);
  return reactOut(parsedTree);
};

export default parse;
