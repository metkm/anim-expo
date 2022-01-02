import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useColors } from "../../hooks/useColors";
import { CharacterEdgeObject } from "../../types";

import { capitalizeFirstLetter } from "../commonUtils";

import Text from "../Base/Text";

interface CharacterCardProps {
  character: CharacterEdgeObject
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const { colors } = useColors();

  return (
    <View style={[style.container, { backgroundColor: colors.card }]}>
      <Image source={{ uri: character.node.image.large }} style={style.image} />
      <View style={style.info}>
        <Text>{character.node.name.userPreferred}</Text>
        <Text>{capitalizeFirstLetter(character.role)}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: 200,
    height: 120,
    margin: 4,
    borderRadius: 4,
    overflow: "hidden",
    flexDirection: "row"
  },
  image: {
    height: "100%",
    width: 70,
  },
  info: {
    flex: 1,
    padding: 4,
    justifyContent: "space-between"
  }
})

export default CharacterCard;
