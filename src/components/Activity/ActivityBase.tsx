import { memo, useCallback } from "react";
import { StyleSheet, ViewProps } from "react-native";

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ActivityBaseProps extends ViewProps {
  id: number;
  index: number;
  children: JSX.Element;
  delCallback: (index: number, id: number) => void;
}

const ActivityBase = ({ children, delCallback, index, id }: ActivityBaseProps) => {
  const iconPressHandler = useCallback(() => {
    delCallback(index, id);
  }, [])

  const renderRightActions = () => {
    return (
      <Icon
        onPress={iconPressHandler}
        name="delete"
        size={60}
        color="white"
        style={style.icon}
      />
    )
  }

  return (
    <Swipeable useNativeAnimations containerStyle={{ marginVertical: 3 }} renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

const style = StyleSheet.create({
  icon: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 4,
    backgroundColor: "#e11d48"
  },
});

export default memo(ActivityBase);
