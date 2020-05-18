import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TextInfo from "../components/TextInfo";
import PokedexCard from "../components/PokedexCard";
import { ScrollView } from "react-native-gesture-handler";

const AbilityDetailScreen = (props) => {
  const ability = props.navigation.getParam("ability");
  const pokedex = useSelector((state) => state.pokedex.pokedex);
  const poke = pokedex
    .filter((pokemon) =>
      pokemon.abilities.some(
        (pokeAbility) => pokeAbility.ability.name === ability.name
      )
    )
    .map((pokemon) => {
      let newElt = Object.assign({}, pokemon);
      return newElt;
    });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#159957", "#155799"]}
        style={styles.background}
      />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View>
            <Text style={[styles.name, { color: "#fed922", fontSize: 35 }]}>
              #{ability.id} {ability.name}
            </Text>
            <View style={styles.info}>
              <TextInfo>{ability.effect_entries[0].effect}</TextInfo>
            </View>
          </View>
          <Text style={[styles.name, { textDecorationLine: "underline" }]}>
            Pokemon with this Ability
          </Text>
        </View>
        {poke.length === 0 ? (
          <SafeAreaView>
            <Text style={styles.noPoke}>
              There is no pokemon with this Ability.
            </Text>
          </SafeAreaView>
        ) : (
          <FlatList
            data={poke}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <PokedexCard
                item={itemData.item}
                column={1}
                navigation={props.navigation}
              />
            )}
          />
        )}
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
  mainContainer: {
    marginHorizontal: 15,
  },
  name: {
    textTransform: "capitalize",
    color: "white",
    fontFamily: "teko",
    textAlign: "center",
    fontSize: 27,
    marginBottom: 5,
  },
  info: {
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  noPoke: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});

export default AbilityDetailScreen;
