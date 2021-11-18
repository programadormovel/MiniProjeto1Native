import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button } from 'react-native';
import InicialPage from './src/inicial/InicialPage';
import NotificacoesPage from './src/notificacoes/NotificacoesPage';
import LoginPage from "./src/login/LoginPage";
import RegistroPage from "./src/login/RegistroPage";
import HookForm from "./src/hook_form/HookForm";
import CadastroSQLite from "./src/sqlite_page/CadastroSQLite";
import ConfirmaSQLite from "./src/sqlite_page/ConfirmaSQLite";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Rotas = () => {
  
  return (
    <NavigationContainer  independent={true}>
      <Drawer.Navigator initialRouteName="InicialPage"> 
        <Drawer.Screen name="InicialPage" component={InicialPage} />
        <Drawer.Screen name="NotificacoesPage" component={NotificacoesPage} />
        <Drawer.Screen name="LoginPage" component={LoginPage} />
        <Drawer.Screen name="RegistroPage" component={RegistroPage} />
        <Drawer.Screen name="HookForm" component={HookForm} />
        <Drawer.Screen name="CadastroSQLite" component={CadastroSQLite} />
        <Stack.Screen name="ConfirmaSQLite" component={ConfirmaSQLite} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
