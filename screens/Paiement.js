import React from 'react';
import { Text, View, Image, StyleSheet,TextInput,KeyboardAvoidingView,ScrollView, AsyncStorage, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import Api from '../constants/Api';

var axios = require('axios');

export default class ServicesClient extends React.Component{
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35,}} />,
        headerRight: (
          <Text style={{marginRight: 17, color: 'grey', fontSize: 20, fontWeight: 'bold'}}>Paiement</Text>
          )
    }
    async _pay(){
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
        const data = JSON.parse(await AsyncStorage.getItem('rsv'));
        axios.post(Api.baseUrl + '/api.blueworks/reservation', data, config)
        .then(async res => {
          axios.post(Api.baseUrl + '/api.blueworks/reservation/pay', {r: res.data}, config)
            .then(async res => {
              ToastAndroid.show('success', ToastAndroid.LONG);
              this.props.navigation.replace('Historiques', {all:true});
            })
            .catch(err => {
              ToastAndroid.show('echec de paiement', ToastAndroid.LONG);
            });
        })
        .catch(err => {
          ToastAndroid.show('echec', ToastAndroid.LONG);
          navigate(null);
        });
    }
    render(){
      const {params} = this.props.navigation.state;
        return(
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200} enabled>
                <ScrollView>
                    <View style={styles.container}>
                    <Image source={require('../assets/images/paiement.jpg')} style={{ width: '100%', height: 170 }}/>
                    
                        <Text style={styles.text}>Date de Paiement : {new Date().toUTCString()}</Text>
                        <Text style={styles.text}>Montant : {params.prix}</Text>
                        <Text style={{
                          marginVertical: 0,
                          marginLeft: 10,
                          fontSize: 19}}>
                            Numéro de téléphone* :
                        </Text>
                        <TextInput style={styles.numero}
                          autoCorrect={false}
                          keyboardType = {'phone-pad'}
                          placeholder="Entrez votre numero de téléphone"
                          placeholderTextColor="grey"
                          onChangeText={text => this.setState({t: text})}
                        />
                        <View style={{flexDirection: 'row'}}>
                          <Button title="Confirmer"
                          onPress={this._pay.bind(this)}
                            buttonStyle={{backgroundColor: 'rgb(0, 111, 186)'}}
                            titleStyle={{color: 'white'}}
                            containerStyle={{width: '42%', marginLeft: '5%'}}
                          />
                          <Button title="Annuler"
                            onPress={() => this.props.navigation.replace('Reservation')}
                            buttonStyle={{backgroundColor: 'whitesmoke'}}
                            titleStyle={{color: 'rgb(0, 111, 186)'}}
                            containerStyle={{width: '42%', marginLeft: '5%'}}
                          />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        justifyContent: 'center'
    },
    text: {
      marginVertical: 8,
      marginLeft: 10,
      fontSize: 19
    },
    numero: {
      width: '90%',
      marginLeft: 15,
      borderColor: 'grey',
      height:45,
      backgroundColor: 'whitesmoke',
      marginVertical: 20,
      paddingHorizontal: 12,
    }
});