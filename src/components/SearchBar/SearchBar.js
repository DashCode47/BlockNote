import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  const [ex, setEx] = useState();
  return (
    <View style={styles.container}>
      <FontAwesome style={styles.icon} name="search" size={24} color="white" />
      <TextInput
        placeholder="Search a note"
        onChangeText={onSearch}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 60,
    height: 40,
    backgroundColor: "#8A9BCF",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 15,
  },
  icon2: {
    marginRight: 10,
  },
});
