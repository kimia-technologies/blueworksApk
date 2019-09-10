import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions
} from 'react-native';
import {
    createAppContainer,
    createDrawerNavigator,
    DrawerItems
} from 'react-navigation';

const CustomDrawerContentComponent = (props) => ( 
    <View >
        <View style = {{marginLeft: 50,marginTop: 20,height: 150}}>
        <Image source = {
            require('../assets/images/barca.png')
        }
        style = {styles.drawerImage}/>
        </View>
            <DrawerItems {...props}/>
    </View>
)
class Code extends React.Component {
    static navigationOptions = {
      drawerIcon: (
        <Image source={require('../assets/images/code.png')} style={{height:24, width:24}} />
        )
    }
    render() {
      return (
        <View style = {styles.container}>
          <Text>Code</Text>
        </View>
      );
    }
  }
  class Langue extends React.Component {
    static navigationOptions = {
      drawerIcon: (
        <Image source={require('../assets/images/fr.png')} style={{height:24, width:24}} />
        )
    }
    render() {
      return (
        <View style = {styles.container}>
          <Text>Langues</Text>
        </View>
      );
    }
  }
  class Deconnexion extends React.Component {
    static navigationOptions = {
      drawerIcon: (
        <Image source={require('../assets/images/deconnexion.png')} style={{height:24, width:24}} />
        )
    }
    render() {
      return (
        <View style = {styles.container}>
          <Text>Deconnexion</Text>
        </View>
      );
    }
  }
  

export default createDrawerNavigator({
    Code: {
        screen: Code
    },
    Langue: {
        screen: Langue
    },
    Deconnexion: {
        screen: Deconnexion
    },
}, {
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    contentComponent: CustomDrawerContentComponent
});