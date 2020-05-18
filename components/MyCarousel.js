import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import Carousel from "react-native-snap-carousel";

const deviceWidth = Dimensions.get("window").width;
export class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [
        {
          id: 1,
          url: require("../images/banner1.jpg"),
        },
        {
          id: 2,
          url: require("../images/banner2.jpg"),
        },
        {
          id: 3,
          url: require("../images/banner4.jpg"),
        },
        {
          id: 4,
          url: require("../images/banner5.jpg"),
        },
      ],
    };
  }

  render() {
    const renderItem = ({ item, index }) => {
      let TouchableComp = TouchableOpacity;
      if (Platform.OS === "android") {
        TouchableComp = TouchableNativeFeedback;
      }
      return (
        <TouchableComp
          useForeground
          onPress={() => {
            this.props.navigation.navigate("IntroScreen");
          }}
        >
          <View style={styles.container}>
            <Image style={styles.slide} source={item.url}></Image>
          </View>
        </TouchableComp>
      );
    };
    return (
      <View style={styles.slideContainer}>
        <Carousel
          // autoplay={true}
          loop={true}
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={renderItem}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth - 55}
          layout={"default"}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slideContainer: {
    width: "100%",
    height: 200,
  },
  container: {
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    borderRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  slide: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
});
export default MyCarousel;
