import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MyCarousel from "../components/MyCarousel";
import { SharedElement } from "react-navigation-shared-element";
import TouchableScale from "react-native-touchable-scale";

const PokedexScreen = (props) => {
  const item = {
    url: require("../images/banner2.jpg"),
  };
  return (
    <View style={styles.container}>
      <MyCarousel navigation={props.navigation} />
      <View>
        <Text> Testing</Text>
      </View>
      <TouchableScale
        style={styles.flex}
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={() => {
          props.navigation.navigate("PokeDetail", item);
        }}
      >
        <View style={styles.shareContainer}>
          <SharedElement id="image">
            <Image
              style={styles.image}
              source={require("../images/banner2.jpg")}
            />
          </SharedElement>
          <SharedElement id="text">
            <Text style={styles.text}>The Boys</Text>
          </SharedElement>
          <Text style={styles.caption}>tap me</Text>
        </View>
      </TouchableScale>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  shareContainer: {},
});

export default PokedexScreen;
