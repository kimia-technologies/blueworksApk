import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Styles from '../constants/Styles';

export default class GererServices extends React.Component{
  static navigationOptions = {
    headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
        headerRight: (
          <Text style={{marginRight: 17,  color: 'grey', fontSize: 20, fontWeight: 'bold'}}>Nos Services</Text>
          )
}
async _goTo(screen){
  const {navigate} = this.props.navigation;
  navigate(screen);
}
  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => this._goTo('Services')}>
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center', backgroundColor: 'whitesmoke', marginTop: 12}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'black'}}>Types d'espaces</Text>
                <Avatar rounded size="large" source={require('../assets/images/domicile.png')} containerStyle={{}}/>
              </View>
              <View style={{}}>
                <Text style={{margin: 2, textAlign: 'center', color: 'grey', fontWeight: '300', fontSize: 17}}>
                        Espaces de travail conviviaux, Accès à Internet, Boissons froides &
                        chaudes, Impressions & Photocopies, Courses Urbaines et Interurbaines,
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => await this._goTo('Services')}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'whitesmoke', marginTop: 16}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{ fontSize: 21, fontWeight: 'bold', color: 'black'}}>Domiciliation d'entreprise</Text>
                <Avatar rounded size="large" source={require('../assets/images/type.png')} containerStyle={{}}/>
              </View>
              <View>
                <Text style={{margin: 2, textAlign: 'center', color: 'grey', fontWeight: '300', fontSize: 17}}>
                        Services à valeur ajoutée: domiciliation de l’entreprise, réception et
                        routage d’appels, services de télécom, accompagnement et assistance à
                        la performance de l’entreprise, assurances, financiers…
                </Text>
              </View>
            </View>
            </TouchableOpacity>
            </ScrollView>
          <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
      </View>
    );
  }
}
const {width = WIDTH} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  }
});