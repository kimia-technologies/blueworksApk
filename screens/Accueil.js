import React from 'react';
import {ScrollView,StyleSheet, Image,Text, View, Dimensions, AsyncStorage, TextInput, ToastAndroid} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Badge} from 'react-native-elements';
import { createDrawerNavigator } from 'react-navigation';
import GererCompte from './GererCompte';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
var axios = require('axios');

export class Accueil extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  async componentWillMount(){
    const token = await AsyncStorage.getItem('token');
    axios.get(Api.baseUrl, {
      params: {},
      headers: {
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    })
    .then(r => {
      this.setState({etat: true});
    })
    .catch(err => {
      this.setState({etat: false});
    });
  }
  async _asyncIsLoged(cible){
    const token = await AsyncStorage.getItem('token');
    const {navigate} = this.props.navigation;
    if(token !== null)
      navigate(cible);
    else navigate('Login', {cible: cible, token: token});
  }
  async _asyncLogOut(){
    console.log('log out');
    await AsyncStorage.removeItem('token');
  }
  async _goTo(screen){
    const {navigate} = this.props.navigation;
    navigate(screen);
  }
  render(){
    return (
        <View style={styles.container}>
        <ScrollView>
          { this.state.etat === false ? 
            <Text>Vous n'etes pas connecte</Text> : null
          }
          <View style={{marginTop: -10, marginVertical: 7, width,}}>
            <Card image={require('../assets/images/cowork.jpg')}>
              <Image source={require('../assets/images/search.png')} style={{height: 25, width: 25, top: 0, zIndex: 1}} />
              <TextInput style = {styles.inputBox}
                  placeholder = "Search..."
                  placeholderTextColor = "grey"
                />
            </Card>
          </View>
        <View style={{alignItems: 'center', backgroundColor: 'white'}}>
          <View style={styles.card}>
                <View style={styles.cards}>
                      <TouchableOpacity style={styles.cardContenu} onPress={async () => await this._asyncIsLoged('GererReservation')}>
                          <Image style = {{width: 20, height: 20}}
                          source={require('../assets/images/calendar1.png')} />
                          <Badge value="1+" status="error" containerStyle={{ position: 'absolute', top: 5, right: 50 }} />
                                    <Text style={styles.contenu}>Historiques</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.cardContenu} onPress={async () => this._goTo('GererServices')}>
                      <Image style = {{width: 20, height: 20}}
                        source={require('../assets/images/tools1.png')} />
                      <Text style={styles.contenu}>Services</Text>
                    </TouchableOpacity>
                  </View>
          </View>
          <View style={styles.card}>
            
                  <View>
                      <TouchableOpacity style={styles.cardContenu} onPress={async () => await this._asyncIsLoged('GererCompte')}>
                        <Image style = {{width: 25, height: 25}}
                        source={require('../assets/images/user1.png')} />
                        <Text style={styles.contenu}>Mon profil</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.cardContenu} onPress={async () => await this._goTo('Actualites')}>
                      <Image style = {{width: 25, height: 25}}
                      source={require('../assets/images/services1.png')} />
                      <Badge value="10+" status="error" containerStyle={{ position: 'absolute', top: 8, right: 50 }} />
                      <Text style={styles.contenu}>Bons plans</Text>
                    </TouchableOpacity>
                  </View>
          </View>
          <View style={styles.card}>
            
                <View>
                      <TouchableOpacity style={styles.cardContenu} onPress={this._asyncLogOut}>
                          <Image style = {{width: 22, height: 22}}
                          source={require('../assets/images/proche.png')} />
                          <Text style={styles.contenu}>Proche de moi</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.cardContenu} onPress={async () => await this._goTo('ServicesClient')}>
                    <Image style = {{width: 27, height: 27}}
                    source={require('../assets/images/help.png')} />
                    </TouchableOpacity>
                  </View>
          </View>
          <View style={styles.card}>
                <View>
                      <TouchableOpacity style={styles.cardContenuB} onPress={async () => await this._asyncIsLoged('Adherer')}>
                <Image style = {{width: 25, height: 25}}
                source={require('../assets/images/qrCode.png')} />
                          <Text style={styles.contenuB}>Obtenir sa clé</Text>
                      </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.cardContenuB} onPress={async () => await this._asyncIsLoged('Reservation')}>
                <Image style = {{width: 25, height: 25}}

                source={require('../assets/images/add.png')} />
                        <Text style={styles.contenuB}>Reserver un</Text>
                        <Text style={styles.contenuB}>espace</Text>
                    </TouchableOpacity>
                  </View>
          </View>
          </View>
          </ScrollView>
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
        </View>
    );
  }
}

export default createDrawerNavigator({
  Home: {
    screen: Accueil
  },
  settings: {
    screen: GererCompte
  }
})
const {width = WIDTH} = Dimensions.get('window')
const {height = HEIGHT} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  card: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  cardEspText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

  },
  inputBox: {
    paddingHorizontal: 35,
        width: 320,
        height:35,
        borderRadius: 20,
        fontSize:16,
        color: 'black',
        backgroundColor: 'whitesmoke',
        borderRadius: 15,
        borderBottomColor: 'whitesmoke',
        borderBottomWidth: 1,
        position: 'absolute',
        zIndex: 0,
        marginTop: 5,
        marginLeft: 5
    },
  cardText: {
    fontWeight: '300',
    textAlign: 'center'
  },
  contenu: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 14,
  },
  contenuB: {
    textAlign: 'center',
    fontWeight: '300',
    color: 'white',
    fontSize: 14
  },
  cardContenu: {
      backgroundColor: 'whitesmoke',
      width: 150,
      height: 65,
      marginHorizontal: 13,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.70,
      
      elevation: 8,
  },
  cardContenuB: {
      backgroundColor: 'rgb(0, 111, 186)',
      width: 150,
      height: 75,
      color: 'white',
      marginHorizontal: 13,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.70,
      
      elevation: 8,
  },
  adh: {
    alignItems: 'center',
    justifyContent: 'center'
  }
  
});