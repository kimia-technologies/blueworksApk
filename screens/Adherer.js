import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Adherer extends React.Component{
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Adherer</Text>
    )
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.qrcode} >
          <Image style={{height: 300, width: 300}} source={require('../assets/images/qr.png')}/>

        </View>

        <View style={styles.infos}>
              <View>
                <Text style={{fontSize: 40, fontWeight: '300'}}>Djamen</Text>
                <Text style={{fontSize: 30, fontWeight: '200'}}>Stephane</Text>
                <Text style={{fontSize: 20, fontWeight: '100'}}>fs142</Text>
              </View>
        </View>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center'
  },
  qrcode: {
    flex: 2,
    width: 355,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infos: {
    flex: 1,
    width: 370,
    alignItems: 'center',
    justifyContent: 'center'
  }
});