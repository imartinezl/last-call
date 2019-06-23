import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {  Image,  Alert, ScrollView,  StatusBar, StyleSheet,  Text, TouchableHighlight, TouchableOpacity,  View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flash from '../components/Flash';  
import Swipe from '../components/Swipe';
import Lottie from 'lottie-react-native'


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC53vitNexyH1m5pc4YTVFkqUVI1fbK2F0",
  authDomain: "last-call-d1412.firebaseapp.com",
  databaseURL: "https://last-call-d1412.firebaseio.com",
};

import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    console.disableYellowBox = true;
    this.state = {
      animation: null,
      id: 0,
      loaded: false

    }
    this.swiped = this.swiped.bind(this);
    this.getFromFirebase(database, 'flash/0')
  }
  componentDidMount(){
      database.ref('flash/' + this.state.id).on('value', (snapshot) => {
        const highscore = snapshot.val();
        console.log("New high score: " + highscore.descripcion);
      })

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




  swiped(d){
    console.log("Swiped: ", d);
    this._playAnimation();
    setTimeout(() => {this._showAlert(); this._stopAnimation()}, 1200)
    this.setState((prevState)=> ({
       id: Math.min(3, prevState.id + 1)
     }), ()=>{
      console.log(this.state.id);
      this.getFromFirebase(database, 'flash/' + this.state.id)
    })


  }
  _showAlert(){
    Alert.alert(
      'Ya tienes tu reserva!',
      'A ZAPAR!!!',
      [
        {text: 'GUAY:)', onPress: () => this._stopAnimation()},
      ],
      { cancelable: false }
    )
  }
  _playAnimation(){
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };
  _stopAnimation(){
    this.setState({
      animation: null
    })
  }
  async _loadAnimationAsync(){
    let result = await fetch(
      'https://assets7.lottiefiles.com/datafiles/U1I3rWEyksM9cCH/data.json'
    )
    .then(data => {
      return data.json();
    })
    .catch(error => {
      console.error(error);
    });
    this.setState({
      animation: result
    }, 
    this._playAnimation);
  }
    

  render(){
  return (
    <View style={styles.container}>
        <StatusBar hidden={true} />
        {this.state.loaded ? (
          <View>
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#00000000',
              elevation: 21,
              position: 'absolute',
              marginTop: '15%'
            }}
            source={this.state.animation}
          />}

        <Text style={styles.title}>
        {"Ofertas Flash "}
        <Ionicons
          name={"md-flash"}
          size={36}
          style={styles.flashicon}
          color={'#ff7d00'}
        />
        </Text>
        <Text style={styles.subtitle}>
        ¡Ofertas en tiempo real, el primero que reserve se lo lleva!
        </Text>
        <View style={styles.flash}>
        </View>
        <Flash data={this.state.data}/>
        <Swipe
        onRef={ref => (this.swipe = ref)}
        swiped = {this.swiped.bind(this)}/>
        </View>
        ) : (<View></View>)
      }


        

    </View>
  );
}

}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#FAFAFC',
  },
  title:{
    fontSize: 30,
    fontFamily: 'archia-bold',
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%'
  },
  flashicon:{
    marginBottom: 0,
    paddingLeft: 10,
  },
  subtitle:{
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'archia-regular',
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%'
  },
});
