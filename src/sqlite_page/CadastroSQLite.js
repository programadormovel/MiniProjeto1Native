import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native-gesture-handler";
import pam1 from "../assets/pam1.png";

export default function CadastroSQLite({ navigation }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobreNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      telefone: "",
    },
  });

  

  const onSubmit = (data) => {
    console.log(data);
    Alert.alert(data.nome + "\n" + data.sobrenome);

    setNome(data.nome);
    setSobreNome(data.sobrenome);
    setEmail(data.email);
    setTelefone(data.telefone);

    navigation.navigate("ConfirmaSQLite", {
       nome: data.nome, sobrenome: data.sobrenome, email: data.email, telefone: data.telefone
    });
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Digite seu nome"
            value={value}
          />
        )}
        name="nome"
      />
      {errors.nome && <Text>Campo obrigatório.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            placeholder="Digite seu sobrenome"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="sobrenome"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 200,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Digite seu e-mail"
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>Campo obrigatório.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 20,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Digite seu telefone"
            value={value}
          />
        )}
        name="telefone"
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Image source={pam1} style={styles.botao} />
      </TouchableOpacity>

      
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
    borderColor: "grey",
  },
});
