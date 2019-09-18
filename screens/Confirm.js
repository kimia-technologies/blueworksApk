import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, ToastAndroid, Image} from 'react-native';
import { Table, Row, Rows} from 'react-native-table-component';
import { Card } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
import { TouchableOpacity } from 'react-native-gesture-handler';

var axios = require('axios');
export default class Confirm extends Component {
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Services</Text>
    )
  }
    constructor(props) {
      super(props);
      this.state = {
        tableHead: ['Service', 'Quantite'],
        services: []
      };
      this.token = null;
    }
    async componentWillMount(){
      const {params} = this.props.navigation.state;
      await axios.get(Api.baseUrl + '/api.blueworks/values/' + params.f, {
        params: {},
        headers: {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        }
      })
      .then(async res => {
        let fs = [];
        res.data.map(s => {
          fs.push([s.NOMSERVICE, s.QUANTITE !== -1 ? String(s.QUANTITE) + ' ' + String(s.service.UNITE):
              <Image style={{height:25, width:25, marginLeft:15}} source={require('../assets/images/allowed.png')} />
          ]);
        });
        this.setState({services: fs});
        await this._fill();
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.LONG);
      });
    }
    async _fill(){
      const {params} = this.props.navigation.state;
      await axios.get(Api.baseUrl + '/api.blueworks/type/info/' + params.t + '/' + params.f, {
        params: {},
        headers: {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        }
      })
      .then(res => {
        this.setState({nom: res.data.INFO.NOMTYPE});
        this.setState({description: res.data.INFO.DESCRIPTION});
        this.setState({images: res.data.IMAGES[0].CONTENU});
        this.setState({prix: res.data.PRIX});
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.LONG);
      });
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
        const data = JSON.parse(await AsyncStorage.getItem('rsv'));
        axios.post(Api.baseUrl + '/api.blueworks/reservation', data, config)
        .then(async res => {
          ToastAndroid.show('success', ToastAndroid.LONG);
          await AsyncStorage.removeItem('rsv');
          navigate('Historiques', {all:true});
        })
        .catch(err => {
          ToastAndroid.show('echec', ToastAndroid.LONG);
          navigate();
        });
    }
    render() {
        return (
          <ScrollView>
          <View>
            <Card
            containerStyle={{marginVertical: 8}}
            image={{uri: this.state.images}}
            >
            <Text>{this.state.nom}</Text>
            <Text>{this.state.description}</Text>
          </Card>
          </View>
          <View style={styles.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={this.state.services} textStyle={styles.text}/>
            </Table>
          </View>
          <View style={styles.prix}><Text>prix de la reservation : {this.state.prix} FCFA</Text></View>
          <TouchableOpacity style = {styles.button} onPress={() => this.props.navigation.replace('Paiement', {prix: this.state.prix})}><Text style={styles.buttonText}>Payer maintenant</Text></TouchableOpacity>
          <TouchableOpacity style = {styles.button1} onPress={this._asyncBook.bind(this)}><Text style={styles.buttonText}>Payer plus tard</Text></TouchableOpacity>
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
          </ScrollView>
        );
      }
    }
     
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        margin: 5
      },
      prix:{
        alignSelf: "center",
        marginVertical: 10,
        textAlign: "center"
      },
      buttonText:{
            fontSize: 16,
            fontWeight: '500',
            color: 'white',
            textAlign: 'center',
        },
      button: {
            alignSelf: "center",
            backgroundColor: 'rgb(0, 111, 186)',
            width: 300,
            borderRadius: 25,
            paddingVertical: 13,
            marginBottom: 6
        },
        button1: {
              alignSelf: "center",
              backgroundColor: 'silver',
              width: 300,
              borderRadius: 25,
              paddingVertical: 13,
              marginBottom: 6
          },
      head: { height: 40, backgroundColor: '#f1f8ff' },
      text: { margin: 6 }
    });