import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Type from "../components/Type";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import TextInfo from "../components/TextInfo";
import PokedexCard from "../components/PokedexCard";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

const MoveDetail = (props) => {
  const item = props.navigation.getParam("item");
  const name = item.name;
  const about = item.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  );
  const pokedex = useSelector((state) => state.pokedex.pokedex);

  let pokeMoves = pokedex
    .filter((pokemon) =>
      pokemon.moves.some((pokeMove) => pokeMove.move.name === name)
    )
    .map((pokemon) => {
      let newElt = Object.assign({}, pokemon);
      return newElt;
    });

  const color = (type) => {
    switch (type) {
      case "physical":
        return "#7661a8";
      case "special":
        return "#1c79af";
      case "status":
        return "#ed4f39";
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#159957", "#155799"]}
        style={styles.background}
      />
      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.name}>
            #{item.id} {item.name}
          </Text>
          <View style={styles.about}>
            <TextInfo>{about[0].flavor_text}</TextInfo>
          </View>
          <View style={styles.category}>
            <View style={styles.type}>
              <TextInfo>Type</TextInfo>
              <Type type={item.type} />
            </View>
            <View style={styles.type}>
              <TextInfo>Category</TextInfo>
              <View
                style={[
                  styles.cate,
                  { backgroundColor: color(item.damage_class.name) },
                ]}
              >
                <Text style={styles.cateText}>{item.damage_class.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.category}>
            <View style={styles.type}>
              <TextInfo>Power</TextInfo>
              <TextInfo>{item.power}</TextInfo>
            </View>
            <View style={styles.type}>
              <TextInfo>Accuracy</TextInfo>
              <TextInfo>{item.accuracy}%</TextInfo>
            </View>
            <View style={styles.type}>
              <TextInfo>PP</TextInfo>
              <TextInfo>{item.pp}</TextInfo>
            </View>
            <View style={styles.type}>
              <TextInfo>Priority</TextInfo>
              <TextInfo>{item.priority}</TextInfo>
            </View>
          </View>
          <View>
            <Text style={styles.name}>Pokemon with this move</Text>
          </View>
        </View>
        <FlatList
          data={pokeMoves}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <PokedexCard
              item={itemData.item}
              column={1}
              navigation={props.navigation}
            />
          )}
        />
      </ScrollView>
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
  name: {
    marginVertical: 10,
    textTransform: "capitalize",
    color: "white",
    fontFamily: "teko",
    textAlign: "center",
    fontSize: 30,
  },
  about: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  category: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  type: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  cate: {
    marginRight: 10,
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    paddingVertical: 5,
  },
  cateText: {
    textTransform: "capitalize",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MoveDetail;
