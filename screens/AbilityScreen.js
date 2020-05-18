import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const AbilityDetailScreen = (props) => {
  const abilities = useSelector((state) => state.pokedex.pokeAbilites);
  const [ablititesFilter, setAbilitiesFilter] = useState(abilities);
  const [value, setValue] = useState("");
  const searchFilterFunction = (searchText) => {
    const data = abilities.filter((ability) =>
      ability.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setAbilitiesFilter(data);
    setValue(searchText);
  };
  const [focus, setFocus] = useState(false);
  const focusHandler = () => {
    setFocus(true);
  };
  const blurHandler = () => {
    setFocus(false);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#159957", "#155799"]}
        style={styles.background}
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchTextInput}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color="#bfbfbf"
          />
          <TextInput
            placeholder="Type the ability here..."
            style={styles.search}
            placeholderTextColor="#bfbfbf"
            onChangeText={(text) => searchFilterFunction(text)}
            onFocus={focusHandler}
            onBlur={blurHandler}
            value={value}
          />
        </View>
      </View>
      <Image
        style={{ width: "100%", height: 100, resizeMode: "contain" }}
        source={require("../images/skills.png")}
      />

      <View style={styles.mainContainer}>
        <FlatList
          data={ablititesFilter}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate("AbilityDetail", {
                  ability: itemData.item,
                });
              }}
            >
              <View style={styles.abiContainer}>
                <Text style={styles.name}>{itemData.item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
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
  mainContainer: {
    paddingHorizontal: 5,
    flex: 1,
  },
  abiContainer: {
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    paddingVertical: 12,
  },
  name: {
    fontSize: 17,
    color: "#fff",
    textTransform: "capitalize",
  },
  searchContainer: {
    backgroundColor: "#dee1e5",
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  searchTextInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  search: {
    width: "100%",
    height: 50,
    color: "#000",
    fontSize: 17,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
});

export default AbilityDetailScreen;
