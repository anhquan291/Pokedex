import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import MyCarousel from "../components/MyCarousel";
import { useSelector, useDispatch } from "react-redux";
import * as pokedexActions from "../store/pokedex-actions";
import { SharedElement } from "react-navigation-shared-element";
import TouchableScale from "react-native-touchable-scale";
import PokedexCard from "../components/PokedexCard";

const PokedexScreen = (props) => {
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(true);
  const pokedex = useSelector((state) => state.pokedex.pokedex);
  useEffect(() => {
    dispatch(pokedexActions.fetchPokedex());
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ column: setView, grid: gridView });
  }, [gridView]);

  const setView = () => {
    setGridView((prev) => !prev);
  };
  const column = gridView ? 3 : 1;
  return (
    <View style={styles.container}>
      {/* <MyCarousel navigation={props.navigation} /> */}
      <FlatList
        data={pokedex}
        keyExtractor={(item) => item.id.toString()}
        key={column}
        numColumns={column}
        renderItem={(itemData) => (
          <PokedexCard item={itemData.item} column={column} />
        )}
      />
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
});

export default PokedexScreen;
