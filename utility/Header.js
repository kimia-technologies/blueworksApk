import React, { Component } from 'react';
import { View, TouchableHighlight, Image  } from 'react-native';

export default class HeaderNavigationBar extends Component {
    render() {
        return (
        <View>
            <TouchableHighlight style={{ marginLeft: '85%' }}
                onPress={() => { this.props.navigation.toggleDrawer() }}>
                <Image style={{height: 30, width:30,}}
                    source={require('../assets/images/menu.png')}
                />
            </TouchableHighlight>
        </View>);
    }
}