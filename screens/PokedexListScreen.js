import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MyCarousel from "../components/MyCarousel";
import { useSelector, useDispatch } from "react-redux";
import * as pokedexActions from "../store/pokedex-actions";
import { SharedElement } from "react-navigation-shared-element";
import TouchableScale from "react-native-touchable-scale";
import { FlatList } from "react-native-gesture-handler";

const PokedexScreen = (props) => {
  const dispatch = useDispatch();
  const Pokedex = useSelector;
  useEffect(() => {
    dispatch(pokedexActions.fetchPokedex());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <MyCarousel navigation={props.navigation} />
      <FlatList />
      {/* <TouchableScale
        style={styles.flex}
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={() => {
          props.navigation.navigate("PokeDetail", item);
        }}
      >
      </TouchableScale> */}
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
