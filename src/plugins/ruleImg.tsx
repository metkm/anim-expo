import { Image, StyleSheet, View } from "react-native";
import { DefaultInOutRule } from "simple-markdown";

const imgRegex = /^-img(\d*)\((\S*)\)/;

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
      <View key={state.key}>
        <Image style={style.img} source={{ uri: node.link }} />
      </View>
    )
  },
  html: () => ""
}

const style = StyleSheet.create({
  img: {
    width: 250,
    height: 250
  }
})

export default ruleImg;
