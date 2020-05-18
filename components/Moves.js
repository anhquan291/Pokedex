import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Type from "./Type";

const Move = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.item.name}</Text>
      <View style={styles.type}>
        <Type type={props.item.type} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    alignItems: "center",
  },
  name: {
    textTransform: "capitalize",
    fontSize: 17,
    color: "#fff",
    fontWeight: "500",
  },
  type: {
    marginVertical: 10,
  },
});
export default Move;
