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
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native';
import { Header } from 'react-native-elements';
import Api from '../constants/Api';
var axios = require('axios');


export default class Code extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  async _pay(){
    const {params} = this.props.navigation.state;
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-type' : 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Authorization' : 'Bearer ' + token,
        'b-action' : 'EDIT',
        'ressource' : 'reservation'
      }
    };
    axios.post(Api.baseUrl + '/reservation/pay', params.rsv, config)
      .then(state => {
        ToastAndroid.show('succes', ToastAndroid.LONG);
        this.props.navigation.replace('Historiques', {all: true});
      })
      .catch(err => {
        ToastAndroid.show('Echec du paiement', ToastAndroid.LONG);
      });
  }
  render(){
    const {navigate} = this.props.navigation.navigate;
    return(
      <KeyboardAvoidingView behavior="padding" enabled>
      <ScrollView>
      <View style = {styles.container}>
        <View style={{marginTop: 10}}>
          <Image style = {{width: 130, height: 130}}
          source={require('../assets/images/blueworks.png')} />
        </View>
        <View style={{marginVertical: 0}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>
                Veuillez entrer votre numero de telephone
              </Text>
                <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  placeholder='phone*'
                  onChangeText={text => this.setState({t: text})}
                  placeholderTextColor='grey'
                />
            </View>
          </View>
          <TouchableOpacity style = {styles.button} onPress={()=>navigate('Accueil')}>
              <Text style = {styles.buttonText}>Payer</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
  inputBox: {
        width: '98%',
        height:45,
        paddingHorizontal: 16,
        fontSize:16,
        color: 'black',
        marginVertical: 30,
        paddingLeft: 15,
        borderRadius: 15,
        borderBottomColor: 'rgb(0, 111, 186)',
        borderBottomWidth: 1
    },
  renvoyerTextCont: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: "row",
        marginVertical: 16
    },
  button: {
        backgroundColor: 'rgb(0, 111, 186)',
        width: 300,
        borderRadius: 25,
        paddingVertical: 13,
        marginBottom: 15
    },
  buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
  renvoyer: {
         color: 'grey',
         fontSize: 15
   },
  signupButton: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '500'
    }
});