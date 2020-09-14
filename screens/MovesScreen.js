import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import Moves from "../components/Moves";
import { Ionicons } from "@expo/vector-icons";

const MovesScreen = (props) => {
  const [active, setActive] = useState(0);
  const pokeMoves = useSelector((state) => state.pokedex.pokeMoves);
  const physicalMoves = pokeMoves
    .filter((pokeMove) => pokeMove.damage_class.name === "physical")
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const specialMoves = pokeMoves
    .filter((pokeMove) => pokeMove.damage_class.name === "special")
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const statusMoves = pokeMoves
    .filter((pokeMove) => pokeMove.damage_class.name === "status")
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const [physicalFilter, setPhysicalFilter] = useState(physicalMoves);
  const [specialFilter, setSpecialFilter] = useState(specialMoves);
  const [statusFilter, setStatusFilter] = useState(statusMoves);
  const [searchValue, setSearchValue] = useState("");
  const searchFilterFunction = (searchText) => {
    const physical = physicalMoves.filter((move) =>
      move.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const special = specialMoves.filter((move) =>
      move.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const status = statusMoves.filter((move) =>
      move.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setPhysicalFilter(physical);
    setSpecialFilter(special);
    setStatusFilter(status);
    setSearchValue(searchText);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroud}
        source={require("../images/bg5.jpg")}
        blurRadius={5}
      ></ImageBackground>
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
            value={searchValue}
          />
        </View>
      </View>
      <View style={styles.slideListContainer}>
        <View style={styles.slideList}>
          <TouchableWithoutFeedback onPress={() => setActive(0)}>
            <View
              style={[
                styles.slideItem,
                { backgroundColor: active === 0 ? "#03b0a7" : "#fff" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: active === 0 ? "#fff" : "#03b0a7" },
                ]}
              >
                Physical
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setActive(1)}>
            <View
              style={[
                styles.slideItem2,
                { backgroundColor: active === 1 ? "#03b0a7" : "#fff" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: active === 1 ? "#fff" : "#03b0a7" },
                ]}
              >
                Special
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setActive(2)}>
            <View
              style={[
                styles.slideItem3,
                { backgroundColor: active === 2 ? "#03b0a7" : "#fff" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: active === 2 ? "#fff" : "#03b0a7" },
                ]}
              >
                Status
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <View style={styles.movesContainer}>
        {active === 0 ? (
          <FlatList
            data={physicalFilter}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("MoveDetail", {
                    item: itemData.item,
                  });
                }}
              >
                <Moves
                  navigation={props.navigation}
                  item={itemData.item}
                ></Moves>
              </TouchableOpacity>
            )}
          />
        ) : active === 1 ? (
          <FlatList
            data={specialFilter}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("MoveDetail", {
                    item: itemData.item,
                  });
                }}
              >
                <Moves
                  navigation={props.navigation}
                  item={itemData.item}
                ></Moves>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={statusFilter}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("MoveDetail", {
                    item: itemData.item,
                  });
                }}
              >
                <Moves
                  navigation={props.navigation}
                  item={itemData.item}
                ></Moves>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroud: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  slideListContainer: {
    marginHorizontal: 5,
  },
  slideList: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 20,
    height: 36,
    position: "relative",
    borderRadius: 4,
    overflow: "hidden",
  },
  slideItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#03b0a7",
    borderRadius: 5,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  slideItem2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#03b0a7",
  },
  slideItem3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#03b0a7",
    borderRadius: 5,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  movesContainer: {
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

export default MovesScreen;
