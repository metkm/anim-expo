import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { DefaultInOutRule } from "simple-markdown";
import Text from "../components/Base/Text";

const centerRegex = /^(~~~|<center>)(.*?)(~~~|<\/center>|$)/s;

const FillWidthView = ({ children }: ViewProps) => {
  const { width } = useSafeAreaFrame();
  return (
    <View style={{ width: width - 28 }}>{children}</View>
  )
}

const ruleCenter: DefaultInOutRule = {
  order: 1,
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
      <FillWidthView key={state.key}>
        <Text style={style.container}>
          {nestedOutput(node.content, state)}
        </Text>
      </FillWidthView>
    );
  },
  html: () => "",
};

const style = StyleSheet.create({
  container: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ruleCenter;
