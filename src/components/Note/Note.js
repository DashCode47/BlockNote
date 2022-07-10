import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Note = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Redactor", { item })}
    >
      <View style={styles.containerInner}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.nota}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 330,
    backgroundColor: "#5CD4B0",
    borderBottomWidth: 1,
    borderBottomColor: "#3150AEs",
    marginBottom: 25,
  },
  containerInner: {
    borderLeftWidth: 10,
    borderLeftColor: "yellow",
    flex: 0.8,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    marginLeft: 10,
    fontSize: 15,
    color: "black",
  },
});
