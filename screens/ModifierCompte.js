import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import {Avatar} from 'react-native-elements';
import DatePicker from "react-native-datepicker";
import Styles from '../constants/Styles';
import Api from '../constants/Api';

var axios = require('axios');

export default class ModifierCompte extends React.Component{
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Completer mon Profil</Text>
    )
  }
  constructor(props){
    super(props);
    const {params} = this.props.navigation.state;
    this.state = params.user;
  }
  componentDidMount(){
    this.setState({isDateTimePickerVisible: false});
  }
  async _askNewToken(){
      const config = {
        headers: {
          'Content-type' : 'application/json',
          'Access-Control-Allow-Origin' : '*'
        }
      };
      const data = {
        e: await AsyncStorage.getItem('email'),
        t: await AsyncStorage.getItem('refreshToken')
      };
      const token = axios.post(Api.baseUrl + '/api.blueworks/token/', data, config)
      .then(res => {
        return res.data.token;
      })
      .catch(err => {
        return null;
      });
      return token;
  }
  async _asyncUpdate(){
    const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          'Content-type' : 'application/json',
          'Access-Control-Allow-Origin' : '*',
          'Authorization' : 'Bearer ' + token,
          'b-action' : 'UPDATE',
          'ressource' : 'utilisateur'
        }
      };
      axios.patch(Api.baseUrl + '/api.blueworks/account/my-account', this.state, config)
      .then(res => {
        ToastAndroid.show('success', ToastAndroid.LONG);
        this.props.navigation.replace('GereCompte');
      })
      .catch(async err => {
        ToastAndroid.show('echec', ToastAndroid.LONG);
      });
  }
  _computeAvantar(){
      const color = ['green', 'blue', 'grey', 'black', 'yellow'];
      const alpha = ['A', 'F', 'K', 'P', 'U', 'B', 'G', 'L', 'Q', 'V', 'C', 'H', 'M', 'R',
          'W', 'D', 'I', 'N', 'S', 'X', 'E', 'J', 'O', 'T', 'Y', 'Z'];
      
      const first = String(this.state.n).split('')[0].toLocaleUpperCase();
      const second = String(this.state.p).split('')[0].toLocaleUpperCase();
      const dist = (alpha.indexOf(second) + alpha.indexOf(first))%5;
      const avatar = first + '' + second;
      return <Avatar rounded title={avatar} size="xlarge" containerStyle={{backgroundColor: 'black'}}/>;
  }
  render(){
    return(
    <ScrollView>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style = {styles.container}>
        <View style={{marginVertical: 0}}>
          <View style={{marginTop: 10, alignItems: "center"}}>
            {this._computeAvantar()}
          </View>
            <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Pseudo</Text>
                <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  onChangeText = {text => this.setState({ps: text})}
                  value={this.state.ps}
                />
            </View>
            <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Prenom</Text>
                <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  onChangeText = {text => this.setState({p: text})}
                  value={this.state.p}
                />
            </View>
              <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Nom</Text>
                  <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  onChangeText = {text => this.setState({n: text})}
                  value={this.state.n}
                  />
              </View>
              <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Numero</Text>
                  <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  onChangeText = {text => this.setState({t: text})}
                  value={this.state.t}
                  />
              </View>
              <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Entreprise</Text>
                  <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  onChangeText = {text => this.setState({o: text})}
                  value={this.state.o}
                  />
              </View>
              <View>
              <Text style={{fontSize: 16, color: 'grey', marginLeft: 10, top: 20}}>Role dans l'entreprise</Text>
                  <TextInput style = {styles.inputBox}
                  underlineColorAndroid = 'transparent'
                  onChangeText = {text => this.setState({r: text})}
                  value={this.state.r}
                  />
              </View>
            </View>
            <View style={styles.cadre}>
                <Text style={styles.text}>Date</Text>
                <TouchableOpacity>              
                    <DatePicker
                      style={{width}}
                      date={this.state.j} //initial date from state
                      mode="date" //The enum of date, datetime and time
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="2016-01-01"
                      confirmBtnText="Valider"
                      cancelBtnText="Annuler"
                      customStyles={{
                        dateIcon: {
                          height: 0,
                          width: 0
                        },
                        dateText: {
                          fontSize: 16,
                          color: 'grey'
                        },
                        dateInput: {
                          borderWidth: 0,
                          borderBottomColor: 'rgb(0, 111, 186)',
                          height:30
                        }
                      }}
                      onDateChange={(date) => {this.setState({j: date})}}
                    />
                </TouchableOpacity>
            </View>
          <TouchableOpacity style = {styles.button} onPress={this._asyncUpdate.bind(this)}>
              <Text style = {styles.buttonText}>Valider</Text>
          </TouchableOpacity>
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
      </View>
      </KeyboardAvoidingView>
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
  text: {
      fontSize: 18,
      color: 'grey',
      marginLeft: 17
  },
  cadre:{
      borderBottomWidth: 1,
      borderBottomColor: 'silver'
  },
  logoTxt: {
      marginVertical: 0,
      color: 'black',
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center'
  },
  inputBox: {
        width: 350,
        height:45,
        paddingHorizontal: 16,
        fontSize:16,
        color: 'black',
        marginVertical: 5,
        paddingLeft: 15,
        borderRadius: 15,
        borderBottomColor: 'rgb(0, 111, 186)',
        borderBottomWidth: 1
    },
  button: {
        backgroundColor: 'rgb(0, 111, 186)',
        width: 300,
        borderRadius: 25,
        paddingVertical: 13,
        marginBottom: 15,
        marginVertical: 10
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
   }
});