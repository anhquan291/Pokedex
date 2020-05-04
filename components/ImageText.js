import React, { useEffect } from "react";
import { StyleSheet, Image, Animated, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const ImageText = (props) => {
  const move = new Animated.Value(200);

  useEffect(() => {
    Animated.timing(move, {
      toValue: 10,
      delay: 1000,
      duation: 2000,
    }).start();
  }, []);

  return (
    <Animated.Image
      style={{ ...styles.text, marginTop: move }}
      source={require("../images/text.png")}
    ></Animated.Image>
  );
};
const styles = StyleSheet.create({
  text: {
    width: deviceWidth * 0.7,
    height: 100,
    resizeMode: "contain",
  },
});

export default ImageText;
