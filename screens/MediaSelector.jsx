import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MusicBar from "../components/MusicSelector";

export default function MediaSelector() {
  return (
    <View style={styles.container}>
      <Text>React Selector</Text>
      <MusicBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
