import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Types = (props) => {
  const { type } = props;
  const color = (color) => {
    switch (color) {
      case "poison":
        return "#8233b7";
      case "grass":
        return "#79BD5B";
      case "fire":
        return "#ED4F39";
      case "water":
        return "#6F8BC8";
      case "flying":
        return "#9586BB";
      case "bug":
        return "#A7B439";
      case "dark":
        return "#6F594C";
      case "dragon":
        return "#7661A8";
      case "electr":
        return "#D1B154";
      case "fairy":
        return "#C38EAF";
      case "ghost":
        return "#796D7A";
      case "normal":
        return "#8A8572";
      case "ice":
        return "#97D7D6";
      case "ground":
        return "#BAA26E";
      case "psychc":
        return "#F65886";
      case "rock":
        return "#847D75";
      case "shadow":
        return "#403246";
      case "steel":
        return "#B6B7CD";
      case "???":
        return "#689E8F";

      default:
        return "#689E8F";
    }
  };
  return (
    <View style={[styles.type, { backgroundColor: color(type.name) }]}>
      <Text style={styles.typeText}>{type.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  types: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  type: {
    marginRight: 10,
    paddingHorizontal: 7,
    paddingVertical: 7,
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
    fontSize: 14,
  },
});

export default Types;
