import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Styles from '../constants/Styles';


export default class GererReservation extends React.Component{
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Reservations</Text>
    )
  }
async _asyncIsLoged(cible){
  const token = await AsyncStorage.getItem('token');
  const {navigate} = this.props.navigation;
  if(token !== null)
    navigate(cible);
  else navigate('Login', {cible: cible}); 
}
  render(){
    const { navigate } = this.props.navigation;
    return(
          <View style={styles.container}>
            <ScrollView>
            <View style={styles.texte} >
            <View>
              <View style={{margin: 5, padding: 5}}>
                <Text style={{fontSize: 17, textAlign: 'center'}}>
                  les reservations validées ne peuvent plus etre annulées
                </Text>
              </View>
            </View>
            </View>
            <View style={styles.menu}>
                  <View>
                    <TouchableOpacity style={styles.reservation} onPress={async () => await this._asyncIsLoged('Historiques')}>
                        <Image style={{height: 60, width: 60}} source={require('../assets/images/services1.png')}/>
                      <Text style={styles.contenu}>Consommation de </Text>
                      <Text style={styles.contenu}>mes services</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.reservation} onPress={()=>navigate('Historiques', {all :true})}>
                          <Image style={{height: 60, width: 60}} source={require('../assets/images/calendar1.png')}/>
                        <Text style={styles.contenu}>Historique</Text>
                    </TouchableOpacity>
                  </View>
            </View>
            </ScrollView>
            <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
          </View>
    );
  }
}
const {width = WIDTH} = Dimensions.get('window')
const {height = HEIGHT} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height,
    width
  },
  reservation: {
      marginVertical: 8,
      backgroundColor: 'whitesmoke',
      width: 300,
      height: 122,
      borderRadius: 5,
      alignItems: 'center',
  },
  menu: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenu: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '100',
  },
  txt: {
    fontSize: 20,
    textAlign: 'center'
  }
});