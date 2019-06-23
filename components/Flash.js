import React from 'react';
import { Button, TouchableOpacity, Dimensions, Image,  FlatList, ScrollView,  StyleSheet,  Text,  Slider, View, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const widthB = width*0.94;
const height = widthB*0.8;

const K = 0.15;
const A = 0.25;

//export default function Flash(props) {
export default class Flash extends React.Component {
  constructor(props) {
    super(props);
    let images = []
  	console.log(this.props.data.fotos)
  	for (var i = 0; i < this.props.data.fotos.length; i++) {
  		images.push({
		    key:   i,
		    source: {uri: this.props.data.fotos[i]}
		});
  	}
    this.state = {
    	timer: this.props.data.tiempo,
    	precio: this.props.data.precio_inicial,
    	personas: 0,
    	personasIncr: 10,
    	comensales: 1,
    	images: images
    	
    }   
    this.convertImages = this.convertImages.bind(this);
  }
  precioCalc(precio){
  	let p = precio - K + A*(Math.random());
  	p = Math.max(this.props.data.precio_minimo, p);
  	p = Math.min(this.props.data.precio_maximo, p);
  	return(p)
  }
  personasCalc(personas, personasIncr){
  	let p = personas + Math.round(Math.random()*personasIncr)
  	return(p)
  }
  personasIncrCalc(personasIncr){
  	let p = personasIncr - 0.5;
  	p = Math.max(1, p);
  	return(p)
  }
  sumarComensal(){
  	this.setState((prevState) =>({
  		comensales: Math.min(7,prevState.comensales + 1)
  	}))
  }
  restarComensal(){
  	this.setState((prevState) =>({
  		comensales: Math.max(1, prevState.comensales - 1)
  	}))
  }
  convertImages(){
  	let images = []
  	console.log(this.props.data.fotos)
  	for (var i = 0; i < this.props.data.fotos.length; i++) {
  		images.push({
		    key:   i,
		    source: {uri: this.props.data.fotos[i]}
		});
  	}
  	console.log(images)
  	this.setState({
  		images: images
  	})
  }

	componentDidMount(){
		this.interval = setInterval(() => 
			this.setState((prevState)=> ({
			 timer: prevState.timer - 1,
			 precio: this.precioCalc(prevState.precio) ,
			 personasIncr: this.personasIncrCalc(prevState.personasIncr),
			 personas: this.personasCalc(prevState.personas, prevState.personasIncr)
			 })), 1000
		);
	}

	componentDidUpdate(){
		if(this.state.timer === 0){ 
		clearInterval(this.interval);
		// llamar a funcion que llama a la siguiente oferta
		}
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

  render() {
  return (
    <View style={styles.container}>
		<ScrollView
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
		>
			{this.state.images.map((image) => (
			  <Image key={image.key} style={styles.image} source={image.source} />
			))}
		</ScrollView>

    	<Text style={styles.nombre}>
    		{this.props.data.nombre}
    	</Text>
    	<Text style={styles.descripcion}>
    		{this.props.data.descripcion}
    	</Text>
    	<FlatList data={this.props.data.tags} horizontal={true} style={styles.tags} renderItem={
    		({item, index}) => <Text key={index} style={styles.tag}>{item}</Text>
    	}/>

    	<View style={styles.comensalescontainer}>
	    	<Button
			  onPress={this.restarComensal.bind(this)}
			  title="-"
			  color="#7745C0"
			/>
			<View style={styles.comensales}>
			<Ionicons name={"ios-person"} size={24} style={styles.icon} color={'black'}/>
	    	<Text style={styles.comensalesText}>
	    		{this.state.comensales}
	    	</Text>
	    	</View>
	    	<Button
			  onPress={this.sumarComensal.bind(this)}
			  title="+"
			  color="#7745C0"
			>
			<Text style={styles.button}>+</Text>
			</Button>
		</View>
		<View style={styles.sliderContainer}>
    	  <Slider
		    style={styles.slider}
		    trackStyle={styles.trackStyle}
		    minimumValue={0}
		    maximumValue={1}
		    minimumTrackTintColor="#FFFFFF"
		    maximumTrackTintColor="#000000"
		    value={this.state.timer/this.props.data.tiempo}
		    disabled={true}

		  />
		</View>

		<View style={styles.stats}>
			<View style={styles.stat}>	    	
				<Ionicons name={"ios-timer"} size={30} style={styles.icon} color={'black'}/>
		    	<Text style={styles.stat_text}>
		    		{n(Math.floor(this.state.timer/60)) + ":" +  n(this.state.timer % (60))}
		    	</Text>
	    	</View>
	    	<View style={styles.stat}>
				<Ionicons name={"logo-euro"} size={30} style={styles.icon} color={'black'}/>
		    	<Text style={styles.stat_text}>
		    		{n(Math.floor(this.state.precio)) + "." +  n(Math.round(this.state.precio % 1 * 100)) }
		    	</Text>
	    	</View>
	    	<View  style={styles.stat}>
	    		<Ionicons name={"ios-person"} size={30} style={styles.icon} color={'black'}/>
				<Text style={styles.stat_text}>
					{this.state.personas}
				</Text>
    		</View>
	    </View>
	

         



    </View>
  );
}
}

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

const styles = StyleSheet.create({
  container: {
    marginTop: "3%",
    marginLeft: '3%',
    marginRight: '3%',
    backgroundColor: '#fff',
	borderRadius: 30,
    elevation: 20,
    paddingBottom: '10%'
  },
  image: {
    width: widthB,
    height: height,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  },
  comensalescontainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: '3%',
    marginBottom: '3%'
  },
  comensales:{
  	flexDirection:'row',
  	marginTop: 5, 
  	width: 40, 
  	marginLeft: '3%',
    marginRight: '3%'
  },
  comensalesText:{
  	fontSize: 20,
    fontFamily: 'archia-bold',
    marginLeft: '5%',
  },
  button:{
  	backgroundColor: 'black',
  	color: 'white',
  },
  nombre:{
	fontSize: 24,
    fontFamily: 'archia-bold',
    marginTop: '3%',
    alignSelf: 'center'
  },
  descripcion:{
	fontFamily: 'archia-bold',
    marginTop: '2%',
    alignSelf: 'center'
  },
  tags:{
  	alignSelf: 'center',
  	marginTop: '2%'
  },
  tag:{
  	backgroundColor:'#ddd',
  	marginLeft: 5,
  	marginRight: 5,
  	padding: 8,
  	color: 'black',
  	fontFamily: 'archia-regular',
  	alignSelf: 'center'
  },
  stats:{
  	flexDirection: 'row',      
  	justifyContent: 'center',
  },
  stat:{
  	width: '30%',
  	height: 80,
  	borderRightWidth: 1,
  	borderLeftWidth: 1,
  	borderColor: '#ddd',
  	justifyContent: 'center',
  	alignItems: 'center'

  },
  stat_text:{
	color: 'black',
	fontSize: 30,
  	fontFamily: 'archia-bold',
  },
  sliderContainer:{
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  slider:{
  	width: '94%',

  },
});

const images2 = [
'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg'
];
const images = [
  {
  	key: 0,
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
    },
  },
  {
  	key:1,
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
    },
  },
  {
  	key:2,
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
    },
  },
  {
  	key:3,
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
    },
  },
  
];