import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Card } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
var axios = require('axios');


export default class Sign extends React.Component{
  static navigationOptions = {
    title: 'S\'inscrire',
    drawerIcon: (
      <Image source = {require('../assets/images/user1.png')}
      style={{height: 26, width: 26}} />
    ),
    title : 'S\'inscrire'
  }
  constructor(props) {
    super(props);
    this.state = {
      spinne: false
    };
  }
  _asyncSignin() {
    const pattern = {
      ePattern : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
      tPattern : /^6[-\s\.\/0-9]{8}$/g,
      gPattern : /[!#,^`\[\].?":{}|<>]/g
    };
    const {params} = this.props.navigation.state;
    const data = {
      e: pattern.ePattern.test(this.state.e) === true ? this.state.e : undefined,
      ps: pattern.gPattern.test(this.state.ps) === false ? this.state.ps : undefined,
      n: pattern.gPattern.test(this.state.n) === false ? this.state.n : undefined,
      p: pattern.gPattern.test(this.state.p) === false ? this.state.p : undefined,
      k: pattern.gPattern.test(this.state.k) === false ? (/^.{5,}$/g.test(this.state.k) === true ? this.state.k : undefined) : undefined,
      t: pattern.tPattern.test(this.state.t) === true ? this.state.t : undefined
    };
    if(this.state.k === this.state.c)
    {
      const config = {
        headers: {
          'Content-type' : 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      };
      if(data.t === undefined)
        ToastAndroid.show('telephone incorrect', ToastAndroid.LONG);
      else if (data.k === undefined)
        ToastAndroid.show('le mot de passe doit contenir au moins 5 caracteres', ToastAndroid.LONG);
      else if(data.e === undefined)
        ToastAndroid.show('email incorrect', ToastAndroid.LONG);
      else if(data.ps === undefined)
        ToastAndroid.show('!#,^`\[\].?":{}|<> interdits', ToastAndroid.LONG);
      else {
        this.setState({spinne: true});
        axios.post(Api.baseUrl + '/api.blueworks/signIn', data, config)
        .then(res => {
            this.setState({spinne: false});
            this.props.navigation.replace('Activer', {cible: params.cible, email: data.e});
        })
        .catch(err => {
          this.setState({spinne: false});
          ToastAndroid.show(err.response.data.msg, ToastAndroid.LONG);
        });
      }
    } else ToastAndroid.show('mots de passe differents', ToastAndroid.LONG);
  }
  render(){
    const {navigate} = this.props.navigation;
    return(
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200} enabled>
      <ScrollView>
          <View style = {styles.container}>
            <View>
              <Card image={require('../assets/images/coworking.png')}>
             <Text>
              {String('Vous trouverez toujours l\'espace adhéquat a vos besoins, vous satisfaire est notre priorité !!!')}
             </Text>
             </Card>
            </View>
            <View style={{marginVertical: 10}}>
                <View>
                    <TextInput style = {styles.inputBox}
                      ref = 'email'
                      placeholder = "Email*"
                      autoCorrect = {false}
                      autoCapitalize = "none"
                      autoFocus={true}
                      keyboardType = {'email-address'}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.setState({e: text})}}
                      value={this.state.e}
                    />
                </View>
                <View>
                    <TextInput style = {styles.inputBox}
                      placeholder = "Pseudo*"
                      autoCorrect = {false}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.setState({ps: text})}}
                      value={this.state.ps}
                    />
                </View>
                <View>
                    <TextInput style = {styles.inputBox}
                      placeholder = "Telephone*"
                      autoCorrect = {false}
                      keyboardType = {'phone-pad'}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.setState({t: text})}}
                      value={this.state.t}
                    />
                </View>
                  <View>
                      <TextInput style = {styles.inputBox} 
                      placeholder = "Prenom"
                      autoCorrect = {false}
                      placeholderTextColor = "grey"
                      onChangeText = {text=>{this.setState({p: text})}}
                      value={this.state.p}
                      />
                  </View>
                <View>
                    <TextInput style = {styles.inputBox}
                      placeholder = "Nom"
                      autoCorrect = {false}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.setState({n: text})}}
                      value={this.state.n}
                    />
                </View>
                  <View>
                      <TextInput style = {styles.inputBox} 
                      placeholder = "Mot de passe*"
                      autoCorrect = {false}
                      secureTextEntry = {true}
                      placeholderTextColor = "grey"
                      onChangeText = {text=>{this.setState({k: text})}}
                      value={this.state.k}
                      />
                  </View>
                  <View>
                      <TextInput style = {styles.inputBox} 
                      placeholder = "Confirmer votre mot de passe*"
                      autoCorrect = {false}
                      secureTextEntry = {true}
                      placeholderTextColor = "grey"
                      onChangeText = {text=>{this.setState({c: text})}}
                      value={this.state.c}
                      />
                  </View>
              </View>

              <Spinner
              visible={this.state.spinne}
              color="rgb(0, 111, 186)"
              animation="slide"
              textContent={''}
              />
              <TouchableOpacity style = {styles.button} onPress={this._asyncSignin.bind(this)}>
                  <Text style = {styles.buttonText}>Continuer</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigate('Login')}>
              <Text style = {styles.signupButton}>Se connecter</Text>
            </TouchableOpacity>
          </View>
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const {width = WIDTH} = Dimensions.get('window')
const {height = HEIGHT} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width,
  },
  logoTxt: {
      marginVertical: 8,
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '500'
  },
  inputBox: {
        width: 330,
        height:45,
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize:16,
        color: 'black',
        marginVertical: 7,
        paddingLeft: 15,
        backgroundColor: 'whitesmoke',
        borderRadius: 15,
        borderBottomColor: 'rgb(0, 111, 186)',
        borderBottomWidth: 1
    },
  signupTextCont: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: "row"
    },
  button: {
        backgroundColor: 'rgb(0, 111, 186)',
        width: 330,
        borderRadius: 25,
        paddingVertical: 13,
        marginVertical: 10,

    },
  buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
  signupText: {
         color: 'grey',
         fontSize: 15
   },
  signupButton: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '500',
        textAlign:'center',
        marginTop: 8,
        marginVertical: 10,
    }
});