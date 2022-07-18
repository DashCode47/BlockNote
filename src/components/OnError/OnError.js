import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const OnError = ({ error }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/images/error.json")}
        autoPlay
        loop
      />
      <View style={styles.box}>
        <Text style={styles.text} numberOfLines={3}>
          {error}
        </Text>
      </View>
    </View>
  );
};

export default OnError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9c58e7",
  },
  box: {
    borderRadius: 20,
    backgroundColor: "maroon",
    height: 100,
    marginTop: 400,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
