import React from 'react';
import { Text, View, Image, StyleSheet, Picker, Dimensions, ToastAndroid, ScrollView, AsyncStorage} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { List, ListItem, Separator } from 'native-base';
import { Button } from 'react-native-paper';
import { Card } from 'react-native-elements';
import Slideshow from 'react-native-slideshow';
import Api from '../constants/Api';
var axios = require('axios');

export default class Services extends React.Component{
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
    headerRight: (
      <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>{String('Types d\'espaces')}</Text>
    )
  }
  constructor(props){
    super(props);
    this.state = {
      fs: [],
      services: [],
      types: [],
      position: 0,
      interval: null,
      dataSource: []
    };
    this.data = [];
  }
  async componentWillMount() {
    await axios.get(Api.baseUrl + '/api.blueworks/types', {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            }
        })
        .then(async types => {
          this.setState({types: types.data});
          this.setState({t: types.data[0].NOMTYPE});
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.LONG);
        });
  }
  async _asyncIsLoged(cible, params){
    const token = await AsyncStorage.getItem('token');
    const {navigate} = this.props.navigation;
    if(token !== null)
      navigate(cible, params);
    else navigate('Login', {cible: cible, token: token, type: params.type, formule: params.formule});
  }
  async _getFormule(t){
    this.state.services = [];
    axios.get(Api.baseUrl + '/api.blueworks/formules/' + t, {
          params: {},
          headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin' : '*'
          }
      })
      .then(async formules => {
        this.setState({fs : formules.data});
        formules.data.forEach(async f => {
          await axios.get(Api.baseUrl + '/api.blueworks/values/' + f.IDFORMULE, {
            params: {},
            headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin' : '*'
            }
          })
          .then(services => {
            const tmp = this.state.services.concat(services.data);
            this.setState({services: tmp});
            this.setState({ready: true});
          })
          .catch(err => {
            ToastAndroid.show(err, ToastAndroid.LONG);
          });
        });
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.LONG);
      });
  }
  async _getImage(t){
    clearInterval(this.state.interval);
    axios.get(Api.baseUrl + '/api.blueworks/type/' + t, {
          params: {},
          headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin' : '*'
          }
      })
      .then(res => {
        this.setState({descript: res.data.INFO.DESCRIPTION});
        let images = [];
        res.data.IMAGES.map(img => {
          images.push({
            url: img.CONTENU
          });
        });
        this.setState({dataSource: images});
        this.setState({
          interval: setInterval(() => {
            this.setState({
              position: this.state.position === this.state.dataSource.length-1 ? 0 : this.state.position + 1
            });
          }, 5000)
        });
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.LONG);
      });
  }
    _fillAccordion(){
      let items = [];
      this.state.fs.map(f => {
        const data = this.state.services.filter(s => {
          return s.IDFORMULE === f.formule.IDFORMULE;
        });
        items.push(
          <Collapse key={f.formule.IDFORMULE}>
            <CollapseHeader containerStyle={styles.cHeader}>
              <Separator bordered>
                <Text>{f.formule.PERIODE === 0 ? 'Consommation direct' : ( 'Formule ' + ( f.formule.NOM !== null ?
                  f.formule.NOM : f.formule.PERIODE + ' ' + f.formule.UNITE))}</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody>
              {<List>
                  {data.map(item => (
                    item.QUANTITE !== -1 ? <ListItem key={item.formule.IDFORMULE + ' ' + item.NOMSERVICE}><Text>{String(item.NOMSERVICE) + '\t\t\r' + String(item.QUANTITE) + ' ' + String(item.service.UNITE)}</Text></ListItem> :
                    <ListItem key={item.formule.IDFORMULE + ' ' + item.NOMSERVICE}><Text>{String(item.NOMSERVICE)}</Text></ListItem>
                  ))}
                  <ListItem>
                  <View><Text>COUT : {f.PRIX} FCFA</Text></View>
                  </ListItem>
                  <ListItem>
                    <Button onPress={async () => await this._asyncIsLoged('Reservation', {type: this.state.t, formule: f.IDFORMULE})}>Reserver</Button>
                  </ListItem>
                </List>
              }
            </CollapseBody>
          </Collapse>);
      });
      return items;
    }
    render(){
      return(
        <ScrollView>
        <View style={styles.cadre}>
            <View style={{margin: 5}}>
            <Text style={styles.text}>Type de salle</Text>
            <Picker
                selectedValue={this.state.t}
                style={{height: 40, width,color: 'grey'}}
                onValueChange={async (itemValue, itemIndex) =>
                  {
                    this.setState({t: itemValue});
                    await this._getImage(itemValue);
                    await this._getFormule(itemValue);
                  }
                }>
                {this.state.types.map(t=> (
                  <Picker.Item key={t.NOMTYPE} label={t.NOMTYPE} value={t.NOMTYPE} />  
                ))}
            </Picker>
            </View>
                <View style={{width: '96%', marginLeft: '2%',marginTop:5}}>
                    <Slideshow 
                      dataSource={this.state.dataSource}
                      position={this.state.position}
                      onPositionChanged={position => this.setState({ position })} 
                      indicatorColor = 'rgb(0, 111, 186)'
                      scrollEnabled = {false}
                      overlay = {true}
                    />
                    <Text style={{marginBottom: 8, fontSize: 16}}>
                      {this.state.descript}
                    </Text>
                </View>
                <View style={{margin: 5}}>
                {this.state.ready === true ? this._fillAccordion() : null}
                </View>
            </View>
        </ScrollView>
      );
    }
  }
  
  const {width = WIDTH} = Dimensions.get('window')
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cHeader: {
      backgroundColor: "blue"
    },
    reserver: {
      textAlign: "center"
    },
    text: {
        fontSize: 18
    },
    containt: {
      flexDirection: 'row'
    }
  });