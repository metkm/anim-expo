import React, { memo, PropsWithChildren, useState } from "react";
import Text from "./Base/Text";

import { Pressable, Image, Linking, useWindowDimensions } from "react-native";
import {
  HTMLElementModel,
  HTMLContentModel,
  CustomBlockRenderer,
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
  CustomMixedRenderer,
  TChildrenRenderer,
  RenderHTMLSource,
  TRenderEngineConfig,
  RenderHTMLSourceProps,
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
  span: HTMLElementModel.fromCustomModel({
    tagName: "span",
    contentModel: HTMLContentModel.mixed,
  }),
};

const ytRegex = /.+?v=(.+)/;
export const divRenderer: CustomBlockRenderer = ({ tnode }) => {
  if (!tnode.id) return <></>;

  var match = ytRegex.exec(tnode.id);
  if (!match) return <></>;

  return (
    <Pressable onPress={() => Linking.openURL(match![0])}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${match[1]}/0.jpg` }}
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

export const spanRenderer: CustomMixedRenderer = ({ TDefaultRenderer, tnode, ...props }) => {
  const [hideSpoiler, setHideSpoiler] = useState(true);
  const { color } = useColors();

  const toggleSpoiler = () => {
    setHideSpoiler(hided => !hided);
  };

  if (!tnode.classes.includes("markdown_spoiler")) return <TDefaultRenderer tnode={tnode} {...props} />;

  return (
    <TDefaultRenderer tnode={tnode} {...props} onPress={toggleSpoiler}>
      {hideSpoiler ? (
        <Text style={{ backgroundColor: color, padding: 2, borderRadius: 2 }}>Spoiler! Click to see!</Text>
      ) : (
        <TChildrenRenderer tchildren={tnode.children} />
      )}
    </TDefaultRenderer>
  );
};

export const tagStyles = {
  p: {
    marginVertical: 2,
  },
  span: {
    marginVertical: 2,
  },
};

export const renderers = {
  div: divRenderer,
  video: videoRenderer,
  span: spanRenderer,
};

export const AnimRenderHtml = (props: RenderHTMLSourceProps) => {
  const { width } = useWindowDimensions();

  return (
    <RenderHTMLSource 
      {...props}
      contentWidth={width}
    />
  );
};

export const AnimRenderBase = memo(({ children, ...rest }: PropsWithChildren<TRenderEngineConfig>) => {
  const { colors } = useColors();

  return (
    <TRenderEngineProvider
      customHTMLElementModels={customHTMLElementModels}
      tagsStyles={tagStyles}
      baseStyle={{ color: colors.text, overflow: "hidden" }}
      {...rest}
    >
      <RenderHTMLConfigProvider renderers={renderers}>{children}</RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
});

export default AnimRenderHtml;
