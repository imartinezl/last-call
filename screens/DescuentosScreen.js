import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import * as firebase from 'firebase';
var database = firebase.database();

export default class DescuentosScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      loaded: false

    }
    this.getFromFirebase(database, 'flash')
  }
  getFromFirebase(database, key){
    console.log('[[[ GETTING ',key);
    database.ref(key).once('value', snapshot => {
      let data = snapshot.val()
      this.setState({
        data: data
      })
    }).then(() => {
      let songsOpened = [];
      this.setState({
        loaded: true,
      },()=>{
        console.log("DATA LOADED");
      })
    });
  }
  render(){
    return (
    <View style={styles.container}>
    {this.state.loaded ? (
      <FlatList
        data={this.state.data}
        renderItem={({item}) => 
        <View style={styles.item}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.precio}>{item.precio_inicial}</Text>
        </View>
      }
      />) : (<View></View>)
    }
    </View>
  );
}
}

DescuentosScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item:{
    padding: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#ddd"

  },
  nombre:{
    fontSize: 20,
    color: 'black',
    fontFamily: 'archia-bold',
    marginTop: '3%',
    marginLeft: '3%',
  },
  descripcion:{
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'archia-regular',
    marginTop: '3%',
    marginLeft: '3%',
  },
  precio:{
    fontSize: 20,
    color: '#7745C0',
    fontFamily: 'archia-bold',
    marginTop: '3%',
    marginLeft: '3%',
  }
});
