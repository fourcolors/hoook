import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MusicBar = ({ albumArt, songTitle, artistName }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Image source={albumArt} style={styles.albumArt} />
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>{songTitle}</Text>
        <Text style={styles.artistName}>{artistName}</Text>
      </View>
      <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
        <FontAwesome
          name={isPlaying ? "pause" : "play"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MusicBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 10,
    height: 60,
    width: "90%",
    marginVertical: 10,
  },
  albumArt: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  songInfoContainer: {
    flex: 1,
    marginRight: 10,
  },
  songTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  artistName: {
    color: "gray",
    fontSize: 12,
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
