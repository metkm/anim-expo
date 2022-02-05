import React from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/Base/Button";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { removeTokens } from "../store/tokenSlice";
import { RootState } from "../store";

const Settings = () => {
  const isLogged = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(removeTokens());
  };

  return (
    <View style={styles.container}>
      { isLogged && <Button icon="logout" onPress={logoutHandler}>Logout</Button> }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  }
})

export default Settings;
