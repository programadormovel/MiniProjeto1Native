import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button } from 'react-native';
import InicialPage from './src/inicial/InicialPage';
import NotificacoesPage from './src/notificacoes/NotificacoesPage';
import LoginPage from "./src/login/LoginPage";
import RegistroPage from "./src/inicial/RegistroPage";
import HookForm from "./src/hook_form/HookForm";

const Drawer = createDrawerNavigator();

const Rotas = () => {
  
  return (
    <NavigationContainer  independent={true}>
      <Drawer.Navigator initialRouteName="InicialPage"> 
        <Drawer.Screen name="InicialPage" component={InicialPage} />
        <Drawer.Screen name="NotificacoesPage" component={NotificacoesPage} />
        <Drawer.Screen name="LoginPage" component={LoginPage} />
        <Drawer.Screen name="RegistroPage" component={RegistroPage} />
        <Drawer.Screen name="HookForm" component={HookForm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
