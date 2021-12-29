import { Pressable, StyleSheet, FlatList, ListRenderItem, ViewStyle } from "react-native";
import React, { memo } from "react";
import Text from "../Base/Text";
import { useColors } from "../../hooks/useColors";

interface MediaCategoryProps {
  category: string;
  categories: string[];
  categoryCallback: (category: string) => void;
}

const MediaCategory = ({ categories, categoryCallback, category }: MediaCategoryProps) => {
  const { color, colors } = useColors();

  const renderItem: ListRenderItem<string> = ({ item }) => {
    const borderStyle: ViewStyle = {
      borderColor: category == item ? color : colors.card,
    };

    return (
      <Pressable onPress={() => categoryCallback(item)} style={[style.borderContainer, borderStyle]}>
        <Text adjustsFontSizeToFit style={style.title}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={item => item}
      style={style.container}
      contentContainerStyle={{ alignItems: "center" }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const style = StyleSheet.create({
  container: {
    minHeight: 52,
    maxHeight: 52,
    marginTop: 4,
  },
  borderContainer: {
    borderRadius: 1000,
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginHorizontal: 4,
  },
  title: {
    fontWeight: "bold",
  },
});

export default memo(MediaCategory);
