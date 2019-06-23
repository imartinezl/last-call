import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {  Image,  Alert, ScrollView,  StatusBar, StyleSheet,  Text, TouchableHighlight, TouchableOpacity,  View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Flash from '../components/Flash';  
import Swipe from '../components/Swipe';
import Lottie from 'lottie-react-native'

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      animation: null,

    }
    //this._stopAnimation = this._stopAnimation.bind(this);
  }


  swiped(d){
    console.log("Swiped: ", d);
    this._playAnimation();
    setTimeout(() => {this._showAlert()}, 1000)
    //this._showAlert();

  }
  _showAlert(){
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'OK', onPress: () => this._stopAnimation()},
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
        {this.state.animation &&
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 400,
              height: 400,
              backgroundColor: '#00000000',
              zIndex: 10,
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
        <Flash/>
        <Swipe
        onRef={ref => (this.swipe = ref)}
        swiped = {this.swiped.bind(this)}/>



        

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
    fontSize: 11,
    color: '#aaa',
    fontFamily: 'archia-regular',
    marginTop: '3%',
    marginLeft: '3%',
    marginRight: '3%'
  },
});
