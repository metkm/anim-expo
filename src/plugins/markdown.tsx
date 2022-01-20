import { Image, View } from "react-native";
import { DefaultInOutRule, DefaultRules, defaultRules, outputFor, parserFor } from "simple-markdown";

import Text from "../components/Base/Text";
import Spoiler from "./Spoiler";

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
    match: source => /^img(\d*)\((.*)\)/.exec(source.trim()),
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
  match: source => /^~!(.*)!~/.exec(source),
  parse: (capture, nestedParse, state) => ({ content: nestedParse(capture[1], state) }),
  react: (node, nestedOutput, state) => {
    return <Spoiler>{nestedOutput(node.content)}</Spoiler>;
  },
};

const centerRule: Omit<DefaultInOutRule, "html"> = {
  order: 1,
  match: source => /^~\~\~(.*)~\~\~/s.exec(source.trim()),
  parse: (capture, nestedParse, state) => {
    return {
      content: nestedParse(capture[1], state),
    }
  },
  react: (node, nestedOutput, state) => (
    <View key={state.key} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {nestedOutput(node.content)}
    </View>
  ),
};

// TODO: Should break newlines for youtube regex to match
const youtubeRule: Omit<DefaultInOutRule, "html"> = {
  order: 3,
  match: source => {
    return /^(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)/.exec(source.trim())
  },
  parse: capture => {
    console.log(capture)
    return {link: capture[1]}
  },
  react: (node, nestedOutput, state) => {
    return (
    <Image
      key={state.key}
      style={{ resizeMode: "contain", paddingVertical: "40%", width: 100, backgroundColor: "red", }}
      source={{ uri: `https://img.youtube.com/vi/${node.link}/0.jpg` }}
    />
  )},
};

const parser = parserFor({ ...rules, spoiler: spoilerRule, center: centerRule, youtube: youtubeRule }, { inline: true });
const reactOut = outputFor({ ...rules, spoiler: spoilerRule, center: centerRule, youtube: youtubeRule }, "react");

export const parse = (text: string) => {
  const parsedTree = parser(text);
  return reactOut(parsedTree);
};

export default parse;
