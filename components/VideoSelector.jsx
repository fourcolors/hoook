import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const videos = [
  {
    uri: require("./1.mp4"),
    id: "1",
  },
  {
    uri: require("./2.mp4"),
    id: "2",
  },
  {
    uri: require("./3.mov"),
    id: "3",
  },
];

const VideoSelector = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = ({ didJustFinish }) => {
    if (didJustFinish) {
      setCurrentVideoIndex((index) => (index + 1) % videos.length);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ width, height: "100%" }}>
            <Video
              isMuted
              source={item.uri}
              resizeMode="contain"
              style={styles.video}
              onPlaybackStatusUpdate={handleVideoEnd}
              shouldPlay={index === currentVideoIndex}
            />
          </View>
        )}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const { contentOffset } = nativeEvent;
          const index = Math.round(contentOffset.x / width);
          setCurrentVideoIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    flex: 1,
  },
});

export default VideoSelector;
