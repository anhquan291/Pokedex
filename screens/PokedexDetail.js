import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

const PokedexDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SharedElement id="image" style={StyleSheet.absoluteFill}>
        <Image style={styles.image} source={require("../images/banner2.jpg")} />
      </SharedElement>
    </View>
  );
};
PokedexDetail.sharedElements = (navigation, otherNavigation, showing) => [
  { id: "image", animation: "move" },
  { id: "text", animation: "move" },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
});

export default PokedexDetail;
