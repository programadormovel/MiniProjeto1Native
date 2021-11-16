import 'react-native-gesture-handler';
import React from 'react';
// import styles from './styles/style.js';
import { StyleSheet, Text, View, Button } from 'react-native';

const InicialPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('NotificacoesPage')}
        title="Go to notifications"
      />
    </View>
  );
}

export default InicialPage;

