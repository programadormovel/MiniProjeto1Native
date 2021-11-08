// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Import the functions you need from the SDKs you need
// yarn add "firebase/app"
import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
// import { AsyncStorage } from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  // const [emailLogado, setEmailLogado] = React.useState();
  const [password, setPassword] = useState("");

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

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      //setEmailLogado(user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      // alert(errorCode);
      // alert(errorMessage);
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>LOGIN FIREBASE</Text>

        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.caixa}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          placeholder="Entre com sua senha"
          style={styles.caixa}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={{alignSelf:'flex-end'}}
            onPress={()=>{navigation.navigate('RegistroPage')}}
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
          onPress={() => {
            let response = signInWithEmailAndPassword(auth, email, password);
            if (response != null) {
              alert("Logou " + email);
              navigation.navigate("InicialPage");
            } else {
            }
          }}
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
