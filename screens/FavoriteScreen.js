import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as pokedexActions from "../store/pokedex-actions";
import PokedexCard from "../components/PokedexCard";
import { LinearGradient } from "expo-linear-gradient";
import TextInfo from "../components/TextInfo";

const PokedexScreen = (props) => {
  const currentFavoritePokemon = useSelector(
    (state) => state.pokedex.pokeFavorite
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#96c93d", "#00b09b"]}
        style={styles.background}
      />
      <View style={styles.headerContainer}>
        <TextInfo style={styles.title}>Your Favorite Pokemon</TextInfo>
        <Image
          style={styles.image}
          source={require("../images/pokemon(6).png")}
        />
      </View>
      {currentFavoritePokemon.length === 0 ? (
        <View style={styles.center}>
          <TextInfo>Add Your Favorite Pokemon</TextInfo>
        </View>
      ) : (
        <FlatList
          data={currentFavoritePokemon}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          renderItem={(itemData) => (
            <PokedexCard
              item={itemData.item}
              column={1}
              navigation={props.navigation}
            >
              <Image
                style={styles.image}
                source={require("../images/favorite.png")}
              />
            </PokedexCard>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  headerContainer: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    marginRight: 5,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  list: {
    marginTop: 20,
  },
});

export default PokedexScreen;
