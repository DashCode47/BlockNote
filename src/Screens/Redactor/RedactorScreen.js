import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const RedactorScreen = ({ route }) => {
  const [nota, setnota] = useState(route.params?.item.nota);
  const [title, settitle] = useState(route.params?.item.title);
  const redacTitle = route.params?.item.title;
  const redacNote = route.params?.item.nota;
  const key = route.params?.item.key;
  const comp = {
    title: null,
    nota: null,
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Home", { nota, title, key })}
      >
        <Text style={styles.butText}>Save</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Write a Title"
        value={title}
        onChangeText={settitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Write Something"
        value={nota}
        onChangeText={setnota}
      />
    </View>
  );
};

export default RedactorScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {},
  button: {
    borderRadius: 20,
    height: 40,
    backgroundColor: "olive",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  butText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
