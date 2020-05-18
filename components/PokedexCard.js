import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { useSelector } from "react-redux";
import Types from "../components/Types";

const { width } = Dimensions.get("window");
const PokedexCard = (props) => {
  const { item, column } = props;
  const types = item.types;
  const currentFavoritePokemon = useSelector((state) =>
    state.pokedex.pokeFavorite.some((pokemon) => pokemon.id === item.id)
  );
  return (
    <View
      style={[
        styles.cardContainer,
        { width: width / column },
        { height: column === 3 ? 100 : 60 },
        { flexDirection: column === 3 ? "column" : "row" },
      ]}
    >
      <TouchableScale
        style={[
          styles.imageContainer,
          { flexDirection: column === 3 ? "column" : "row" },
          { width: column === 3 ? "100%" : "60%" },
        ]}
        activeScale={1.1}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={() => {
          props.navigation.navigate("PokeDetail", {
            item: item,
            isFav: currentFavoritePokemon,
          });
        }}
      >
        {props.children}
        <Image
          style={[styles.image, { width: column === 3 ? "90%" : "30%" }]}
          source={{ uri: item.sprites.front_default }}
        />
        <View
          style={[
            styles.text,
            { justifyContent: column === 3 ? "center" : "" },
            { width: column === 3 ? "100%" : "70%" },
          ]}
        >
          <Text style={styles.id}>{item.id}.</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableScale>
      {column === 1 ? (
        <Types style={styles.types} types={types} />
      ) : (
        <View></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 2,
    marginVertical: 2,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    alignItems: "center",
  },
  types: {
    justifyContent: "flex-end",
  },
  text: {
    flexDirection: "row",
  },
  name: {
    textTransform: "capitalize",
    fontSize: 14,
  },
  id: {
    fontSize: 14,
  },
  image: {
    height: "80%",
    resizeMode: "contain",
  },
  types: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  type: {
    marginRight: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  typeText: {
    textTransform: "capitalize",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
export default PokedexCard;
