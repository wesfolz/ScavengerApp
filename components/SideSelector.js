import React, {Component} from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import NavigationService from '../NavigationService.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class SideSelector extends Component {
  static defaultProps = {
    selectedSize: 50,
    normalSize: 25,
    normalColor: '#000000',
    selectedColor: '#6FCF97',
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

  selectItem(route, index) {
    this.setState({
      selectedIndex: index,
    });
    NavigationService.navigate(route);
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