import { StyleSheet } from "react-native";
import { DefaultInOutRule } from "simple-markdown";
import Text from "../components/Base/Text";

const centerRegex = /(~~~|<center>)(.*?)(~~~|<\/center>)/s;

const ruleCenter: DefaultInOutRule = {
  order: 0,
  match: (source) => {
    return centerRegex.exec(source);
  },
  parse: (capture, nestedParse, state) => {
    return {
      content: nestedParse(capture[2], state),
    };
  },
  react: (node, nestedOutput, state) => {
    return (
      <Text key={state.key} style={style.container}>
        {nestedOutput(node.content, state)}
      </Text>
    );
  },
  html: () => "",
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default ruleCenter;
