import Text from "../components/Base/Text";
import { Linking, Pressable } from "react-native";
import { DefaultInOutRule } from "simple-markdown";

const linkRegex = /^\[(.*?)\]\((.*?)\)/;

const ruleLink: DefaultInOutRule = {
  order: 1,
  match: source => {
    return linkRegex.exec(source);
  },
  parse: capture => {
    console.log(capture);
    return {
      title: capture[1],
      link: capture[2],
    };
  },
  react: (node, nestedOutput, state) => {
    return (
      <Pressable key={state.key} onPress={() => Linking.openURL(node.link)}>
        <Text style={{ textDecorationStyle: "solid", textDecorationLine: "underline" }}>{node.title}</Text>
      </Pressable>
    );
  },
  html: () => "",
};

export default ruleLink;
