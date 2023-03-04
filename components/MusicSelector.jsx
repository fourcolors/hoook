import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PanResponder,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
// define the array of songs with their information
const songs = [
  {
    albumArt: require("./a1.png"),
    songTitle: "To the end",
    artistName: "Wave Hart",
    audioFile: require("./ToTheEnd-WavHart.mp3"),
  },
  {
    albumArt: require("./a2.png"),
    songTitle: "Song 2",
    artistName: "Artist 2",
    audioFile: require("./wavhart.mp3"),
  },
  {
    albumArt: require("./a3.png"),
    songTitle: "Song 3",
    artistName: "Artist 3",
    audioFile: require("./wavhart.mp3"),
  },
  {
    albumArt: require("./a4.png"),
    songTitle: "Song 4",
    artistName: "Artist 4",
    audioFile: require("./wavhart.mp3"),
  },
];

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");

const MusicBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    // stop
    return () => {
      if (sound !== null) {
        sound.unloadAsync();
      }
    };
  }, [songIndex]);

  const handlePlayPause = async () => {
    if (sound !== null) {
      await sound.unloadAsync();
      setSound(null);
    }

    if (!isPlaying) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        songs[songIndex].audioFile
      );
      setSound(newSound);

      await newSound.playAsync();
      await newSound.setVolumeAsync(1.0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleScroll = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const index = Math.floor(contentOffset / viewSize);
    setSongIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        onMomentumScrollEnd={handleScroll}
        data={songs}
        horizontal
        snapToInterval={WINDOW_WIDTH}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        renderItem={({ item, index }) => {
          return (
            <View style={styles.songContainer}>
              <Image source={songs[index].albumArt} style={styles.albumArt} />
              <View style={styles.songInfoContainer}>
                <Text style={[styles.songTitle]}>{songs[index].songTitle}</Text>
                <Text style={[styles.artistName]}>
                  {songs[index].artistName}
                </Text>
              </View>
            </View>
          );
        }}
        onScroll={(e) => {
          //console.log(e);
        }}
      />

      <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
        <FontAwesome
          name={isPlaying ? "stop" : "play"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MusicBar;

const styles = StyleSheet.create({
  songContainer: {
    width: WINDOW_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 10,
    height: 60,
    width: WINDOW_WIDTH,
    border: 0,
  },
  albumArt: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  songInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  songTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    width: 150,
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
    backgroundColor: "transparent",
  },
});
