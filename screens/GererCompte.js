import React from 'react';
import{  Text, View, StyleSheet, Image, Dimensions, ScrollView, AsyncStorage, ToastAndroid } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
var axios = require('axios');

export default class GererCompte extends React.Component{
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
        headerRight: (
          <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Mon Profil</Text>
          )
    }
    constructor(props){
        super(props);
        this.state = {};
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
    async componentWillMount() {
        const token = await AsyncStorage.getItem('token');
        axios.get(Api.baseUrl + '/api.blueworks/account/my-account', {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Authorization': 'Bearer ' + token,
                'b-action': 'READ',
                'ressource': 'utilisateur'
            }
        })
        .then(user => {
            this.setState({e: user.data.EMAIL});
            this.setState({ps: user.data.PSEUDO});
            this.setState({n: user.data.NOM});
            this.setState({p: user.data.PRENOM});
            this.setState({t: user.data.PHONE});
            this.setState({url: user.data.PHOTO});
            this.setState({en: user.data.ENTREPRISE});
            this.setState({f: user.data.ENTREROLE});
            this.setState({d: user.data.ANNIV});
        })
        .catch(async err => {
            if (err.response.status === 403) {
                const crd = await this._askNewToken();
                if(crd != null){
                  await AsyncStorage.setItem('token', crd);
                }
                else navigate('Login', {cible: 'Reservation', back: true});
            }
            ToastAndroid.show(err, ToastAndroid.LONG);
        });
    }
    _computeAvantar(){
        const first = String(this.state.n).split('')[0].toLocaleUpperCase();
        const second = String(this.state.p).split('')[0].toLocaleUpperCase();
        const avatar = first + '' + second;
        return <Avatar rounded title={avatar} size="large" containerStyle={{marginLeft: 40, marginTop: -40}}/>;
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={{position: 'relative', zIndex: 0}}>
                        <Card
                            containerStyle={{marginVertical: 8, justifyContent: 'center', height: 130, backgroundColor: 'rgb(0, 111, 186)'}}
                            
                            >
                                <Text style={{color: 'white', textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Blue WorkS</Text>
                        </Card>
                    </View>
                        <View style={{position: 'relative', zIndex: 1}}>
                            {this._computeAvantar()}
                        </View>
                        <View style={{marginLeft: 40}}>
                            <Text style={{fontSize: 20, }}>{this.state.ps}</Text>
                        </View>
                        <Button title="Completer mon profil" onPress={() => navigate('ModifierCompte', {user: this.state})} containerStyle={{width: 170, height: 45, justifyContent: 'space-between', marginLeft: 150}}/>
                        <View style={{marginTop: -15, marginVertical: 5}}>
                        <Card
                            containerStyle={{marginVertical: 8, height: 245}}
                            >
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/mail.png')} style= {{height: 22,width: 22}} />
                                <Text style={styles.name}> Email</Text>
                            </View>
                            <Text style={styles.value}>{this.state.e}</Text>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/call.png')} style= {{height: 22,width: 22}}/>
                                <Text style={styles.name}> Telephone</Text>
                            </View>
                            <Text style={styles.value}>{this.state.t}</Text>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/cont.png')} style= {{height: 22,width: 22}}/>
                                <Text style={styles.name}> Prenom</Text>
                            </View>
                            <Text style={styles.value}>{this.state.p}</Text>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/cont.png')} style= {{height: 22,width: 22}}/>
                                <Text style={styles.name}> Nom</Text>
                            </View>
                            <Text style={styles.value}>{this.state.n}</Text>
                        </Card>
                        <Card
                        containerStyle={{marginVertical: 8, height: 190}}>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/organisation.png')} style= {{height: 22,width: 22}}/>
                                <Text style={styles.name}> Entreprise</Text>
                            </View>
                            <Text style={styles.value}>{this.state.en === null ? 'n/a' : this.state.en}</Text>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/role.png')} style= {{height: 22,width: 22}}/>
                                <Text style={styles.name}> Fonction</Text>
                            </View>
                            <Text style={styles.value}>{this.state.f === null ? 'n/a' : this.state.f}</Text>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/birthday.png')} style= {{height: 22,width: 22}}/>
                                <Text style={styles.name}> Date anniversaire</Text>
                            </View>
                            <Text style={styles.value}>{this.state.d === null ? 'inconnue' : this.state.d}</Text>
                        </Card>
                        </View>
                    <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pseudo: {
        fontSize: 18,
        marginLeft: 100
    },
    name: {
        fontSize: 16
    },
    value: {
        marginVertical: 2,
        fontSize: 15,
        marginLeft: 22,
        color: 'grey'
    },
    sousTitre: {
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 15
    }
   
});