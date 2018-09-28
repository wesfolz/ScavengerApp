import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native'; 

export default ({text}) => {

	return (
		<View style={styles.container}>
			<View style={styles.bubble}>
				<Text style={styles.speechText}>
					{text}
				</Text>
			</View>
			<Image
	          source={require('../images/Tiberius.jpg')}
	          style={styles.image}
	          resizeMode="contain"
	        />
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: 50,
    padding: 8,
    marginTop: 10,
    backgroundColor: 'white',
    width: 200
  },
  image: {
    borderRadius: 100,
    width: 80,
    height: 80,
    marginRight: 5,
  },
  speechText: {
  	fontSize: 24,
  	fontFamily: "Bob's Burgers",
  	textAlign: 'center',
  	color: 'black',// '#ffdb58',// '#ce2522',//'#2D9CDB'
  },
});