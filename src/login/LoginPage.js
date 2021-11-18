// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// Import the functions you need from the SDKs you need
// yarn add "firebase/app"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [sucesso, setSucesso] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

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
  // alert(fire.name);

  const auth = getAuth();

  const onSubmit = async (data) => {
    console.log(data);

    // Alterar dados dos estados
    setEmail(data.email);
    setPassword(data.password);

    console.log(data.email);
    // Verificar se login e senha conferem
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        //setEmailLogado(user.email);
        setSucesso(true);

        if (user.email === data.email) {
          navigation.navigate("Rotas");
        } else {
          Alert.alert(
            "Login não realizado, verifique seu email ou senha ou realize seu cadastro!"
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else if (errorCode === "auth/invalid-email") {
          alert("Email inválido!");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>LOGIN FIREBASE</Text>

        <Controller
          control={control}
          rules={{ required: true }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite seu e-mail"
              style={styles.caixa}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              textContentType="emailAddress"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text>Entre com o email. Campo Obrigatório.</Text>}

        <Controller
          control={control}
          rules={{ required: true, minLength: 6 }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Entre com sua senha"
              style={styles.caixa}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={true}
              textContentType="password"
            />
          )}
        />
        {errors.password && (
          <Text>
            Entre com a senha. Mínimo de 6 caracteres. Campo Obrigatório.
          </Text>
        )}

        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            navigation.navigate("RegistroPage");
          }}
        >
          <Text>Registrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            backgroundColor: "#f00",
            padding: 8,
            borderRadius: 10,
          }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>ENTRAR</Text>
        </TouchableOpacity>

        {/* <StatusBar style="auto" /> */}
      </View>
    </SafeAreaView>
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

export default LoginPage;
