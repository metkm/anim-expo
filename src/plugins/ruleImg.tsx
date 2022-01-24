import { Image, StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { DefaultInOutRule } from "simple-markdown";

const imgRegex = /^-img(\d*)\((\S*)\)/;

const FillWidth = ({ children }: ViewProps) => {
  const { width } = useSafeAreaFrame();
  return (
    <View style={{ width: width - 20, height: 250, borderRadius: 6, overflow: "hidden" }}>{children}</View>
  )
}

const ruleImg: DefaultInOutRule = {
  order: 8,
  match: (source) => {
    return imgRegex.exec(source)
  },
  parse: (capture) => {
    return {
      link: capture[2]
    }
  },
  react: (node, nestedOutput, state) => {
    return (
      <FillWidth key={state.key}>
        <Image style={style.img} source={{ uri: node.link }} />
      </FillWidth>
    )
  },
  html: () => ""
}

const style = StyleSheet.create({
  img: {
    width: "100%",
    height: 250,
  }
})

export default ruleImg;
