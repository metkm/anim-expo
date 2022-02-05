import { StyleSheet, Pressable, Linking, ImageBackground } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { DefaultInOutRule } from "simple-markdown";

const youtubeRegex = /^-youtube\((.*v=(.*))\)/;

const Youtube = ({ id, link }: { id: string; link: string }) => {
  const { width } = useSafeAreaFrame();

  return (
    <ImageBackground
      style={{ width: width - 20, height: 200, borderRadius: 6, overflow: "hidden" }}
      source={{ uri: `https://img.youtube.com/vi/${id}/0.jpg` }}
    >
      <Pressable onPress={() => Linking.openURL(link)} />
    </ImageBackground>
  );
};

const ruleYoutube: DefaultInOutRule = {
  order: 10,
  match: source => {
    return youtubeRegex.exec(source);
  },
  parse: capture => {
    return {
      link: capture[1],
      id: capture[2],
    };
  },
  react: (node, nestedOutput, state) => {
    return <Youtube key={state.key} id={node.id} link={node.link} />;
  },
  html: () => "",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  },
});

export default ruleYoutube;
