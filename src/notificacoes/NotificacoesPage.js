import 'react-native-gesture-handler';
import React from 'react';
// import styles from './styles/style.js';
import { Text, View, Button } from 'react-native';

const NotificacoesPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default NotificacoesPage;
