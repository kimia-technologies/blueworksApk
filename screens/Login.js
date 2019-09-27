import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Api from '../constants/Api';
import Styles from '../constants/Styles';
var axios = require('axios');


export default class Login extends React.Component{
  static navigationOptions = {
    title: 'Se connecter',
    drawerIcon: (
      <Image source = {require('../assets/images/login.png')}
      style={{height: 26, width: 26}} />
    ),
  }
constructor(props) {
  super(props);
  this.state = {
    spinne: false
  };
}
componentDidMount(){
  const {params} = this.props.navigation.state;
  if(params !== undefined)
  {
    this.setState({cible: params.cible});
    this.setState({shortcut: params.shortcut});
    if (params.back !== undefined)
      this.setState({back: params.back});
  }
}
  async _asyncLogin(){
    const {navigate} = this.props.navigation;
    const config = {
      headers: {
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    };
    const data = {
      id: this.state.id,
      k: this.state.k
    };
    this.setState({spinne: true});
    await axios.post(Api.baseUrl + '/api.blueworks/login', data, config)
      .then(async res => {
        this.setState({spinne: false});
        if(res.data.user){
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('email', res.data.user.email);
          await AsyncStorage.setItem('refreshToken', res.data.refreshToken);
          if(this.state.back !== undefined)
            navigate(null);
          else this.props.navigation.replace(this.state.cible, {shortcut: this.state.shortcut});
        }
      })
      .catch(err => {
        this.state.k = null;
        this.setState({spinne: false});
        this.setState({err: err.response.data.msg});
      });
  }
  render(){
    const {navigate} = this.props.navigation;
    return(
      <ScrollView behavior="padding" keyboardVerticalOffset={-200} enabled>
      <View style = {styles.container}>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Image style = {{width: 130, height: 130}}
          source={require('../assets/images/blueworks.png')} />
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
        </View>
        <View style={{marginVertical: 20}}>
            <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Email, Telephone ou pseudo</Text>
                <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  autoCapitalize = "none"
                  autoFocus={true}
                  autoCorrect ={false}
                  onChangeText = {text => {this.setState({id: text})}}
                  value = {this.state.id}
                />
            </View>
              <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Mot de passe</Text>
                  <TextInput style = {styles.inputBox}
                  secureTextEntry = {true}
                  autoCorrect = {false}
                  onChangeText = {text => {this.setState({k: text})}}
                  value = {this.state.k}
                  />
              </View>
          </View>
          <Spinner
          visible={this.state.spinne}
          color="rgb(0, 111, 186)"
          animation="slide"
          textContent={''}
          />
          <TouchableOpacity style = {styles.button} onPress={this._asyncLogin.bind(this)}>
              <Text style = {styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {
            this.state.err !== undefined ?
            <Text style={{color: 'red', marginTop: 0}}>{this.state.err}</Text> : null
          }
          <View style = {styles.signupTextCont}>
            <TouchableOpacity onPress={() => navigate('Sign', {cible: this.state.cible})}>
              <Text style = {styles.signupButton}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
      </View>
      </ScrollView>
    );
  }
}
const {width = WIDTH} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width
  },
  logoTxt: {
      marginVertical: 8,
      color: 'black',
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center'
  },
  inputBox: {
        width: 300,
        height:45,
        paddingHorizontal: 16,
        fontSize:16,
        color: 'black',
        marginVertical: 10,
        paddingLeft: 15,
        borderRadius: 15,
        borderBottomColor: 'rgb(0, 111, 186)',
        borderBottomWidth: 1
    },
  signupTextCont: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: "row",
        marginVertical: 5
    },
  button: {
        backgroundColor: 'rgb(0, 111, 186)',
        width: 300,
        borderRadius: 25,
        paddingVertical: 13,
        marginBottom: 6
    },
  buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
  signupText: {
         color: 'grey',
         fontSize: 15,
         backfaceVisibility: 'hidden'
   },
  signupButton: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '500'
    }
});