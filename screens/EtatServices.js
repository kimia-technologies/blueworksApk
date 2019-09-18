import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, ToastAndroid, Image} from 'react-native';
import { Table, Row, Rows} from 'react-native-table-component';
import { Card } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';

var axios = require('axios');
export default class EtatServices extends Component {
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Etat consommation</Text>
    )
  }
    constructor(props) {
      super(props);
      this.state = {
        tableHead: ['Service', 'Quantite restante (consommation)'],
        services: []
      };
    }
    async componentWillMount(){
      const {params} = this.props.navigation.state;
      
      this.setState({type: params.type});
      this.setState({rsv: params.rsv});
      if(params.opt !== undefined)
        this.setState({opt: true});
      this._getConsommation();
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
    componentDidMount(){
      const {params} = this.props.navigation.state;
      axios.get(Api.baseUrl + '/api.blueworks/type/' + params.type, {
        params: {},
        headers: {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        }
      })
      .then(res => {
        this.setState({description: res.data.INFO.DESCRIPTION});
        this.setState({images: res.data.IMAGES[0].CONTENU});
      })
      .catch(async err => {
        const {navigate} = this.props.navigation;
        if (err.response.status === 403) {
          const crd = await this._askNewToken();
          if(crd != null){
            await AsyncStorage.setItem('token', crd);
          }
          else navigate('Login', {cible: 'Historique'});
        }
      });
    }
    async _getConsommation(){
      const token = await AsyncStorage.getItem('token');
      axios.get(Api.baseUrl + '/api.blueworks/reservation/r=' + this.state.rsv + '/services', {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Authorization' : 'Bearer ' + token,
                'b-action' : 'READ',
                'ressource' : 'service'
            }
        })
        .then(res => {
          let service = [];
            res.data.map(s => {
              service.push(s.QUANTITE !== -1 ? [s.NOMSERVICE + ' ( ' + s.QUANTITE + ' ' + s.UNITE + ' )', String(s.PROGRESSION) + ' % ( ' +
              s.CONSOME + ' ' + s.UNITE + ' )'] : [s.NOMSERVICE, <Image style={{height:25, width:25, marginLeft:15}} source={require('../assets/images/allowed.png')} />]);
          });
          this.setState({services: service});
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.LONG);
        });
    }
    _getRemainingTime(){
      return <Text>YO</Text>
    }
    render() {
        return (
          <ScrollView>
          <View>
            <Card
              containerStyle={{marginVertical: 8}}
              image={{uri: this.state.images}}
            >
              <View style={{marginBottom: 8, fontSize: 16}}>
                <Text>{this.state.type}</Text>
                <Text>{this.state.description}</Text>
              </View>
            </Card>
          </View>
          <View style={styles.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={this.state.services} textStyle={styles.text}/>
            </Table>
          </View>
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
          </ScrollView>
        )
      }
    }
     
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#fff', padding: 5, margin: 5 },
      button: {
            backgroundColor: 'rgb(0, 111, 186)',
            width: 300,
            borderRadius: 25,
            paddingVertical: 13,
            marginBottom: 6
        },
      head: { height: 40, backgroundColor: '#f1f8ff' },
      text: { margin: 6 }
    });