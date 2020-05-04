import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

const { width } = Dimensions.get("window");
const PokedexCard = (props) => {
  const { item, column } = props;
  return (
    <View
      style={[
        styles.cardContainer,
        { width: width / column },
        { height: column === 3 ? 100 : 60 },
        { flexDirection: column === 3 ? "column" : "row" },
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          { flexDirection: column === 3 ? "column" : "row-reverse" },
          { width: column === 3 ? "100%" : "70%" },
        ]}
      >
        <Image
          style={[styles.image, { width: column === 3 ? "90%" : "50%" }]}
          source={{ uri: item.sprites.front_default }}
        />
        <View
          style={[
            styles.text,
            { justifyContent: column === 3 ? "center" : "" },
            { width: column === 3 ? "100%" : "50%" },
          ]}
        >
          <Text style={styles.id}>{item.id}.</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    display: "flex",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    flexDirection: "row",
  },
  name: {
    textTransform: "capitalize",
    fontFamily: "pokemon",
    fontSize: 12,
    paddingTop: 5,
  },
  id: {
    fontFamily: "pokemon-info",
    fontSize: 8,
    paddingTop: 5,
  },

  image: {
    height: "80%",
    resizeMode: "contain",
  },
});
export default PokedexCard;
