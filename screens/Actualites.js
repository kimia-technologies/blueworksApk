import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { Card } from 'react-native-elements';
import Styles from '../constants/Styles';

export default class Actualites extends React.Component{
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
        headerRight: (
          <Text style={{marginRight: 20, color: 'grey', fontSize: 20, fontWeight: 'bold'}}>Bons plans</Text>
        )
    }
    render(){
      const {navigate} = this.props.navigation;
      return(
        <View style={styles.container}>
                <ScrollView>
                <TouchableOpacity onPress={()=> navigate('Detail')}>
                    <Card
                        containerStyle={{marginVertical: 8}}
                        image={require('../assets/images/img.jpg')}
                        >
                        <Text style={{marginBottom: 8, fontSize: 16}}>
                            Nouvelle salle de reunion disponible, avec de nouveaux services
                        </Text>
                        <Text style={{color: 'grey', textAlign: 'right'}}>
                           il y'a 5 min
                        </Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                <Card containerStyle={{marginVertical: 8}}>
                    <Text style={{marginBottom: 8, fontSize: 16}}>
                        Vous pouvez desormais collaborer avec d'autres utilisateurs sur un theme commun, il vous suffit juste de 
                        rejoindre ou de creer un groupe
                    </Text>
                    <Text style={{color: 'grey', textAlign: 'right'}}>il y'a 12h</Text>
                </Card>
                </TouchableOpacity>
                <Card
                    containerStyle={{marginVertical: 8}}
                        image={require('../assets/images/co.jpg')}
                        >
                    <Text style={{marginBottom: 8, fontSize: 16}}>
                        un nouvel espace partagé Bientot disponible
                    </Text>
                    <Text style={{color: 'grey', textAlign: 'right'}}>
                        Le 25/08/2019,16h
                    </Text>
                </Card>
                <Card containerStyle={{width: '96%', marginVertical: 8}}>
                    <Text style={{marginBottom: 8, fontSize: 16}}>
                        La communauté blueworks vous invites a prendre part a la soirée de gala organisé par ...qui se tient 
                        a l'hotel de ville le 02/09/2019 a partir de 20h
                    </Text>
                    <Text style={{color: 'grey', textAlign: 'right'}}>Le 20/08/2019,12h</Text>
                </Card>
            <Text style={Styles.slogan}>Great places to focus on what matters...</Text>
        </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,

    }
  });