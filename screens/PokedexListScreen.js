import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MyCarousel from "../components/MyCarousel";
import { useSelector, useDispatch } from "react-redux";
import * as pokedexActions from "../store/pokedex-actions";
import PokedexCard from "../components/PokedexCard";
import Loader from "../components/Loader";

const PokedexScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(true);
  const pokedex = useSelector((state) => state.pokedex.pokedex);
  useEffect(() => {
    setLoading(true);
    const fetchPokedex = async () => {
      await dispatch(pokedexActions.fetchPokedex());
      setLoading(false);
    };
    fetchPokedex();
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ column: setView, grid: gridView });
  }, [gridView]);

  const setView = () => {
    setGridView((prev) => !prev);
  };
  const column = gridView ? 3 : 1;
  if (loading) {
    return (
      <View style={styles.center}>
        <Loader />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MyCarousel navigation={props.navigation} />
      <FlatList
        data={pokedex}
        keyExtractor={(item) => item.id.toString()}
        key={column}
        numColumns={column}
        renderItem={(itemData) => (
          <PokedexCard
            item={itemData.item}
            column={column}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PokedexScreen;
