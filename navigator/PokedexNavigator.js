import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Transition } from "react-native-reanimated";
import { Platform, View, SafeAreaView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import SplashScreen from "../screens/SplashScreen";
import PokedexListScreen from "../screens/PokedexListScreen";
import PokedexDetailScreen from "../screens/PokedexDetail";
import IntroScreen from "../screens/IntroductionScreen";
import AbilityScreen from "../screens/AbilityScreen";
import AbilityDetailScreen from "../screens/AbilityDetailScreen";
import MovesScreen from "../screens/MovesScreen";
import MoveDetailScreen from "../screens/MoveDetailScreen";
import PokemonsMovesScreen from "../screens/PokemonsMovesScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import SearchScreen from "../screens/SearchScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { fadeIn } from "./Transition";

const PokedexNavigator = createStackNavigator({
  PokedexList: {
    screen: PokedexListScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Pokedex",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Search"
            iconName={navigation.getParam("grid") ? "ios-list" : "md-grid"}
            onPress={navigation.getParam("column")}
          />
        </HeaderButtons>
      ),
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 22,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
      },
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
    }),
  },
  PokeDetail: {
    screen: PokedexDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("item").name,
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          {navigation.getParam("isFav") ? (
            <Item
              title="Search"
              iconName={"ios-star"}
              onPress={navigation.getParam("toggleFav")}
            />
          ) : (
            <Item
              title="Search"
              iconName={"ios-star-outline"}
              onPress={navigation.getParam("toggleFav")}
            />
          )}
        </HeaderButtons>
      ),
    }),
  },
  AbilityDetail: {
    screen: AbilityDetailScreen,
    navigationOptions: {
      title: "Ability",
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    },
  },
  IntroScreen: {
    screen: IntroScreen,
    navigationOptions: {
      title: "Introduction",
      // headerShown: false,
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    },
  },
  PokeMoves: {
    screen: PokemonsMovesScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.getParam("pokemon").name} Moves`,
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    }),
  },
  MoveDetail: {
    screen: MoveDetailScreen,
    navigationOptions: {
      title: "Move Detail",
      headerTitleStyle: {
        fontFamily: "pokemon-info",
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 10,
      },
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    },
  },
});
const AbilityNavigator = createStackNavigator(
  {
    Ability: {
      screen: AbilityScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="menu"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
      }),
    },
    AbilityDetail: {
      screen: AbilityDetailScreen,
      navigationOptions: {
        title: "Ability Detail",
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../images/ability.png")}
        />
      ),
    },
  }
);
const MoveNavigator = createStackNavigator(
  {
    Moves: {
      screen: MovesScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="menu"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        ),
      }),
    },
    MoveDetail: {
      screen: MoveDetailScreen,
      navigationOptions: {
        title: "Move Detail",
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          style={{ width: 35, height: 35 }}
          source={require("../images/pokemon(5).png")}
        />
      ),
    },
  }
);
const FavoriteNavigator = createStackNavigator(
  {
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Favorite Pokedex",
        headerShown: false,
        // headerTitleStyle: {
        //   fontFamily: "pokemon-info",
        //   fontSize: 15,
        //   paddingTop: 20,
        //   paddingBottom: 20,
        //   marginBottom: 10,
        // },
        // headerTitleAlign: "center",
        // headerTintColor: "white",
        // headerStyle: {
        //   backgroundColor: Colors.primary,
        // },
        // headerLeft: () => (
        //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //     <Item
        //       title="menu"
        //       iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        //       onPress={() => {
        //         navigation.toggleDrawer();
        //       }}
        //     />
        //   </HeaderButtons>
        // ),
      }),
    },
    AbilityDetail: {
      screen: AbilityDetailScreen,
      navigationOptions: {
        title: "Ability",
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      },
    },
    MoveDetail: {
      screen: MoveDetailScreen,
      navigationOptions: {
        title: "Move Detail",
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      },
    },
    PokeDetail: {
      screen: PokedexDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("item").name,
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {navigation.getParam("isFav") ? (
              <Item
                title="Search"
                iconName={"ios-star"}
                onPress={navigation.getParam("toggleFav")}
              />
            ) : (
              <Item
                title="Search"
                iconName={"ios-star-outline"}
                onPress={navigation.getParam("toggleFav")}
              />
            )}
          </HeaderButtons>
        ),
      }),
    },
    PokeMoves: {
      screen: PokemonsMovesScreen,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.getParam("pokemon").name} Moves`,
        headerTitleStyle: {
          fontFamily: "pokemon-info",
          fontSize: 15,
          paddingTop: 20,
          paddingBottom: 20,
          marginBottom: 10,
        },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      }),
    },
  },

  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          style={{ width: 35, height: 35 }}
          source={require("../images/pokemon(1).png")}
        />
      ),
    },
  }
);

const PokemonTabBottomNavigator = createBottomTabNavigator(
  {
    Pokemon: {
      screen: PokedexNavigator,
      navigationOptions: {
        // tabBarLabel:'Meals !!!'
        tabBarIcon: (tabInfo) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../images/pokemon(2).png")}
            />
          );
        },
      },
    },
    Favorite: {
      screen: FavoriteNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../images/pokemon(1).png")}
            />
          );
        },
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../images/search.png")}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      // labelStyle: {
      //   fontFamily: "open-sans",
      // },
      style: {
        height: 60,
      },
      activeTintColor: Colors.primary,
    },
  }
);

const PokeDrawerNavigator = createDrawerNavigator(
  {
    Pokemon: {
      screen: PokemonTabBottomNavigator,
      navigationOptions: {
        drawerIcon: (drawerConfig) => (
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../images/pokemon(4).png")}
          />
        ),
      },
    },
    Abilities: AbilityNavigator,
    Moves: MoveNavigator,
    Favorite: FavoriteNavigator,
  },
  {
    contentOptions: {
      labelStyle: {
        color: "#fff",
      },
      activeTintColor: "#fed922",
    },
    contentComponent: (props) => {
      // const dispatch = useDispatch();
      return (
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={["#159957", "#155799"]}
            style={{
              position: "absolute",
              height: "100%",
              left: 0,
              right: 0,
              top: 0,
              zIndex: -5,
            }}
          />
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              style={{
                width: "100%",
                height: 50,
                resizeMode: "contain",
                marginTop: 20,
              }}
              source={require("../images/text.png")}
            />
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../images/logo3d.png")}
            />
          </View>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            {/* <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            /> */}
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainNavigator = createAnimatedSwitchNavigator(
  {
    Splash: SplashScreen,
    Pokedex: PokeDrawerNavigator,
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out type="fade" durationMs={200} />
        <Transition.In type="fade" durationMs={200} />
      </Transition.Together>
    ),
  }
);

export default createAppContainer(MainNavigator);
