import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/Colors';

export default class SideSelector extends Component {
  static defaultProps = {
    selectedSize: 50,
    normalSize: 25,
    normalColor: 'black',
    selectedColor: Colors.headerOrange,
    selectorPress: console.log,
    selectedIndex: 0,
    selectorItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    }
  }

  displaySelectors() {
    return this.props.selectorItems.map((item, index) => (
       <Icon key={index} name={item} onPress={() => this.props.selectorPress(index)}
        size={(index === this.props.selectedIndex ? this.props.selectedSize : this.props.normalSize)} 
        color={(index === this.props.selectedIndex ? this.props.selectedColor : this.props.normalColor)}
        style={styles.selector}/>));
  }

  render() {
    return (
      <View style={styles.sideSelector}>
        {this.displaySelectors()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideSelector: {
    flexDirection:'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selector: {
    marginRight: 5, 
    marginBottom: 2,
    alignItems: 'center',
  }
});