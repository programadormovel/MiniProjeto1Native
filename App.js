import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button } from 'react-native';
import InicialPage from './src/inicial/InicialPage';
import NotificacoesPage from './src/notificacoes/NotificacoesPage';
import LoginPage from "./src/login/LoginPage";
import RegistroPage from "./src/inicial/RegistroPage";

// import { Rotas } from './rotas';
// import { AppRegistry } from "react-native";
// import { name as appName } from "./app.json";

// import Rotas from ".";

// AppRegistry.registerComponent(appName, () => Rotas);

// const InicialPage = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         onPress={() => navigation.navigate("Notificacoes")}
//         title="Go to notifications"
//       />
//     </View>
//   );
// };

// const NotificacoesPage = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// };

const Drawer = createDrawerNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LoginPage"> 
        <Drawer.Screen name="InicialPage" component={InicialPage} />
        <Drawer.Screen name="NotificacoesPage" component={NotificacoesPage} />
        <Drawer.Screen name="LoginPage" component={LoginPage} />
        <Drawer.Screen name="RegistroPage" component={RegistroPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
