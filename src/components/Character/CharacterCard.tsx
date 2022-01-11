import React from "react";
import Text from "../Base/Text";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useColors } from "../../hooks/useColors";
import { CharacterEdgeObject } from "../../api/objectTypes";
import { capitalizeFirstLetter } from "../commonUtils";

import { useNavigation } from "@react-navigation/native";
import { SettingsNavigationProps } from "../../pages/pageProps";

interface CharacterCardProps {
  character: CharacterEdgeObject
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const { colors } = useColors();
  const navigation = useNavigation<SettingsNavigationProps>();

  const toCharacter = () => {
    navigation.push("Character", { characterId: character.node.id })
  }

  return (
    <Pressable onPress={toCharacter}>
      <View style={[style.container, { backgroundColor: colors.card }]}>
        <Image source={{ uri: character.node.image.large }} style={style.image} />
        <View style={style.info}>
          <Text>{character.node.name.userPreferred}</Text>
          <Text>{capitalizeFirstLetter(character.role)}</Text>
        </View>
      </View>
    </Pressable>
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
