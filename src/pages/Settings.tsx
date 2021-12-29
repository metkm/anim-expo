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
    <View style={style.container}>
      { isLogged && <Button onPress={logoutHandler}>Logout</Button> }
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    padding: 10,
  }
})

export default Settings;
