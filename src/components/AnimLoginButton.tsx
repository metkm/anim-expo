import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import * as Linking from "expo-linking";

import Button from "./Base/Button";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/tokenSlice";
import { asyncLogin } from "../store/userSlice";

const loginButton = () => {
  const dispatch = useDispatch();

  const redirect = () => {
    var id = __DEV__ ? 6762 : 6758;
    Linking.openURL(`https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`);
  };

  useEffect(() => {
    const getAccessToken = async ({ url }: { url: string }) => {

      let match = /=(?<token>.*?)&/.exec(url);
      if (!match || !match.groups) return;

      await dispatch(setAccessToken(match.groups.token));
      await dispatch(asyncLogin());
    };

    Linking.addEventListener("url", getAccessToken);
    return () => {
      Linking.removeEventListener("url", getAccessToken);  
    };
  }, []);

  return <Button onPress={redirect} style={{ marginTop: StatusBar.currentHeight }} >Login</Button>;
};

export default loginButton;
