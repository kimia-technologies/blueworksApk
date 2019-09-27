import React from 'react';
import {ScrollView,StyleSheet, Image,Text, View, Dimensions, AsyncStorage, ToastAndroid} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Badge} from 'react-native-elements';
import Slideshow from 'react-native-slideshow';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import { createDrawerNavigator,DrawerItems } from 'react-navigation';
import Signin from './Signin';
import Login from './Login';
import Activer from './Activer';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
var axios = require('axios');

const CustomDrawerContentComponent = (props) => ( 
  <View>
      <View style = {{height: 150, backgroundColor: 'rgb(0, 111, 186)', justifyContent: "center", alignItems: "center"}}>
        <Image source={require('../assets/images/blueworksN.png')} style={{width: 100, height: 100}} />
      </View>
      <DrawerItems {...props}/>
  </View>
);
export class Accueil extends React.Component {
  static navigationOptions = {
    drawerIcon: (
      <Image source = {require('../assets/images/home.png')}
      style={{height: 26, width: 26}} />
    ),
    title : "Accueil"
  }
  constructor(props){
    super(props);
    this.state = {
      position: 0,
      interval: null,
      dataSource: []
    };
  }
  async componentWillMount() {
    await axios.get(Api.baseUrl, {
      params: {},
      headers: {
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    })
    .then(res => {
      this.setState({etat: true});
      this.setState({dataSource: res.data});
      this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length-1 ? 0 : this.state.position + 1
        });
      }, 5000)
    });
    this.setState({etat: true});
    })
    .catch(err => {
      this.setState({etat: false});
    });
  }
  async _asyncIsLoged(cible, shortcut=undefined){
    const token = await AsyncStorage.getItem('token');
    const {navigate} = this.props.navigation;
    if(token !== null) {
      navigate(cible, {shortcut: shortcut});
    }
    else navigate('Login', {cible: cible, token: token, shortcut: shortcut});
  }
  async _asyncLogOut(){
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Authorization' : 'Bearer ' + token
      }
    };
    axios.post(Api.baseUrl + '/api.blueworks/logout', {}, config)
    .then(async () => {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('refreshToken');
    })
    .catch(async err => {
      ToastAndroid.show('Vous n\'etes pas connecte!', ToastAndroid.LONG);
    });
  }
  async _goTo(screen){
    const {navigate} = this.props.navigation;
    navigate(screen);
  }
  componentDidMount() {
    lor(this);
  }
 
  render(){
      return (
      this.state.etat !== undefined ? (this.state.etat === false ? <View style={{alignItems: "center", marginTop: "50%"}}>
      <Text style={{textAlign: "center", fontSize: 18, color: "grey"}}>{String('Verifiez votre connexion internet')}</Text>
      </View> :
      <View style={styles.container}>
        <ScrollView>
          <View style={{height: hp('30%'), width, padding: 5}}>
          <View style={{}}>
            <Slideshow 
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} 
                indicatorColor = 'rgb(0, 111, 186)'
                scrollEnabled = {false}
                overlay = {true}
                height = {hp('30%')}
            />
            </View>
        </View>
        <View style={{alignItems: 'center', height: hp('55%'), paddingTop: 15}}>
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
                      <TouchableOpacity style={styles.cardContenu} onPress={this._asyncLogOut.bind(this)}>
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
                    <TouchableOpacity style={styles.cardContenuB} onPress={async () => await this._asyncIsLoged('Reservation', true)}>
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
        </View>) : <Spinner
                      visible={true}
                      textContent={'Loading...'}
                      animation="fade"
                      color="rgb(0, 111, 186)"
                    />
    );
  }
}

export default createDrawerNavigator({
  Home: {
    screen: Accueil
  },
  Activer_r: {
    screen: Activer
  },
  Login_r: {
    screen: Login
  },
  Sign_r: {
    screen: Signin
  }
}, {
  contentComponent: CustomDrawerContentComponent
});

const {width = WIDTH} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
  card: {
    flexDirection: 'row',
    marginVertical: '1%',
  },
  cardEspText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

  },
  inputBox: {
    paddingHorizontal: 35,
    width: wp('90%'),
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
        marginLeft: '1%'
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
      width: wp('42%'),
      height: hp('11%'),
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
      width: wp('42%'),
      height: hp('12%'),
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