import React from 'react';
import { Text, View, Image, StyleSheet, Picker, Dimensions, ToastAndroid, ScrollView} from 'react-native';
import {Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { List, ListItem, Separator } from 'native-base';
import { Button } from 'react-native-paper';
import { Card } from 'react-native-elements';
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
      images: [],
      types: []
    };
    this.services = this.state.services;
  }
  async componentWillMount(){
    axios.get(Api.baseUrl + '/api.blueworks/types', {
            params: {},
            headers: {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            }
        })
        .then(async types => {
          this.setState({types: types.data});
          this.setState({t: types.data[0].NOMTYPE});
          // await this._getImage();
          // this._getFormule();
        })
        .catch(err => {
          ToastAndroid.show(err, ToastAndroid.SHORT);
        });
  }
  async componentDidMount(){
    await this._getImage();
    this._getFormule();
  }
  _getFormule(){
    axios.get(Api.baseUrl + '/api.blueworks/formules/' + this.state.t, {
          params: {},
          headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin' : '*'
          }
      })
      .then(formules => {
        this.setState({fs : formules.data});
        formules.data.forEach(f => {
          axios.get(Api.baseUrl + '/api.blueworks/values/' + f.IDFORMULE, {
            params: {},
            headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin' : '*'
            }
          })
          .then(services => {
            this.setState({services: services.data});
          })
          .catch(err => {
            ToastAndroid.show(err, ToastAndroid.SHORT);
          });
        });
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }
  async _getImage(t){
    axios.get(Api.baseUrl + '/api.blueworks/type/' + t + '/images', {
          params: {},
          headers: {
              'Content-type' : 'application/json',
              'Access-Control-Allow-Origin' : '*'
          }
      })
      .then(images => {
        this.setState({images: images.data});
      })
      .catch(err => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
      });
  }
    _fillAccordion(){
      const {navigate} = this.props.navigation;
      let items = [];
      this.state.fs.map(f => {
        const data = this.state.services.filter(s => {
          return s.IDFORMULE === f.IDFORMULE;
        });
        items.push(
          <Collapse key={f.formule.IDFORMULE}>
            <CollapseHeader containerStyle={styles.cHeader}>
              <Separator bordered>
                <Text>{'Formule ' + ( f.formule.PERIODE === 0 ? 'Consommation direct' : ( f.formule.NOM !== null ?
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
                    <Button onPress={() => navigate('Reservation', {type: this.state.t, formule: f.IDFORMULE})}>Reserver</Button>
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
                    await this._getImage();
                    this._getFormule();
                  }
                }>
                {this.state.types.map(t=> (
                  <Picker.Item key={t.NOMTYPE} label={t.NOMTYPE} value={t.NOMTYPE} />  
                ))}
            </Picker>
            </View>
                <View>
                  <Card
                    containerStyle={{marginVertical: 8}}
                    image={require('../assets/images/blueworks.png')}
                    >
                      <Text style={{marginBottom: 8, fontSize: 16}}>
                        Nouvelle salle de reunion disponible, avec de nouveaux services
                      </Text>
                  </Card>
                </View>
                <View style={{margin: 5}}>
                {this._fillAccordion()}
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