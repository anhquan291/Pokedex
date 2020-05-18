import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import Moves from "../components/Moves";

const MovesScreen = (props) => {
  const [active, setActive] = useState(0);
  const item = props.navigation.getParam("pokemon");
  const moves = item.moves;
  let thisPokeMoves = [];
  moves.map((move) => thisPokeMoves.push(move.move.name));
  //get Moves Array not just names
  const pokeMoves = useSelector((state) => state.pokedex.pokeMoves);
  const finalMoves = pokeMoves.filter((pokeMove) =>
    thisPokeMoves.includes(pokeMove.name)
  );
  const physicalMoves = finalMoves
    .filter((pokeMove) => pokeMove.damage_class.name === "physical")
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const specialMoves = finalMoves
    .filter((pokeMove) => pokeMove.damage_class.name === "special")
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const statusMoves = finalMoves
    .filter((pokeMove) => pokeMove.damage_class.name === "status")
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroud}
        source={require("../images/bg5.jpg")}
        blurRadius={5}
      ></ImageBackground>
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
            data={physicalMoves}
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
            data={specialMoves}
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
            data={statusMoves}
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
    marginVertical: 5,
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
});

export default MovesScreen;
