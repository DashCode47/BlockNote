import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

const ModalChangeName = ({ modal, switcho, switcher, submiting, data }) => {
  const [modalVisible, setModalVisible] = useState(modal);
  const [name, setname] = useState(data?.getUser.name);

  /* useEffect(() => {
    if (modal == true) {
      return;
    } else setModalVisible(true);
  }, [modal]); */

  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={switcher}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.transparent}>
          <View style={styles.window}>
            <TextInput
              style={styles.input}
              placeholder="write name"
              value={name}
              onChangeText={setname}
            />
            <Pressable style={styles.btn} onPress={() => switcho(true)}>
              <Text style={styles.close}>Close</Text>
            </Pressable>
            <Pressable
              style={styles.btn2}
              onPress={() => {
                if (data?.getUser.name != name) {
                  submiting(data?.getUser.id, name, data?.getUser._version);
                }
                switcho(!modalVisible);
              }}
            >
              <Text style={styles.close}>Change</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalChangeName;

const styles = StyleSheet.create({
  transparent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  window: {
    height: 170,
    aspectRatio: 1 / 1,
    backgroundColor: "white",
    /* justifyContent: "center", */
    alignItems: "center",
    borderRadius: 40,
    borderWidth: 0.5,
  },
  input: {
    marginTop: 30,
    fontSize: 20,
    borderBottomWidth: 2,
  },
  btn: {
    backgroundColor: "olive",
    borderRadius: 15,
    width: "62%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    position: "absolute",
    bottom: 30,
  },
  btn2: {
    backgroundColor: "green",
    borderRadius: 15,
    width: "62%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginTop: 10,
  },
  close: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
