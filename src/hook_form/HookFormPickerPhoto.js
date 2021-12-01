import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

export default function HookFormPickerPhoto() {
  const [forceUpdate] = useForceUpdate();
  //estado para controlar carregamento da imagem
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  // Abrir ou criar banco de dados SQLite
  const db = SQLite.openDatabase("dados.db");

  // Criação da tabela de nomes, se ela ainda não foi criada
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Lamento, precisamos de sua autorização para executar este serviço!"
          );
        }
      }
    })();
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists nomes2 (id integer primary key not null, nome text, sobrenome text, imagem blob);"
      );
    });
  }, []);

  // Componente de carregamento da imagem da galeria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const ImagemCarregada = () => (
    <View
      style={{ width: 100, height: 200, marginTop: 40, alignSelf: "center" }}
    >
      <Button title="Carregar Imagem" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );

  const ImagemRecuperada = () => (
    <View
      style={{ width: 100, height: 200, marginTop: 40, alignSelf: "center" }}
    >
      {image2 && (
        <Image source={{ uri: image2 }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );

  // Para adicionar os nomes no banco de dados SQLite
  const adicionar = (nome, sobrenome) => {
    // se o nome esta vazio não realiza a transação?
    if (nome === null || nome === "") {
      Alert.alert("Nome não preenchido");
    } else {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "insert into nomes2 (nome, sobrenome, foto) values (?, ?, ?)",
            [nome, sobrenome, image]
          );
          tx.executeSql("select * from nomes2", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
        forceUpdate
      );
    }
  };

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
      await AsyncStorage.setItem("@imagem", image);
      // Adicionar dados no banco local
      adicionar(data.nome, data.sobrenome);
    } catch (e) {
      // saving error
      Alert.alert(e.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView accessibilityRole="scrollbar">
        <ImagemCarregada />
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
          </View>
          <View style={styles.caixaInterna}>
            <Button
              style={styles.botao}
              title="Recuperar Dados"
              onPress={async () => {
                try {
                  const dadosJSONRecuperados = await AsyncStorage.getItem(
                    "@dados"
                  );
                  const imagemRecuperada = await AsyncStorage.getItem(
                    "@imagem"
                  );
                  if (dadosJSONRecuperados !== null) {
                    // dados gravados no AsyncStorage
                    const dados = JSON.parse(dadosJSONRecuperados);
                    setImage2(imagemRecuperada);
                    // const imagemRecuperada = JSON.parse(imagemJSONRecuperada);
                    Alert.alert(
                        dados.nome + "\n" + dados.sobrenome + "\n" +
                        <ImagemRecuperada />
                    );
                  }
                } catch (e) {
                  // erro ao ler valores
                  Alert.alert(e.message);
                }
              }}
            />
          </View>

        </View>
        <ImagemRecuperada />
      </SafeAreaView>
    </ScrollView>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
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
    margin: 16,
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
    margin: 8,
  },
});
