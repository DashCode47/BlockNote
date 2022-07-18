import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNote, getUser } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import OnLoading from "../../components/OnLoading/OnLoading";
import OnError from "../../components/OnError/OnError";
import { MyContext } from "../../Context/Context";

const RedactorScreen = ({ route }) => {
  const { userId } = useContext(MyContext);
  const [nota, setnota] = useState(route.params?.item.nota);
  const [title, settitle] = useState(route.params?.item.title);
  const key = route.params?.item.key;
  const navigation = useNavigation();

  const [OncreateNote, { data, loading, error }] = useMutation(createNote);
  const saving = (id, name, version) => {
    OncreateNote({
      variables: { input: { id: id, name: name, _version: version } },
    });
  };

  return (
    <View style={styles.container}>
      <Text>{userId}</Text>
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
