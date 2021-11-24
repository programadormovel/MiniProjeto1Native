import React from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HookFormAsyncStorage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      sobrenome: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    Alert.alert(data.nome + "\n" + data.sobrenome);

    // Dados serão armazenados no AsyncStorage
    try {
      // Dados serão transformados em um objeto JSON
      const dadosJSON = JSON.stringify(data);
      // Dados transformados serão guardados no AsyncStorage
      await AsyncStorage.setItem("@dados", dadosJSON);
    } catch (e) {
      // saving error
      Alert.alert(e.message);
    }
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

      <View style={styles.caixaInterna}>
        <Button
          style={styles.botao}
          title="Enviar Dados"
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          style={styles.botao}
          title="Recuperar Dados"
          onPress={async () => {
            try {
              const dadosJSONRecuperados = await AsyncStorage.getItem("@dados");
              if (dadosJSONRecuperados !== null) {
                // dados gravados no AsyncStorage
                const dados = JSON.parse(dadosJSONRecuperados);
                Alert.alert(dados.nome + "\n" + dados.sobrenome);
              }
            } catch (e) {
              // erro ao ler valores
              Alert.alert(e.message);
            }
          }}
        />
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
  caixaInterna: {
    minWidth: "70%",
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 16
  },
  input: {
    backgroundColor: "#ccc",
    margin: 8,
    padding: 8,
    minWidth: "70%",
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
  },
  botao: {
    minWidth: "70%",
    alignSelf: "center",
    justifyContent: "center",
    margin: 8
  },
});
