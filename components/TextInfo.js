import React from "react";
import { Text, StyleSheet } from "react-native";

const TextInfo = (props) => {
  return (
    <Text style={{ ...styles.textInfo, ...props.style }}>{props.children}</Text>
  );
};
const styles = StyleSheet.create({
  textInfo: {
    color: "white",
    fontSize: 20,
    fontFamily: "teko",
  },
});
export default TextInfo;
