import 'react-native-gesture-handler';
import React from 'react';
// import { createAppContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { InicialPage } from './src/inicial/InicialPage';
import { NotificacoesPage } from './src/notificacoes/NotificacoesPage';

const Drawer = createDrawerNavigator();

export const Rotas = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicial"> 
        <Drawer.Screen name="InicialPage" component={InicialPage} />
        <Drawer.Screen name="NotificacoesPage" component={NotificacoesPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const Rotas = createAppContainer(
//   createDrawerNavigator({
//     Inicial: InicialPage,
//     Notificacoes: NotificacoesPage,
//   })
// );

export default Rotas;