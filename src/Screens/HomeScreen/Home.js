import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Note from "../../components/Note/Note";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, RouteProp } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ route }) => {
  const navigation = useNavigation();
  const nota = route.params?.nota;
  const title = route.params?.title;
  let key = route.params?.key;
  let row = [];
  let prevOpenedRow;
  const [image, setimage] = useState(true);
  const [values, setvalues] = useState([]);
  const [search, setsearch] = useState([]);
  const updated = {
    title,
    nota,
    key: Math.random().toString(),
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [values, search]);

  useEffect(() => {
    if (nota || title) {
      if (key) {
        setvalues(values.map((item) => (item.key === key ? updated : item)));
        setsearch(search.map((item) => (item.key === key ? updated : item)));
        key = null;
      } else {
        setvalues((prev) => [...prev, updated]);
        setimage(false);
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

  const saveData = async () => {
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
  };

  return (
    <View style={styles.container}>
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
        x
      >
        <AntDesign name="pluscircle" size={55} color="white" />
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
    backgroundColor: "#3F45D8",
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
    bottom: 70,
    right: 30,
  },
});
