import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, ToastAndroid, Image} from 'react-native';
import { Table, Row, Rows} from 'react-native-table-component';
import { Card } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      this.token = null;
    }
    async componentWillMount(){
      const {params} = this.props.navigation.state;
      
      this.setState({type: params.type});
      this.setState({rsv: params.rsv});
      if(params.opt !== undefined)
        this.setState({opt: true});
      this._getConsommation();
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
        this.setState({description: res.data.DESCRIPTION});
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
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
          ToastAndroid.show(err, ToastAndroid.SHORT);
        });
    }
    _getRemainingTime(){
      console.log(new Date(Date.now()));
      return <Text>YO</Text>
    }
    render() {
        return (
          <ScrollView>
          <View>
            <Card
              containerStyle={{marginVertical: 8}}
              image={require('../assets/images/img.jpg')}
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
          {
            this.state.opt !== undefined ?
            <View>
            <TouchableOpacity onPress={() => this.props.navigation('Code', {rsv: this.state.rsv})}><Text>Payer toute suite</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.replace('historiques', {all: true})}><Text>Payer plus tard</Text></TouchableOpacity>
            </View> : null
          }
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
          </ScrollView>
        )
      }
    }
     
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#fff', padding: 5, margin: 5 },
      head: { height: 40, backgroundColor: '#f1f8ff' },
      text: { margin: 6 }
    });