import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button } from 'react-native';
import InicialPage from './src/inicial/InicialPage';
import NotificacoesPage from './src/notificacoes/NotificacoesPage';
// import LoginPage from "./src/login/LoginPage";
// import RegistroPage from "./src/login/RegistroPage";
import HookForm from "./src/hook_form/HookForm";
import HookFormAsyncStorage from "./src/hook_form/HookFormAsyncStorage";
import HookFormSQLite from "./src/hook_form/HookFormSQLite";
import HookFormPickerPhoto from "./src/hook_form/HookFormPickerPhoto";
import ListarNomes from "./src/hook_form/ListarNomes";
import CadastroSQLite from "./src/sqlite_page/CadastroSQLite";
import ConfirmaSQLite from "./src/sqlite_page/ConfirmaSQLite";
import CadastroFire from "./src/firebase/CadastroFire";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const Rotas = () => {
  
  return (
    <NavigationContainer  independent={true}>
      <Drawer.Navigator initialRouteName="InicialPage"> 
        <Drawer.Screen name="InicialPage" component={InicialPage} />
        <Drawer.Screen name="NotificacoesPage" component={NotificacoesPage} />
        {/* <Drawer.Screen name="LoginPageYup" component={LoginPageYup} />
        <Drawer.Screen name="RegistroPage" component={RegistroPage} /> */}
        <Drawer.Screen name="HookForm" component={HookForm} />
        <Drawer.Screen name="HookFormAsyncStorage" component={HookFormAsyncStorage} />
        <Drawer.Screen name="HookFormSQLite" component={HookFormSQLite} />
        <Drawer.Screen name="HookFormPickerPhoto" component={HookFormPickerPhoto} />
        <Drawer.Screen name="CadastroFire" component={CadastroFire} />
        <Drawer.Screen name="ListarNomes" component={ListarNomes} />
        <Drawer.Screen name="CadastroSQLite" component={CadastroSQLite} />
        <Stack.Screen name="ConfirmaSQLite" component={ConfirmaSQLite} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
