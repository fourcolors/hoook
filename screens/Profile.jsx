import React from "react";
import { View } from "react-native";
import { Profile } from "@lens-protocol/react-native-lens-ui-kit";

export default function ProfileScreen() {
  return (
    <View>
      <Profile profile={{ handle: "web3forbasicbs.lens" }} />
    </View>
  );
}
