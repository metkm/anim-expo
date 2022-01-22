import { StyleSheet, View } from "react-native";
import { DefaultInOutRule } from "simple-markdown";

const centerRegex = /~~~(.*?)~~~/s;

const ruleCenter: DefaultInOutRule = {
  order: 0,
  match: source => {
    return centerRegex.exec(source);
  },
  parse: (capture, nestedParse, state) => {
    return {
      content: nestedParse(capture[1], state),
    };
  },
  react: (node, nestedOutput, state) => {
    return (
      <View key={state.key} style={style.container}>
        {nestedOutput(node.content, state)}
      </View>
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
