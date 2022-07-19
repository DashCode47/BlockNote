import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNotas, getUser, updateNotas, notasByUser } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import OnLoading from "../../components/OnLoading/OnLoading";
import OnError from "../../components/OnError/OnError";
import { MyContext } from "../../Context/Context";

const RedactorScreen = ({ route }) => {
  const { userId } = useContext(MyContext);
  const [nota, setnota] = useState(route.params?.item.subtitulo);
  const [title, settitle] = useState(route.params?.item.titulo);
  const key = route.params?.item.key;
  const navigation = useNavigation();
  /* ==============================================USE MUTATION/UPDATE========================================= */
  const [doUpdateNote, { data: upData, loading: loadMut, error: errorMut }] =
    useMutation(updateNotas);
  const updating = async () => {
    const response = await doUpdateNote({
      variables: {
        input: {
          id: route.params?.item.id,
          titulo: title,
          subtitulo: nota,
          _version: route.params?.item._version,
        },
      },
    });
  };

  const [OncreateNote, { data, loading, error }] = useMutation(createNotas);
  const saving = async () => {
    try {
      const response = await OncreateNote({
        variables: {
          input: {
            userID: userId,
            titulo: title,
            subtitulo: nota,
          },
        },
      });
    } catch (e) {
      Alert.alert("Error uploading", e.message);
    }
  };
  /* ====================================================================*/
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() =>
          route.params?.item.titulo == title &&
          route.params?.item.subtitulo == nota
            ? navigation.navigate("Home", { nota, title, key })
            : route.params?.item.id
            ? [updating(), navigation.navigate("Home", { nota, title, key })]
            : [saving(), navigation.navigate("Home", { nota, title, key })]
        }
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
