import { Image, StyleSheet } from "react-native";
import { DefaultInOutRule } from "simple-markdown";

const imgRegex = /^-img(\d*)\((\S*)\)/;

const ruleImg: DefaultInOutRule = {
  order: 8,
  match: (source) => {
    console.log(source);
    return imgRegex.exec(source)
  },
  parse: (capture) => {
    return {
      link: capture[2]
    }
  },
  react: (node, nestedOutput, state) => {
    return (
      <Image key={state.key} style={style.img} source={{ uri: node.link }} />
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
