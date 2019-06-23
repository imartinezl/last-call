import React from 'react';
import { Animated, Dimensions, Image,  ScrollView,  StyleSheet,  Text,  Slider, View, TouchableHighlight} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { Ionicons } from '@expo/vector-icons';



const { width } = Dimensions.get('window');
const swipewidth = width*0.7;
const height = width;


export default class Swipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	fadeAnim: new Animated.Value(1)
    }   
  }

	componentDidMount(){
		
	}

	componentDidUpdate(){
		
	}

	componentWillUnmount(){
	}
  leftAction(){
    this.props.swiped('Hey')
  }


  render() {
  return (
    <View style={styles.container}>
      <Swipeable 
      style={styles.swipe} 
      leftContent={leftContent} 
      leftActionActivationDistance={width*0.5}
      onLeftActionRelease={this.leftAction.bind(this)}>
        <View style={styles.content}>
          <Ionicons
            name={"ios-arrow-dropright"}
            size={60}
            style={styles.icon}
            color={'#fff'}
          />
          <Text style={styles.swipeText}>Conseguir Oferta</Text>
          </View>
      </Swipeable>

    </View>
  );
  } 
}
const leftContent = <Text></Text>;


const styles = StyleSheet.create({
  container:{
      top: '-10%',
      elevation: 20,
  },
  swipe:{
      backgroundColor: '#7745C0',
      height: 60,
      marginLeft: '5%',
      marginRight: '5%',
      borderRadius: 60,
    },
    content:{
      flex: 1,
      flexDirection: 'row',
    },
    icon:{
      marginLeft: 5,
      marginBottom: 0,
    },
    swipeText:{
      fontSize: 20,
      color: '#FAFAFC',
      fontFamily: 'archia-bold',
      marginTop: '5%',
      marginLeft: '12%',
    },
  
  
});
