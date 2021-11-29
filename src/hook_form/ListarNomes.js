import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  VirtualizedList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import * as SQLite from "expo-sqlite";

const ListarNomes = () => {
  // Abrir ou criar banco de dados SQLite
  const db = SQLite.openDatabase("dados.db");

  const [DATA, setDATA] = useState([]);

  // Criação da tabela de nomes, se ela ainda não foi criada
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists nomes (id integer primary key not null, nome text, sobrenome text);"
      );
      tx.executeSql("select * from nomes", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        setDATA(rows);
        // console.log(JSON.stringify(DATA._array[0].nome));
      });
    });
  }, []);

  const getItem = (data, index) => ({
      id: JSON.stringify(DATA._array[index].id), 
        nome: JSON.stringify(DATA._array[index].nome),
        sobrenome: JSON.stringify(DATA._array[index].sobrenome)});

  const getItemCount = (data) => data.length;

  const Item = ({ nome, sobrenome }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.nome}>{sobrenome}</Text>
    </View>
  );

  const atualizarDados = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from nomes", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        setDATA(rows);
        // console.log(JSON.stringify(DATA._array[0].nome));
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item nome={item.nome} 
                            sobrenome={item.sobrenome} />}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
        refreshing={true}
        scrollEnabled={true}
        onScroll={atualizarDados}
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: "#f9c2ff",
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  nome: {
    fontSize: 32,
    color: "black"
  },
});

export default ListarNomes;
