import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Card, Badge, ToastAndroid } from 'react-native-elements';
import Styles from '../constants/Styles';
import Api from '../constants/Api';
var axios = require('axios');


export default class Historiques extends React.Component{
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Historiques</Text>
    )
  }
    constructor(propos){
      super(propos);
      this.state = {
        rsv: []
      };
    }
    async componentWillMount(){
      const {params} = this.props.navigation.state;
      const token = await AsyncStorage.getItem('token');
      axios.get(Api.baseUrl + '/api.blueworks/reservation/my-books', {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Authorization' : 'Bearer ' + token,
                'b-action' : 'READ',
                'ressource' : 'reservation'
            }
        })
        .then(rsv => {
          let rsvs;
          if(params === undefined){
            rsvs = rsv.data.filter(r => {
              return r.ETAT === 1;
            });
          } else {
            this.setState({p: true});
            rsvs = rsv.data;
          }
          this.setState({rsv: rsvs});
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.SHORT);
        });
    }
    render(){
      const { navigate } = this.props.navigation;
        return(
          <View style={styles.container}>
            <ScrollView>
                {
                  this.state.rsv.length === 0 ? <View style={{marginTop: 70, alignItems: 'center'}}>
                    <Image source={require('../assets/images/empty.png')} />
                    <Text style={{fontSize: 17}}>{this.state.p === false ? String('Vous n\'avez aucune reservation') : 
                    String('Vous n\'avez aucune reservation en cours')}</Text>
                  </View> :
                  this.state.rsv.map(r => (
                    <TouchableOpacity key={r.IDRESERVATION} style={{width :'100%'}}
                      onPress={() => navigate('EtatServices', {rsv: r.IDRESERVATION, type: r.espace.NOMTYPE})}>
                          <Card containerStyle={{width:330, marginVertical: 8,shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 4.65,
                      elevation: 2}
                    }>
                         <Badge
                            status = { r.ETAT === -1 ? "error" : "warning" && r.ETAT === 0 ? "warning" : "success"}
                            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                          />
                              <Text>Type: {r.espace.NOMTYPE}</Text>
                              <Text>Formule: {r.formule.PERIODE === 0 ? 'Consommation direct' : r.formule.PERIODE + ' '+ r.formule.UNITE}</Text>
                              <Text>DATE: {r.JOUR}</Text>
                              <Text style={styles.heure}>{r.createdAt}</Text>
                          </Card>
                    </TouchableOpacity>
                  ))
                }
            </ScrollView>
            <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'whitesmoke'
      },
      entete: {
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 17,
          color: 'grey'
      },
      heure: {
        textAlign: 'right'
      }
});