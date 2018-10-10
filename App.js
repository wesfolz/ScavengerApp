import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';

import Chat from './components/Chat';
import ScavengerMain from './components/ScavengerMain';
import NavigationService from './NavigationService';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    navigate(index) {
        NavigationService.navigate(this.routes[index]);
        this.setState({ selectedIndex: index });
    }

    render() {
        return (
            <View style={styles.container}>
                <DrawerComponent
                    ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }}
                />
            </View>
        );
    }
}

const DrawerComponent = DrawerNavigator({
    Home: {
        screen: ScavengerMain,
    },
    Chat: {
        screen: Chat,
    }
},
    {
        drawerPosition: 'left',
        contentComponent: () => (
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <Chat user={'Alexa'} interlocutor={'Peach'} onReceiveMethod={() => NavigationService.openDrawer()} />
            </SafeAreaView>
        )
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});