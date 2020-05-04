import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Easing } from "react-native-reanimated";

const SplashLoader = (props) => {
  const spinValue = new Animated.Value(0);
  const spring = new Animated.Value(0.3);
  const opacity = new Animated.Value(0);
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(spring, {
          toValue: 1,
          duration: 1000,
          friction: 2,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            delay: 300,
            duration: 3000,
            easing: Easing.linear,
            // useNativeDriver: true,
          })
        ),
      ]),
    ]).start();
    const timer = setTimeout(() => {
      props.navigation.navigate("Pokedex");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });
  return (
    <Animated.Image
      style={{
        ...styles.loader,
        transform: [{ rotate: spin }, { scale: spring }],
        opacity: opacity,
      }}
      source={require("../images/loader3.png")}
    ></Animated.Image>
  );
};
const styles = StyleSheet.create({
  loader: {
    width: 120,
    height: 120,
  },
});

export default SplashLoader;
