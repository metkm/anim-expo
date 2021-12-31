import React from "react";
import { Pressable, Image, Linking, useWindowDimensions } from "react-native";
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
  CustomBlockRenderer,
  RenderHTMLProps,
} from "react-native-render-html";
import { Video } from "expo-av";
import { useColors } from "../hooks/useColors";

const customHTMLElementModels = {
  center: HTMLElementModel.fromCustomModel({
    tagName: "center",
    mixedUAStyles: {
      marginHorizontal: "auto",
      marginVertical: 14,
    },
    contentModel: HTMLContentModel.block,
  }),
  video: HTMLElementModel.fromCustomModel({
    tagName: "video",
    contentModel: HTMLContentModel.block,
  }),
};

const ytRegex = /(?<link>.+?v=(?<id>.+))/;
const divRenderer: CustomBlockRenderer = ({ tnode }) => {
  if (!tnode.id) return <></>;

  var match = ytRegex.exec(tnode.id);
  if (!match) return <></>;

  return (
    <Pressable onPress={() => Linking.openURL(match!.groups!.link)}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${match.groups?.id}/0.jpg` }}
        style={{ height: 100, width: "100%", borderRadius: 4 }}
      />
    </Pressable>
  );
};

const videoRenderer: CustomBlockRenderer = ({ tnode }) => {
  let uri = tnode.children[0].attributes.src;
  if (!uri) return <></>;

  return (
    <Video useNativeControls isLooping resizeMode="contain" source={{ uri }} style={{ width: "100%", height: 200 }} />
  );
};

const tagStyles = {
  p: {
    marginVertical: 2,
  },
};

const AnimRenderHtml = (props: RenderHTMLProps) => {
  const { width } = useWindowDimensions();
  const { colors } = useColors();

  const renderers = {
    div: divRenderer,
    video: videoRenderer,
  };

  // console.log(props.source)
  return (
    <RenderHtml
      {...props}
      contentWidth={width}
      customHTMLElementModels={customHTMLElementModels}
      baseStyle={{ color: colors.text, ...props.baseStyle }}
      renderers={renderers}
      tagsStyles={tagStyles}
    />
  );
};

export default AnimRenderHtml;
