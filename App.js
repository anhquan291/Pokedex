import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PokedexNavigator from "./navigator/PokedexNavigator";
import pokedexReducer from "./store/pokedex-reducer";

const fetchFonts = () => {
  return Font.loadAsync({
    "pokemon-info": require("./assets/fonts/Pokemon.ttf"),
    pokemon: require("./assets/fonts/Sugarpunch.otf"),
    cartoon: require("./assets/fonts/cartoon.ttf"),
    batman: require("./assets/fonts/BATMAN.ttf"),
    nothingmuch: require("./assets/fonts/nothingmuch.ttf"),
    teko: require("./assets/fonts/Teko-Regular.ttf"),
  });
};
const rootReducer = combineReducers({
  pokedex: pokedexReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)}>
        <Text>Loading</Text>
      </AppLoading>
    );
  }
  return (
    <Provider store={store}>
      <PokedexNavigator />
    </Provider>
  );
}
