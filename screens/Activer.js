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
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import Api from '../constants/Api';
var axios = require('axios');

export default class Code extends React.Component{
  static navigationOptions = {
    drawerIcon: (
      <Image source = {require('../assets/images/home.png')}
      style={{height: 26, width: 26}} />
    ),
    title : "Activer son compte"
  }
  constructor(props){
    super(props);
    this.state = {};
  }
  async _activate(){
    const {params} = this.props.navigation.state;
    const {navigate} = this.props.navigation;
    const config = {
      headers: {
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : '*'
      }
    };
    const data = {
      e: this.state.e,
      c: this.state.c
    };
    axios.post(Api.baseUrl + '/api.blueworks/activate/account', data, config)
    .then(res => {
      ToastAndroid.show('succes', ToastAndroid.LONG);
      if(params !== undefined) {
        this.state.e = params.email;
        this.props.navigation.replace('Login', {cible: params.cible});
      } else navigate('Accueil');
    })
    .catch(err => {
      ToastAndroid.show(err.response.data.msg, ToastAndroid.LONG);
    });
  }
  render(){
    return(
      <KeyboardAvoidingView behavior="padding" enabled>
      <ScrollView>
      <View style = {styles.container}>
        <View style={{marginTop: 10}}>
            <View>
                    <Text style={{
                          marginLeft: '5%',
                          fontSize: 19}}>
                            Email* :
                        </Text>
                        <TextInput style={styles.numero} placeholder="Entrez votre email" placeholderTextColor="grey"
                        autoCapitalize={"none"}
                        onChangeText = {text => this.setState({e: text})} />
            </View>
            <View>
            <Text style={{
                          marginLeft: '5%',
                          fontSize: 19}}>
                            Code* :
                        </Text>
                        <TextInput style={styles.numero} placeholder="Entrez le code reçu par mail" placeholderTextColor="grey"
                        onChangeText = {text => this.setState({c: text})} />
             </View>
        </View>
          <TouchableOpacity style = {styles.button} onPress={this._activate.bind(this)}>
              <Text style = {styles.buttonText}>Valider</Text>
          </TouchableOpacity>
      </View>
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
    backgroundColor: 'white',
    width,
  },
  button: {
        backgroundColor: 'rgb(0, 111, 186)',
        width: '90%',
        borderRadius: 25,
        paddingVertical: 13,
        marginBottom: 15,
        marginLeft: '5%'
    },
  buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    numero: {
      width: '90%',
      marginLeft: 15,
      borderWidth: 1,
      borderColor: 'grey',
      height:45,
      backgroundColor: 'whitesmoke',
      marginVertical: 20,
      paddingHorizontal: 12,
    }
});