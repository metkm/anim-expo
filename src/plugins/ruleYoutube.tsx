import { StyleSheet, Pressable, Linking, ImageBackground } from "react-native";
import { DefaultInOutRule } from "simple-markdown";

const youtubeRegex = /^-youtube\((.*v=(.*))\)/;

const ruleYoutube: DefaultInOutRule = {
  order: 10,
  match: (source) => {
    return youtubeRegex.exec(source);
  },
  parse: (capture) => {
    return {
      link: capture[1],
      id: capture[2]
    }
  },
  react: (node, nestedOutput, state) => {
    return (
      <ImageBackground style={style.container} source={{ uri: `https://img.youtube.com/vi/${node.id}/0.jpg` }}>
        <Pressable onPress={() => Linking.openURL(node.link)} />
      </ImageBackground>
    )
  },
  html: () => ""
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  }
})

export default ruleYoutube;
