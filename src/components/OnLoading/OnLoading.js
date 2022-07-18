import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const OnLoading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/images/loading-plane.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default OnLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9c58e7",
  },
});
