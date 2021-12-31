import React from "react";
import { Pressable, Image, Linking, useWindowDimensions, ViewProps } from "react-native";
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
  CustomBlockRenderer,
  RenderHTMLProps,
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
} from "react-native-render-html";
import { Video } from "expo-av";
import { useColors } from "../hooks/useColors";

export const customHTMLElementModels = {
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
  source: HTMLElementModel.fromCustomModel({
    tagName: "source",
    contentModel: HTMLContentModel.block,
  }),
};

const ytRegex = /(?<link>.+?v=(?<id>.+))/;
export const divRenderer: CustomBlockRenderer = ({ tnode }) => {
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

export const videoRenderer: CustomBlockRenderer = ({ tnode }) => {
  let uri = tnode.children[0].attributes.src;
  if (!uri) return <></>;

  return (
    <Video useNativeControls isLooping resizeMode="contain" source={{ uri }} style={{ width: "100%", height: 200 }} />
  );
};

export const tagStyles = {
  p: {
    marginVertical: 2,
  },
};

export const renderers = {
  div: divRenderer,
  video: videoRenderer,
};

export const AnimRenderHtml = (props: RenderHTMLProps) => {
  const { colors } = useColors();
  const { width } = useWindowDimensions();

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

export const AnimRenderBase = ({ children }: ViewProps) => {
  const { colors } = useColors();

  return (
    <TRenderEngineProvider
      customHTMLElementModels={customHTMLElementModels}
      tagsStyles={tagStyles}
      baseStyle={{ color: colors.text }}
    >
      <RenderHTMLConfigProvider renderers={renderers}>
        {children}
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
};

export default AnimRenderHtml;
