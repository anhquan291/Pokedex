import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PokedexCard from "../components/PokedexCard";

const SearchScreen = (props) => {
  const pokedex = useSelector((state) => state.pokedex.pokedex);
  const [pokedexFilter, setPokedexFilter] = useState(pokedex);
  const [searchValue, setSearchValue] = useState("");
  const searchFilterFunction = (searchText) => {
    const data = pokedex.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setPokedexFilter(data);
    setSearchValue(searchText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchTextInput}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color="#bfbfbf"
          />
          <TextInput
            placeholder="Type the pokemon here..."
            style={styles.search}
            placeholderTextColor="#bfbfbf"
            onChangeText={(text) => searchFilterFunction(text)}
            value={searchValue}
          />
        </View>
      </View>
      <FlatList
        data={pokedexFilter}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <PokedexCard
            item={itemData.item}
            column={1}
            navigation={props.navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default SearchScreen;
