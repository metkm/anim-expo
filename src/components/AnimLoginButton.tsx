import React, { useEffect } from "react";
import * as Linking from "expo-linking";

import Button from "./Base/Button";

import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/tokenSlice";
import { asyncLogin } from "../store/userSlice";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const loginButton = () => {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();

  const redirect = () => {
    var id = __DEV__ ? 6762 : 6758;
    Linking.openURL(`https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token`);
  };

  useEffect(() => {
    const getAccessToken = async ({ url }: { url: string }) => {
      let match = /=(.*?)&/.exec(url);
      if (!match) return;

      await dispatch(setAccessToken(match[1]));
      await dispatch(asyncLogin());
    };

    Linking.addEventListener("url", getAccessToken);
    return () => {
      Linking.removeEventListener("url", getAccessToken);
    };
  }, []);

  return (
    <Button icon="login" onPress={redirect} style={{ marginTop: top }}>
      Login
    </Button>
  );
};

export default loginButton;
