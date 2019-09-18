import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  Image,
  ToastAndroid,
  Picker,
} from 'react-native';
import DatePicker from "react-native-datepicker";
import Api from '../constants/Api';
var axios = require('axios');

export default class Reservation extends React.Component{
    static navigationOptions = {
      headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
        headerRight: (
          <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Reserver</Text>
        )
    }
    constructor(props) {
        super(props);
        this.state = {
          types: [],
          formules: [],
          inv: [],
          isDateTimePickerVisible: false,
          h: '08h - 14h'
        };
        this.data = {};
      }
    componentWillMount(){
      axios.get(Api.baseUrl + '/api.blueworks/types', {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            }
        })
        .then(types => {
          this.setState({types: types.data});
          this._getFormule(types.data[0].NOMTYPE);
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.LONG);
        });
    }
    componentDidMount(){
      const {params} = this.props.navigation.state;
      if(params !== undefined) {
        if(params.type !== undefined && params.formule !== undefined){
          this.setState({t: params.type});
          this.setState({f: params.formule});
        }
      }
    }
    _getFormule(t){
      axios.get(Api.baseUrl +'/api.blueworks/formules/' + t, {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            }
        })
        .then(formules => {
          this.setState({formules : formules.data});
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.LONG);
        });
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
    async _asyncBook(){
      const {navigate} = this.props.navigation;
      const token = await AsyncStorage.getItem('token');
        const config = {
          headers: {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Authorization' : 'Bearer ' + token,
            'b-action' : 'CREATE',
            'ressource' : 'reservation'
          }
        };
        const data = {
          f: this.state.f,
          t: this.state.t,
          j: this.state.j,
          i: this.state.i,
          h: this.state.h
        };
        if(data.j === undefined)
          ToastAndroid.show('Veuillez renseigner la date', ToastAndroid.LONG);
        else {
          await AsyncStorage.setItem('rsv', JSON.stringify(data));
          axios.post(Api.baseUrl + '/api.blueworks/reservation/verify', data, config)
          .then(async res => {
            navigate('Confirm', {t: this.state.t, f: this.state.f});
          })
          .catch(async err => {
            if(err.response.status === 404)
              ToastAndroid.show('Aucun espace de ce type libre', ToastAndroid.LONG);
            else if (err.response.status === 403) {
              const crd = await this._askNewToken();
              if(crd != null){
                await AsyncStorage.setItem('token', crd);
                navigate('Confirm', {t: this.state.t, f: this.state.f});
              }
              else navigate('Login', {cible: 'Reservation', back: true});
            }
            else ToastAndroid.show('Vous avez deja une reservation pour ce jour', ToastAndroid.LONG);
          });
        }
    }
  render(){
    return(
          <View style = {styles.container}>
            <View style={{marginVertical: 10}}>
                <View style={styles.cadre}>
                    <Text style={styles.text}>Type de salle</Text>
                    <Picker
                        selectedValue={this.state.t}
                        style={{height: 40, width,color: 'grey'}}
                        onValueChange={(itemValue, itemIndex) =>
                          {
                            this.setState({t: itemValue});
                            itemValue.indexOf('Open') !== -1 ? this.setState({inv: [1]}) : ( itemValue.indexOf('Meeting') !== -1 ?
                              this.setState({inv: Array.from({length: 30},(x, i) => i + 1)}) :
                                this.setState({inv: Array.from({length: 5},(x, i) => i + 1)}));
                            this._getFormule(itemValue);
                          }
                        }>
                        {this.state.types.map(t=> (
                          <Picker.Item key={t.NOMTYPE} label={t.NOMTYPE} value={t.NOMTYPE} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.cadre}>
                    <Text style={styles.text}>Formule</Text>
                    <Picker
                        selectedValue={this.state.f}
                        style={{height: 40, width,color: 'grey'}}
                        onValueChange={(itemValue, itemIndex) =>
                          {
                            this.setState({f: itemValue});
                            itemValue === 1 ? this.setState({en: true}) : this.setState({en: false});
                          }
                        }>
                        {this.state.formules.map(f => (
                          <Picker.Item key={f.IDFORMULE} label={( f.formule.PERIODE === 0 ? 'Consommation direct' :
                            ( f.formule.NOM !== null ? f.formule.NOM : f.formule.PERIODE + ' ' + f.formule.UNITE))}
                              value={f.IDFORMULE} />  
                        ))}
                    </Picker>
                </View>
                {
                  this.state.en === true ? 
                  <View style={styles.cadre}>
                      <Text style={styles.text}>Tranche horaire</Text>
                      <Picker
                          selectedValue={this.state.h}
                          style={{height: 40, width,color: 'grey'}}
                          onValueChange={(itemValue, itemIndex) =>
                                this.setState({h: itemValue})
                          }>
                          <Picker.Item key="1" label="08h - 14h" value="08h - 14h" />
                          <Picker.Item key="2" label="14h - 20h" value="14h - 20h" /> 
                      </Picker>
                  </View> : null
                }
                <View style={styles.cadre }>
                    <Text style={styles.text}>Nombre d'invité</Text>
                    {<Picker
                        selectedValue={this.state.i}
                        style={{height: 40, width,color: 'grey'}}                        
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({i: itemValue})
                        }>
                        {this.state.inv.map(i => (
                          <Picker.Item key={String(i)} label={String(i)} value={i} />
                        ))}
                      </Picker>
                    }
                </View>
                <View style={styles.cadre}>
                    <Text style={styles.text}>Date</Text>
                    <TouchableOpacity style={{}}>              
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
                              color: "grey",
                              fontSize: 16
                            },
                            dateInput: {
                              borderWidth: 0,
                              height:30
                            }
                          }}
                          onDateChange={(date) => {this.setState({j: date})}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
                
              <TouchableOpacity style = {styles.button} onPress={this._asyncBook.bind(this)}>
                  <Text style = {styles.buttonText}>Valider</Text>
              </TouchableOpacity>

          </View>
    );
  }
}
const {width = WIDTH} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
        backgroundColor: 'rgb(0, 111, 186)',
        width: 330,
        borderRadius: 25,
        paddingVertical: 13,

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
  buttonText:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        padding: 5
    },
    cadre:{
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
    }
});