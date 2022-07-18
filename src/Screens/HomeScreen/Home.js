import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Note from "../../components/Note/Note";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, RouteProp } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth, API, graphqlOperation, Hub } from "aws-amplify";
import { listUsers, getUser } from "./queries";
import { gql, useQuery, useMutation } from "@apollo/client";
import { HubCallback } from "@aws-amplify/core";
import ModalChangeName from "./ModalChangeName";
import { updateUser } from "./queries";
import { FontAwesome } from "@expo/vector-icons";
import OnLoading from "../../components/OnLoading/OnLoading";
import OnError from "../../components/OnError/OnError";
const Home = ({ route }) => {
  /* =====================================getCOGNITO USER=============== */
  const [user, setUser] = useState();
  const userId = user?.attributes.sub;
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      const { event } = data.payload;
      if (event == "signOut") {
        setUser(null);
      }
      if (event == "signIn") {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  /* ============================QUERIES========================== */
  const { loading, error, data } = useQuery(listUsers);

  const {
    loading: load,
    error: err,
    data: dta,
  } = useQuery(getUser, { variables: { id: userId } });

  const [doUpdateUser, { data: upData, loading: loadMut, error: errorMut }] =
    useMutation(updateUser);

  const submiting = (id, name, version) => {
    doUpdateUser({
      variables: { input: { id: id, name: name, _version: version } },
    });
  };
  /* =========================================================== */
  const navigation = useNavigation();
  const nota = route.params?.nota;
  const title = route.params?.title;
  let key = route.params?.key;
  let row = [];
  let prevOpenedRow;
  const [image, setimage] = useState(true);
  const [values, setvalues] = useState([]);
  const [search, setsearch] = useState([]);
  const [modal, setmodal] = useState(false);

  const updated = {
    title,
    nota,
    key: Math.random().toString(),
  };

  const [switcher, setswitcher] = useState(false);
  const switcho = (val) => {
    setswitcher(!val);
  };
  /*  const saveData = async () => {
    await AsyncStorage.setItem("notas", JSON.stringify(values));
    await AsyncStorage.setItem("search", JSON.stringify(search));
  };
  const loadData = async () => {
    const loadNotes = JSON.parse(await AsyncStorage.getItem("notas"));
    if (loadNotes) {
      setvalues(loadNotes);
    }
    const LoadSearch = JSON.parse(await AsyncStorage.getItem("search"));

    if (LoadSearch) {
      setsearch(LoadSearch);
    }
  }; */

  /* useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [values, search]); */

  useEffect(() => {
    if (nota || title) {
      if (key) {
        setvalues(values.map((item) => (item.key === key ? updated : item)));
        setsearch(search.map((item) => (item.key === key ? updated : item)));
        key = null;
      } else {
        setvalues((prev) => [...prev, updated]);
        setsearch((prev) => [...prev, updated]);
      }
    }
  }, [route.params]);

  const onSearch = (value) => {
    if (!value.length) return setvalues(search);
    const filterData = values.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    if (filterData.length) {
      setvalues(filterData);
    } else {
      setvalues(search);
    }
  };

  const onDelete = async (item) => {
    setvalues(values.filter((datas) => datas !== item));
    setsearch(values.filter((datas) => datas !== item));
    closeRow(item.index);
  };

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  const renderRightView = ({ item }) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: "center",
          justifyContent: "center",
          width: 70,
        }}
      >
        <Button
          color={"maroon"}
          onPress={() => onDelete(item)}
          title={"DELETE"}
        ></Button>
      </View>
    );
  };
  /* ================================================================= */
  if (loading || loadMut || load) {
    return <OnLoading />;
  }

  if (error || errorMut || err) {
    return (
      <OnError error={error?.message || errorMut?.message || err?.message} />
    );
  }

  /* ========================================================RETURN====================================== */
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Text style={styles.boss}>Hi! {dta?.getUser.name}</Text>
        <TouchableOpacity onPress={() => setswitcher(!switcher)}>
          <Text style={{ marginTop: 18 }}>
            <AntDesign name="edit" size={30} color="maroon" />
          </Text>
        </TouchableOpacity>
        <ModalChangeName
          modal={modal}
          submiting={submiting}
          data={dta}
          switcho={switcho}
          switcher={switcher}
        />
      </View>

      <FlatList
        data={values}
        renderItem={({ item, index }) => (
          <GestureHandlerRootView>
            <Swipeable
              renderRightActions={(progress, dragx) =>
                renderRightView({ item })
              }
              onSwipeableOpen={() => closeRow(index)}
              ref={(ref) => (row[index] = ref)}
              rightThreshold={-100}
            >
              <Note item={item} />
            </Swipeable>
          </GestureHandlerRootView>
        )}
        ListHeaderComponent={<SearchBar onSearch={onSearch} />}
      />
      {values.length < 1 && (
        <Image
          style={styles.imageBG}
          source={require("../../../assets/images/alone.png")}
        />
      )}
      <TouchableOpacity
        style={styles.plus}
        onPress={() => navigation.navigate("Redactor")}
      >
        <AntDesign name="pluscircle" size={55} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOut} onPress={() => Auth.signOut()}>
        <FontAwesome name="sign-out" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#9c58e7",
    paddingTop: 20,
  },
  imageBG: {
    width: "50%",
    aspectRatio: 1 / 3,
    resizeMode: "contain",
    opacity: 0.6,
  },
  plus: {
    position: "absolute",
    bottom: 50,
    right: 30,
    borderWidth: 5,
    borderRadius: 38,
    borderColor: "black",
  },
  signOut: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  boss: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "monospace",
    paddingVertical: 15,
    marginLeft: 25,
    textShadowColor: "#1f07f5",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
});
