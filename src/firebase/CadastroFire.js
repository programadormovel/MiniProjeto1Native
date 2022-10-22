import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { doc, setDoc, addDoc, getFirestore, collection  } from "firebase/firestore";

const CadastroFire = () => {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAmpQCqBivScgaYG-lAQzYVOrss1jY9B3Y",
    authDomain: "loginpam1.firebaseapp.com",
    projectId: "loginpam1",
    storageBucket: "loginpam1.appspot.com",
    messagingSenderId: "962025993049",
    appId: "1:962025993049:web:82f0f7379acf323d7e5248",
  };

  // Initialize Firebase
  const fire = initializeApp(firebaseConfig);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "Daniel",
      turma: "2DS",
    },
  });

  const db = getFirestore(fire);

  async function gravarDados (data) {
    // Add a new document in collection "cities"
    await addDoc(collection(db, "etec"), {
        nome: data.nome,
        turma: data.turma,
    });
  }

    const onSubmit = (data) => {

        console.log(data);

        gravarDados(data);

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
            value={value}
          />
        )}
        name="nome"
      />
      {errors.nome && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 10,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="turma"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  caixa: {
    backgroundColor: "#ccc",
    margin: 8,
    padding: 8,
    minWidth: "70%",
    borderRadius: 8,
  },
});

export default CadastroFire;
