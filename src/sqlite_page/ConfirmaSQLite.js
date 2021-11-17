import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import pam1 from "../assets/pam1.png";

export default function ConfirmaSQLite({ route, navigation }) {
  const nome = route.params.nome;
  const sobrenome = route.params.sobrenome;
  const email = route.params.email;
  const telefone = route.params.telefone;

  const onSubmit = () => {
    // console.log(data);
    Alert.alert(JSON.stringify(nome) + "\n" + JSON.stringify(sobrenome));
  };

  return (
    <View>
      <Text value={JSON.stringify(nome)}></Text>
      <Text value={JSON.stringify(sobrenome)}></Text>
      <Text value={JSON.stringify(email)}></Text>
      <Text value={JSON.stringify(telefone)}></Text>

      <View style={alinhamentoHorizontal}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={pam1} style={styles.botao} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSubmit}>
          <Image source={pam1} style={styles.botao} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#ccc",
    margin: 8,
    padding: 8,
    minWidth: "70%",
    borderRadius: 8,
  },
  botao: {
    width: 124,
    height: 124,
    alignSelf: "center",
    borderRadius: 16,
    borderColor: "pink",
  },
  alinhamentoHorizontal: {
      alignItems: "center",
      justifyContent: "space-around"
  }
});
