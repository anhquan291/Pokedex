import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import SplashScreen from "../screens/SplashScreen";
import PokedexListScreen from "../screens/PokedexListScreen";
import PokedexDetailScreen from "../screens/PokedexDetail";
import IntroScreen from "../screens/IntroductionScreen";

const PokedexNavigator = createSharedElementStackNavigator({
  PokedexList: {
    screen: PokedexListScreen,
    navigationOptions: ({ navigation }) => ({
      title: "POKEDEX",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Search"
            iconName={Platform.OS === "android" ? "md-star" : "ios-star"}
            onPress={() => {
              // navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      ),
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 22,
        paddingTop: 20,
        paddingBottom: 20,
      },
      headerTitleAlign: "center",
      headerTintColor: Colors.primary,
    }),
  },
  PokeDetail: {
    screen: PokedexDetailScreen,
    navigationOptions: ({ navigation }) => ({
      // title: navigation.getParam("title"),
    }),
  },
  IntroScreen: {
    screen: IntroScreen,
    navigationOptions: {
      title: "Introduction",
      headerShown: false,
    },
  },
});

const MainNavigator = createAnimatedSwitchNavigator(
  {
    // Splash: SplashScreen,
    Pokedex: PokedexNavigator,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }
);

export default createAppContainer(MainNavigator);
