import { StyleSheet } from "react-native";
import { DefaultInOutRule, defaultRules } from "simple-markdown";

import Text from "../components/Base/Text";

const italicRegex = /^(_|<i>)(.+?)(_|<\/i>)/is;

const ruleItalic: DefaultInOutRule = {
  ...defaultRules.em,
  order: 2,
  match: (source) => {
    return italicRegex.exec(source);
  },
  parse: (capture, nestedParse, state) => {
    return {
      text: capture[2]
    }
  },
  react: (node, nestedOutput, state) => {
    return (
      <Text style={style.italic}>{node.text}</Text>
    )
  }
}

const style = StyleSheet.create({
  italic: {
    fontStyle: "italic",
  }
})

export default ruleItalic;
