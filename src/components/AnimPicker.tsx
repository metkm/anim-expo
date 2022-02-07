import { useRef } from "react";
import { View, StyleSheet, FlatList, ListRenderItem, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useColors } from "../hooks/useColors";

interface AnimPickerProps<T> {
  labels: T[];
  renderItem: ListRenderItem<T>;
  itemHeight: number;
  padding?: number;
  onChange?: (item: T) => void;
}

const ItemSeperator = () => {
  return <View style={styles.seperator} />;
};

const AnimPicker = <T,>({ labels, renderItem, itemHeight, onChange, padding = 4 }: AnimPickerProps<T>) => {
  const { colors } = useColors();
  const oldValue = useRef(labels[0]);

  const scrollHandler = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const elementOffset = Math.abs(Math.round(y / (itemHeight + padding / 2)));
    const element = labels[elementOffset];

    if (oldValue.current == element) return;
    oldValue.current = element;

    if (onChange) {
      onChange(element);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <FlatList
        data={labels}
        renderItem={renderItem}
        keyExtractor={item => `${item}`}
        onScroll={scrollHandler}
        style={{ maxHeight: itemHeight + (padding * 2) }}
        ItemSeparatorComponent={ItemSeperator}
        snapToInterval={itemHeight + padding / 2}
        snapToAlignment="center"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 6,
    elevation: 1,
    paddingHorizontal: 10,
  },
  seperator: {
    height: 2,
  },
});

export default AnimPicker;
