import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Note = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.push("Redactor", { item })}>
      <LinearGradient
        style={styles.container}
        colors={["#257a7d", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.containerInner}>
          <Text style={styles.title} numberOfLines={2}>
            {item.titulo}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.subtitulo}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: 330,
    backgroundColor: "#5CD4B0",
    borderBottomWidth: 1,
    borderBottomColor: "#3150AEs",
    marginBottom: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
    borderRightWidth: 0.2,
    borderRadius: 10,
  },
  containerInner: {
    borderLeftWidth: 10,
    borderLeftColor: "#3586F5",
    flex: 1,
    paddingRight: 7,
    paddingTop: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
