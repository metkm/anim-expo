import React from "react";
import { FlatList } from "react-native";
import { CharacterEdgeObject } from "../../api/objectTypes";
import CharacterCard from "../Character/CharacterCard";

interface MediaCharactersProps {
  characterList: CharacterEdgeObject[]
}

const MediaCharacters = ({ characterList }: MediaCharactersProps) => {
  return (
    <FlatList 
      data={characterList}
      renderItem={({ item }) => <CharacterCard character={item} />}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}

export default MediaCharacters;
