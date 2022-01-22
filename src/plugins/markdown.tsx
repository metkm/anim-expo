// // REGEXES
// const imgRegex = /^-img(.*)\((.*)\)/;
// const youtubeRegex = /^-youtube\((.*v=(.*))\)/;
// const spoilerRegex = /^~!(.*)!~/;
// const centerRegex = /^~\~\~(.*)~\~\~/s;
// const linkRegex = /^\[(.*?)\]\((.*?)\)/;

// // with html
// const italicRegex = /^(_|<i>)(.*?)(_|<\/*i\/*>)(\.*)/gs;
// const boldRegex = /^(__|<b>)(.*)(__|<\/b>)/;

// const clearRegex = /(<br\/*>)/gm;
// const youtubeFix = /youtube/gm;
// const imgFix = /img(?:\d+|\()/gm;

// const rules: DefaultRules = {
//   strong: {
//     ...defaultRules.em,
//     order: defaultRules.em.order - 0.5,
//     match: source => boldRegex.exec(source),
//     parse: (capture, nestedParse, state) => {
//       return {
//         content: nestedParse(capture[2], state),
//       };
//     },
//     react: (node, nestedOutput, state) => {
//       return (
//         <Text key={state.key} style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
//           {nestedOutput(node.content, state)}
//         </Text>
//       );
//     },
//   },
//   text: {
//     ...defaultRules.text,
//     // @ts-ignore
//     react: (node, nestedOutput, state) => {
//       return (
//         <Text style={{ flexShrink: 1 }} textBreakStrategy="simple" key={state.key}>
//           {node.content}
//         </Text>
//       );
//     },
//   },
//   image: {
//     ...defaultRules.image,
//     match: source => imgRegex.exec(source),
//     parse: capture => {
//       return { link: capture[2], width: capture[1] };
//     },
//     react: (node, nestedOutput, state) => {
//       return <Image key={state.key} style={{ height: 250, width: 250 }} source={{ uri: node.link }} />;
//     },
//   },
//   em: {
//     ...defaultRules.em,
//     match: source => {
//       return italicRegex.exec(source);
//     },
//     parse: capture => {
//       return {
//         text: capture[2],
//         rest: capture[4],
//       };
//     },
//     react: (node, nestedOutput, state) => {
//       return (
//         <Text key={state.key} style={{ fontStyle: "italic" }}>
//           {node.text + node.rest}
//         </Text>
//       );
//     },
//   },
// };

// const spoilerRule: Omit<DefaultInOutRule, "html"> = {
//   order: 10,
//   match: source => spoilerRegex.exec(source),
//   parse: (capture, nestedParse, state) => {
//     return { content: nestedParse(capture[1], state) };
//   },
//   react: (node, nestedOutput, state) => {
//     return <Spoiler key={state.key}>{nestedOutput(node.content)}</Spoiler>;
//   },
// };

// const centerRule: Omit<DefaultInOutRule, "html"> = {
//   order: 1,
//   match: source => centerRegex.exec(source),
//   parse: (capture, nestedParse, state) => {
//     return {
//       content: nestedParse(capture[1], state),
//     };
//   },
//   react: (node, nestedOutput, state) => {
//     return (
//       <View key={state.key} style={{ alignItems: "center" }}>
//         {nestedOutput(node.content)}
//       </View>
//     );
//   },
// };

// const youtubeRule: Omit<DefaultInOutRule, "html"> = {
//   order: 8,
//   match: source => {
//     return youtubeRegex.exec(source);
//   },
//   parse: capture => {
//     return { link: capture[1], id: capture[2] };
//   },
//   react: (node, nestedOutput, state) => {
//     return (
//       <Image
//         key={state.key}
//         style={{ width: "100%", height: 200, borderRadius: 4, marginVertical: 4 }}
//         source={{ uri: `https://img.youtube.com/vi/${node.id}/0.jpg` }}
//       />
//     );
//   },
// };

// const linkRule: Omit<DefaultInOutRule, "html"> = {
//   order: 7,
//   match: source => {
//     return linkRegex.exec(source);
//   },
//   parse: capture => {
//     return {
//       title: capture[1],
//       link: capture[2],
//     };
//   },
//   react: (node, nestedOutput, state) => {
//     return (
//       <Text style={{ flexShrink: 1 }} key={state.key} onPress={() => Linking.openURL(node.link)}>
//         {node.title}
//       </Text>
//     );
//   },
// };

import { StyleSheet, View, ViewProps } from "react-native";
import { DefaultRules, defaultRules as _defaultRules, outputFor, parserFor } from "simple-markdown";

import ruleSpoiler from "./ruleSpoiler";
import ruleStrong from "./ruleStrong";
import ruleItalic from "./ruleItalic";
import ruleImg from "./ruleImg";

import Text from "../components/Base/Text";

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

const rules = { ...defaultRules, strong: ruleStrong, spoiler: ruleSpoiler, img: ruleImg, italic: ruleItalic };

const parser = parserFor(rules, { inline: true });
const reactOut = outputFor(rules, "react");

const Markdown = ({ children }: MarkdownProps) => {
  children = children.replace(/<br>/g, "");
  children = children.replace(/img\d*\(/g, "-img(");
  const parsedTree = parser(children);

  return <View style={style.container}>{reactOut(parsedTree)}</View>;
};

const style = StyleSheet.create({
  container: {
    
  }
})

export default Markdown;
