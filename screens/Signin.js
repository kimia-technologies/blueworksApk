import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  ToastAndroid,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Card } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
var axios = require('axios');


export default class Sign extends React.Component{
  static navigationOptions = {
    title: 'S\'inscrire'
}
  constructor(props) {
    super(props);
    this.state = {};
    this.data = {};
  }
  _asyncSignin() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    if(this.data.k === this.data.c)
    {
      const config = {
        headers: {
          'Content-type' : 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      };
      if(this.state.k === this.state.c) {
      axios.post(Api.baseUrl + '/api.blueworks/signIn', this.data, config)
        .then(res => {
          if(res.data.msg === 'success');
            navigate('Login', {cible: params.cible});
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.SHORT);
        });
      }
    } else ToastAndroid.show('mots de passe differents', ToastAndroid.SHORT);
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
             Vous trouverez toujours l'espace adhéquat a vos besoins, vous satisfaire est notre priorité !!!
             </Text>
             </Card>
            </View>
            <View style={{marginVertical: 10}}>
                <View>
                    <TextInput style = {styles.inputBox}
                      ref = 'email'
                      placeholder = "Email*"
                      autoCorrect = {false}
                      keyboardType = {'email-address'}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.data.e = text}}
                    />
                </View>
                <View>
                    <TextInput style = {styles.inputBox}
                      placeholder = "Pseudo*"
                      autoCorrect = {false}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.data.ps = text}}
                    />
                </View>
                <View>
                    <TextInput style = {styles.inputBox}
                      placeholder = "Telephone*"
                      autoCorrect = {false}
                      keyboardType = {'phone-pad'}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.data.t = text}}
                    />
                </View>
                  <View>
                      <TextInput style = {styles.inputBox} 
                      placeholder = "Prenom"
                      autoCorrect = {false}
                      placeholderTextColor = "grey"
                      onChangeText = {text=>{this.data.p = text}}
                      />
                  </View>
                <View>
                    <TextInput style = {styles.inputBox}
                      placeholder = "Nom"
                      autoCorrect = {false}
                      placeholderTextColor = "grey"
                      underlineColorAndroid = 'transparent'
                      onChangeText = {text=>{this.data.n = text}}
                    />
                </View>
                  <View>
                      <TextInput style = {styles.inputBox} 
                      placeholder = "Mot de passe*"
                      autoCorrect = {false}
                      secureTextEntry = {true}
                      placeholderTextColor = "grey"
                      onChangeText = {text=>{this.data.k = text}}
                      />
                  </View>
                  <View>
                      <TextInput style = {styles.inputBox} 
                      placeholder = "Confirmer votre mot de passe*"
                      autoCorrect = {false}
                      secureTextEntry = {true}
                      placeholderTextColor = "grey"
                      onChangeText = {text=>{this.data.c = text}}
                      />
                  </View>
              </View>

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