import { StyleSheet, ViewProps } from "react-native";
import { DefaultRules, defaultRules as _defaultRules, outputFor, parserFor } from "simple-markdown";

import ruleSpoiler from "./ruleSpoiler";
import ruleYoutube from "./ruleYoutube";
import ruleStrong from "./ruleStrong";
import ruleItalic from "./ruleItalic";
import ruleCenter from "./ruleCenter";
import ruleImg from "./ruleImg";

import Text from "../components/Base/Text";
import ruleLink from "./ruleLink";

interface MarkdownProps extends ViewProps {
  children: string;
}

const defaultRules: DefaultRules = {
  text: {
    ..._defaultRules.text,
    // @ts-ignore
    react: (node, nestedOutput, state) => {
      return <Text key={state.key}>{node.content}</Text>;
    },
  },
};

const rules = {
  ...defaultRules,
  spoiler: ruleSpoiler,
  youtube: ruleYoutube,
  strong: ruleStrong,
  italic: ruleItalic,
  center: ruleCenter,
  link: ruleLink,
  img: ruleImg,
};

const parser = parserFor(rules);
const reactOut = outputFor(rules, "react");

const ytFix = /youtube/;
const brFix = /<br>/g;
const imgFix = /img\d*\(/g;

const Markdown = ({ children }: MarkdownProps) => {
  children = children.replace(brFix, "");
  children = children.replace(imgFix, "-img(");
  children = children.replace(ytFix, "-youtube");
  const parsedTree = parser(children, { inline: true });

  return <Text style={style.container}>{reactOut(parsedTree)}</Text>;
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Markdown;
