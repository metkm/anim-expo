import { memo } from "react";
import Text from "../Base/Text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SharedValue,
  useAnimatedReaction,
  interpolateColor,
} from "react-native-reanimated";
import { ScrollView, StyleSheet, Pressable } from "react-native";

import { useColors } from "../../hooks/useColors";
import { timingConfig } from "../../constants/reanimated";

interface MediaCategoriesProps {
  categories: string[];
  callback: (category: string) => void;
}

interface MediaCategory {
  category: string;
  index: number;
  positions: SharedValue<string[]>;
  callback: (category: string) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const MediaCategory = ({ category, index, positions, callback }: MediaCategory) => {
  const { colors, color } = useColors();
  const currIndex = useSharedValue(index);
  const isActive = useSharedValue(currIndex.value == 0 ? 1 : 0);
  const left = useSharedValue(index * 120 + index * 4);

  useAnimatedReaction(
    () => positions.value.indexOf(category),
    (index, oldIndex) => {
      if (index == oldIndex) return;
      if (index == 0) {
        isActive.value = withTiming(1, timingConfig);
      } else {
        isActive.value = withTiming(0, timingConfig);
      }
      currIndex.value = index;
      left.value = withTiming(currIndex.value * 120 + currIndex.value * 4, timingConfig);
    },
    [positions]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: 40,
      width: 120,
      left: left.value,
      borderColor: interpolateColor(isActive.value, [1, 0], [color, colors.card]),
      zIndex: currIndex.value == 0 ? 1 : 0,
    };
  });

  const pressHandler = () => {
    var tmpArray = positions.value;
    tmpArray.splice(currIndex.value, 1);
    tmpArray.splice(0, 0, category);
    positions.value = tmpArray;

    callback(category);
  };

  return (
    <AnimatedPressable style={[style.category, animatedStyle]} onPress={pressHandler}>
      <Text>{category}</Text>
    </AnimatedPressable>
  );
};

const MediaCategories = ({ categories, callback }: MediaCategoriesProps) => {
  const positions = useSharedValue(categories);
  var innerWidth = categories.length * 120 + categories.length * 4;

  return (
    <ScrollView
      horizontal
      style={style.container}
      contentContainerStyle={{ width: innerWidth, height: 52 }}
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category, index) => (
        <MediaCategory category={category} index={index} positions={positions} key={category} callback={callback} />
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    height: 52,
    maxHeight: 52,
    position: "relative",
  },
  category: {
    top: 5,
    borderRadius: 1000,
    borderWidth: 2,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export default memo(MediaCategories);
