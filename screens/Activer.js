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
import Spinner from 'react-native-loading-spinner-overlay';
import Api from '../constants/Api';
var axios = require('axios');

export default class Code extends React.Component{
  static navigationOptions = {
    drawerIcon: (
      <Image source = {require('../assets/images/key.png')}
      style={{height: 26, width: 26}} />
    ),
    title : "Activer son compte"
  }
  constructor(props){
    super(props);
    this.state = {
      spinne: false
    };
  }
  componentWillMount(){
    const {params} = this.props.navigation.state;
    if(params !== undefined){
      this.setState({e: params.email});
      this.setState({cible: params.cible});
    }
  }
  async _asyncActivate(){
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
    if(data.e !== undefined) {
      this.setState({spinne: true});
      await axios.post(Api.baseUrl + '/api.blueworks/activate/account', data, config)
      .then(res => {
        this.setState({spinne: false});
        ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
        if(res.data.msg === 'activation reussite') {
          if(this.state.cible !== undefined)
            this.props.navigation.replace('Login', {cible: this.state.cible});
          else navigate('Home');
        }
      })
      .catch(err => {
        this.setState({spinne: false});
        ToastAndroid.show(' ' + err, ToastAndroid.LONG);
      });
    } else ToastAndroid.show('Veuillez remplir les champs', ToastAndroid.LONG);
  }
  render() {
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
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        onChangeText = {text => this.setState({e: text})}
                        value={this.state.e} />
            </View>
            <View>
            <Text style={{
                          marginLeft: '5%',
                          fontSize: 19}}>
                            Code* :
                        </Text>
                        <TextInput style={styles.numero} placeholder="Entrez le code reçu par mail" placeholderTextColor="grey"
                        autoCorrect = {false}
                        keyboardType = {'phone-pad'}
                        onChangeText = {text => this.setState({c: text})}
                        value={this.state.c} />
             </View>
        </View>
        <Spinner
        visible={this.state.spinne}
        color="rgb(0, 111, 186)"
        textContent={''}
        />
          <TouchableOpacity style = {styles.button} onPress={this._asyncActivate.bind(this)}>
              <Text style = {styles.buttonText}>Valider</Text>
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