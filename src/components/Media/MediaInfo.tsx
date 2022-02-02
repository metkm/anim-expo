import React from "react";
import { StyleSheet, View } from "react-native";

import { capitalizeFirstLetter } from "../commonUtils";
import { MediaObject } from "../../api/objectTypes";
import { useColors } from "../../hooks/useColors";
import dayjs from "dayjs";

import Text from "../Base/Text";
import Markdown from "../../plugins/Markdown";

interface MediaInfoProps {
  media: MediaObject;
}

const dateToString = ({ year, month, day }: { year: number; month: number; day: number }) => {
  return dayjs(new Date(year, month, day)).format("MMM D, YYYY");
};

const Info = ({ title, value }: { title: string; value: string | number }) => {
  const { colors, color } = useColors();

  return (
    <View style={[style.infoContainer, { backgroundColor: colors.card }]}>
      <Text style={[style.infoTitle, { color }]}>{title}</Text>
      <Text style={style.infoValue}>{value}</Text>
    </View>
  );
};

const MediaInfo = ({ media }: MediaInfoProps) => {
  const { colors } = useColors();

  return (
    <>
      <View style={style.container}>
        <Info title="Start Date" value={dateToString(media.startDate)} />
        <Info title="Format" value={capitalizeFirstLetter(media.status)} />
        {media.season && <Info title="Season" value={`${capitalizeFirstLetter(media.season)} ${media.seasonYear}`} />}
        {media.meanScore && <Info title="Mean Score" value={`${media.meanScore}%`} />}
        {media.episodes && <Info title="Episodes" value={media.episodes} />}

        <Info title="Genres" value={media.genres.join(", ")} />
        {media.studios.nodes.length > 0 && (
          <Info title="Studios" value={media.studios.nodes.map(node => node.name).join(", ")} />
        )}
      </View>

      {media.description ? (
        <View style={[style.infoContainer, { backgroundColor: colors.card }]}>
          <Markdown>{media.description}</Markdown>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoContainer: {
    padding: 6,
    borderRadius: 6,
    margin: 2,
    flex: 1,
    flexBasis: "48%",
    elevation: 1,
  },
  infoTitle: {
    fontFamily: "Overpass_700Bold",
  },
  infoValue: {
    fontSize: 18,
    paddingHorizontal: 2,
  },
  row: {
    flexDirection: "row",
    marginVertical: 6,
  },
});

export default MediaInfo;
