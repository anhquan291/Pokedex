import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SplashLoader from "../components/SplashLoader";
import ImageText from "../components/ImageText";

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroud}
        source={require("../images/bg3.jpg")}
        blurRadius={2}
      >
        <SplashLoader navigation={props.navigation} />
        <ImageText />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroud: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
