import { StyleSheet } from "react-native";
import { DefaultInOutRule, defaultRules } from "simple-markdown";

import Text from "../components/Base/Text";

const italicRegex = /^(_|<i>|\*)(.+?)(_|<\/i>|\*)/is;

const ruleItalic: DefaultInOutRule = {
  ...defaultRules.em,
  order: 2,
  match: (source) => {
    return italicRegex.exec(source);
  },
  parse: (capture, nestedParse, state) => {
    return {
      text: nestedParse(capture[2], state)
    }
  },
  react: (node, nestedOutput, state) => {
    return (
      <Text key={state.key} style={style.italic}>{nestedOutput(node.text, state)}</Text>
    )
  }
}

const style = StyleSheet.create({
  italic: {
    fontStyle: "italic",
  }
})

export default ruleItalic;
