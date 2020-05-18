import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Lightbox from "react-native-lightbox";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Types from "../components/Types";
import TextInfo from "../components/TextInfo";
import * as pokedexActions from "../store/pokedex-actions";

const PokedexDetail = (props) => {
  const processHp = new Animated.Value(0);
  const processAtk = new Animated.Value(0);
  const processDef = new Animated.Value(0);
  const processSpeAtk = new Animated.Value(0);
  const processSpeDef = new Animated.Value(0);
  const processSpeed = new Animated.Value(0);
  const eggGroup = new Animated.Value(0);
  const item = props.navigation.getParam("item");
  const { types, abilities, stats } = item;
  const name = item.name;
  const id = item.id;
  const speed = stats[0].base_stat;
  const speDef = stats[1].base_stat;
  const speAtk = stats[2].base_stat;
  const def = stats[3].base_stat;
  const atk = stats[4].base_stat;
  const hp = stats[5].base_stat;
  const [active, setActive] = useState(0);
  const [female, setFemale] = useState(false);

  useEffect(() => {
    if (item.sprites.back_female != null) {
      setFemale(true);
    }
  }, [item]);

  const pokeInfo = useSelector((state) => state.pokedex.pokemonInfo);
  const abilityNames = [];
  abilities.map((ability) => {
    abilityNames.push(ability.ability.name);
  });
  const pokeAbilities = useSelector((state) => state.pokedex.pokeAbilites);
  const pokeAbility = pokeAbilities.filter((ability) =>
    abilityNames.includes(ability.name)
  );
  const infos = pokeInfo.filter((poke) => poke.name === name);
  const introInfo = () => {
    return infos.map((info) => {
      return info.flavor_text_entries.filter(
        (entry) => entry.language.name === "en"
      );
    });
  };

  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.y > 37) {
      Animated.timing(eggGroup, {
        toValue: 20,
        duration: 500,
        easing: Easing.bounce,
      }).start();
    }
    if (event.nativeEvent.contentOffset.y > 392) {
      Animated.parallel([
        Animated.timing(processHp, {
          toValue: hp,
          duration: 1000,
          easing: Easing.linear,
        }),
        Animated.timing(processAtk, {
          toValue: atk,
          duration: 1000,
          easing: Easing.linear,
        }),
        Animated.timing(processDef, {
          toValue: def,
          duration: 1000,
          easing: Easing.linear,
        }),
        Animated.timing(processSpeDef, {
          toValue: speDef,
          duration: 1000,
          easing: Easing.linear,
        }),
        Animated.timing(processSpeAtk, {
          toValue: speAtk,
          duration: 1000,
          easing: Easing.linear,
        }),
        Animated.timing(processSpeed, {
          toValue: speed,
          duration: 1000,
          easing: Easing.linear,
        }),
      ]).start();
    } else {
      return;
    }
  };

  //Hanle Favorite
  const dispatch = useDispatch();
  const typeSave = [];
  item.types.map((type) => typeSave.push(type.type.name));
  const currentFavoritePokemon = useSelector((state) =>
    state.pokedex.pokeFavorite.some((pokemon) => pokemon.id === id)
  );

  const toggleFavorite = useCallback(() => {
    if (currentFavoritePokemon) {
      dispatch(pokedexActions.deleteFav(item.id));
    } else {
      dispatch(pokedexActions.addFavPokemon(item.id, JSON.stringify(item)));
    }
  }, [item.id, currentFavoritePokemon]);
  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavorite });
  }, [toggleFavorite]);
  useEffect(() => {
    props.navigation.setParams({ isFav: currentFavoritePokemon });
  }, [currentFavoritePokemon]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#159957", "#155799"]}
        style={styles.background}
      />
      <ScrollView
        onScroll={handleScroll}
        onScrollEndDrag={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.mainContainer}>
          <View style={styles.mainImageContainer}>
            <Image
              style={styles.mainImage}
              source={{
                uri: `https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`,
              }}
            />
          </View>
          <View>
            <Text style={styles.name}>
              {item.id}. {item.name}{" "}
              {infos.map((info, index) => {
                return (
                  <Text style={styles.generation} key={index}>
                    ({info.generation.name})
                  </Text>
                );
              })}
            </Text>
          </View>
          <View style={styles.about}>
            {introInfo().map((intro, index) => {
              return (
                <TextInfo key={index}>
                  {intro[0].flavor_text.replace(/\n/g, "")}
                </TextInfo>
              );
            })}
          </View>
          <View>
            <Types style={styles.types} types={types} />
          </View>
          <View style={styles.intro}>
            <Text style={[styles.ability, { color: "#e2d75d" }]}>
              (<Text style={styles.abilityText}>Essentials</Text>)
            </Text>
            <View style={styles.essential}>
              <View style={styles.detailContainer}>
                <TextInfo>Type</TextInfo>
                {infos.map((info, index) => {
                  return (
                    <TextInfo style={styles.textColor} key={index}>
                      {info.genera[3].genus}
                    </TextInfo>
                  );
                })}
              </View>
              <View style={styles.detailContainer}>
                <TextInfo>Exp</TextInfo>
                <TextInfo style={styles.textColor}>
                  {item.base_experience}
                </TextInfo>
              </View>
              <View style={styles.detailContainer}>
                <TextInfo>Height</TextInfo>
                <TextInfo style={styles.textColor}>
                  {item.height / 10}m/{(item.height / 10 / 0.3048).toFixed(2)}
                  ft
                </TextInfo>
              </View>
              <View style={styles.detailContainer}>
                <TextInfo>Weight</TextInfo>
                <TextInfo style={styles.textColor}>
                  {item.weight / 10}kg/{(item.weight / 10 / 16).toFixed(2)}lb
                </TextInfo>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.eggGroup}>
                  <Image
                    style={styles.egg}
                    source={require("../images/egg.png")}
                  />
                  <Animated.View style={{ marginLeft: eggGroup }}>
                    <TextInfo>Egg group</TextInfo>
                  </Animated.View>
                </View>
                <View style={styles.eggName}>
                  {infos.map((info) => {
                    return info.egg_groups.map((egg, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            borderRadius: 3,
                            marginRight: 5,
                            paddingHorizontal: 3,
                            backgroundColor: "#59babf",
                          }}
                        >
                          <TextInfo>{egg.name}</TextInfo>
                        </View>
                      );
                    });
                  })}
                </View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.eggGroup}>
                  <Image
                    style={[styles.egg, { resizeMode: "contain" }]}
                    source={require("../images/pokeball.png")}
                  />
                  <Animated.View style={{ marginLeft: eggGroup }}>
                    <TextInfo>Catch rate</TextInfo>
                  </Animated.View>
                </View>
                {infos.map((info, index) => {
                  return (
                    <TextInfo style={styles.textColor} key={index}>
                      {info.capture_rate}
                      <TextInfo style={styles.textColor}>
                        {" "}
                        ({(info.capture_rate * 0.13).toFixed(0)}%)
                      </TextInfo>
                    </TextInfo>
                  );
                })}
              </View>
            </View>
          </View>
          <View style={styles.abilityContainer}>
            <Text style={[styles.ability, { color: "#e2d75d" }]}>
              (<Text style={styles.abilityText}>Abilities</Text>)
            </Text>
            <View>
              {pokeAbility.map((ability, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() =>
                      props.navigation.navigate("AbilityDetail", {
                        ability: ability,
                      })
                    }
                  >
                    <View style={styles.abilityList}>
                      <View style={{ width: "80%" }}>
                        <TextInfo style={styles.abilityColor}>
                          {ability.name}:
                        </TextInfo>
                        <TextInfo>
                          {ability.flavor_text_entries[2].flavor_text.replace(
                            /\n/g,
                            ""
                          )}
                        </TextInfo>
                      </View>
                      <View style={styles.skillInfo}>
                        <Ionicons
                          name="ios-arrow-forward"
                          size={32}
                          color="white"
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </View>
          <View>
            <Text style={[styles.ability, { color: "#e2d75d" }]}>
              (<Text style={styles.abilityText}>Base Stats</Text>)
            </Text>
            <View style={styles.essential}>
              <View style={styles.bar}>
                <View style={{ width: "25%" }}>
                  <TextInfo>
                    HP{" "}
                    <TextInfo style={styles.barColor}>
                      {stats[5].base_stat}{" "}
                    </TextInfo>
                  </TextInfo>
                </View>
                <View style={styles.hpBar}>
                  <Animated.View
                    style={{
                      width: processHp,
                      height: 10,
                      backgroundColor: "#ea6262",
                    }}
                  ></Animated.View>
                </View>
              </View>
              <View style={styles.bar}>
                <View style={{ width: "25%" }}>
                  <TextInfo>
                    ATK{" "}
                    <TextInfo style={styles.barColor}>
                      {stats[4].base_stat}{" "}
                    </TextInfo>
                  </TextInfo>
                </View>
                <View style={styles.hpBar}>
                  <Animated.View
                    style={{
                      width: processAtk,
                      height: 10,
                      backgroundColor: "#b73333",
                    }}
                  ></Animated.View>
                </View>
              </View>
              <View style={styles.bar}>
                <View style={{ width: "25%" }}>
                  <TextInfo>
                    DEF{" "}
                    <TextInfo style={styles.barColor}>
                      {stats[3].base_stat}{" "}
                    </TextInfo>
                  </TextInfo>
                </View>
                <View style={styles.hpBar}>
                  <Animated.View
                    style={{
                      width: processDef,
                      height: 10,
                      backgroundColor: "#4194d3",
                    }}
                  ></Animated.View>
                </View>
              </View>
              <View style={styles.bar}>
                <View style={{ width: "25%" }}>
                  <TextInfo>
                    SPE-ATK{" "}
                    <TextInfo style={styles.barColor}>
                      {stats[2].base_stat}{" "}
                    </TextInfo>
                  </TextInfo>
                </View>
                <View style={styles.hpBar}>
                  <Animated.View
                    style={{
                      width: processSpeAtk,
                      height: 10,
                      backgroundColor: "#db9846",
                    }}
                  ></Animated.View>
                </View>
              </View>
              <View style={styles.bar}>
                <View style={{ width: "25%" }}>
                  <TextInfo>
                    SPE-DEF{" "}
                    <TextInfo style={styles.barColor}>
                      {stats[1].base_stat}{" "}
                    </TextInfo>
                  </TextInfo>
                </View>
                <View style={styles.hpBar}>
                  <Animated.View
                    style={{
                      width: processSpeDef,
                      height: 10,
                      backgroundColor: "#29318e",
                    }}
                  ></Animated.View>
                </View>
              </View>
              <View style={styles.bar}>
                <View style={{ width: "25%" }}>
                  <TextInfo>
                    SPEED{" "}
                    <TextInfo style={styles.barColor}>
                      {stats[0].base_stat}{" "}
                    </TextInfo>
                  </TextInfo>
                </View>
                <View style={styles.hpBar}>
                  <Animated.View
                    style={{
                      width: processSpeed,
                      height: 10,
                      backgroundColor: "#9bce25",
                    }}
                  ></Animated.View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.abilityContainer}>
            <Text style={[styles.ability, { color: "#e2d75d" }]}>
              (<Text style={styles.abilityText}>Moves</Text>)
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setFemale(false);
                setActive(0);
                props.navigation.navigate("PokeMoves", { pokemon: item });
              }}
            >
              <View style={styles.essential}>
                <View style={styles.moves}>
                  <TextInfo>Moves Information</TextInfo>
                  <View style={styles.skillInfo}>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={32}
                      color="white"
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={[styles.ability, { color: "#e2d75d" }]}>
                (<Text style={styles.abilityText}>Sprites</Text>)
              </Text>
              {active === 0 ? (
                <Lightbox>
                  <View style={styles.imageContainer}>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.sprites.front_default,
                        }}
                      />
                    </View>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.sprites.back_default,
                        }}
                      />
                    </View>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.sprites.front_shiny,
                        }}
                      />
                    </View>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.sprites.back_shiny,
                        }}
                      />
                    </View>
                  </View>
                </Lightbox>
              ) : (
                <Lightbox>
                  <View style={styles.imageContainer}>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.sprites.front_female,
                        }}
                      />
                    </View>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: female ? item.sprites.back_female : "",
                        }}
                      />
                    </View>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: female ? item.sprites.front_shiny_female : "",
                        }}
                      />
                    </View>
                    <View style={styles.pokeImage}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: female ? item.sprites.back_shiny_female : "",
                        }}
                      />
                    </View>
                  </View>
                </Lightbox>
              )}
              {female ? (
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
                        Male
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
                        Female
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
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
  mainImageContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#d6d6d6",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mainImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  otherImageContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },

  name: {
    textTransform: "capitalize",
    color: "white",
    fontFamily: "teko",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 5,
  },
  generation: {
    fontSize: 20,
    color: "#b6b7cd",
  },
  about: {
    marginBottom: 10,
  },
  aboutText: {
    color: "white",
  },
  types: {
    justifyContent: "center",
  },
  intro: {
    marginVertical: 10,
  },
  essential: {
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderColor: "#fff",
    borderRadius: 5,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textColor: {
    color: "#c4c4c4",
  },
  eggGroup: {
    flexDirection: "row",
  },
  egg: {
    width: 20,
    height: 25,
  },
  eggName: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  ability: {
    fontFamily: "batman",
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
  },
  abilityContainer: {
    width: "100%",
  },
  abilityList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#e5e5e5",
    paddingHorizontal: 5,
  },
  abilityText: {
    fontFamily: "teko",
  },
  abilityColor: {
    color: "#84d8ed",
    textTransform: "capitalize",
  },
  skillInfo: {
    marginRight: 10,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  barColor: {
    color: "#84d8ed",
  },
  hpBar: {
    width: "75%",
    overflow: "hidden",
    color: "white",
  },
  moves: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pokeImage: {
    width: "49%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },
  slideList: {
    width: "60%",
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
  },
  slideItem2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PokedexDetail;
