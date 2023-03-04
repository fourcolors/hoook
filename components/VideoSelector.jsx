import React, { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions, Text } from "react-native";
import Video from "react-native-video";

const { width } = Dimensions.get("window");

const videos = [
  {
    id: "1",
    uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "2",
    uri: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "3",
    uri: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
  },
];

const VideoSlider = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        onEnd={handleVideoEnd}
        muted={false}
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / width);
          setCurrentVideoIndex(index);
        }}
      />
      <View style={styles.indicatorContainer}>
        {videos.map((video, index) => (
          <Text
            key={video.id}
            style={[
              styles.indicator,
              index === currentVideoIndex && styles.activeIndicator,
            ]}
          >
            ⚪
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    width,
    height: "100%",
  },
  video: {
    flex: 1,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    margin: 5,
    fontSize: 30,
    color: "#aaa",
  },
  activeIndicator: {
    color: "#fff",
  },
});

export default VideoSlider;
