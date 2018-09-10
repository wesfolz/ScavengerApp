import React, {Component} from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import NavigationService from '../NavigationService.js';

import Icon from 'react-native-vector-icons/FontAwesome';


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
    let icons = [];
    for (let i=0; i < this.props.selectorItems.length; i++) {
      //let selector = this.props.selectorItems[i];
      let size = (i === this.props.selectedIndex ? this.props.selectedSize : this.props.normalSize);
      let color = (i === this.props.selectedIndex ? this.props.selectedColor : this.props.normalColor);
      icons.push(
        <TouchableHighlight key={i} underlayColor={'grey'} onPress={() => this.props.selectorPress(i)}>
          <Icon name={this.props.selectorItems[i]} size={size} color={color} style={styles.selector}/>
        </TouchableHighlight>);
    }
    return icons;
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  selector: {
    marginRight: 5, 
    marginBottom: 2,
  }
});