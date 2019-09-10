import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    AppRegistry
} from 'react-native';
import { Button } from 'react-native-elements';

export default class Couverture extends React.Component{
    static navigationOptions = {
        header: null,
    }
    render(){
        return(
            <ImageBackground source={require('../assets/images/background1.jpeg')} style={{}}>
            <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={true}>
                <View style={styles.container}>
                    <View style={styles.cardlogo}>
                        <Image source={require('../assets/images/blueworks.png')} style={{height: 150, width: 150}} />
                        <Text style={styles.slogan}>Great places to focus on what matters...</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={{textAlign: 'center', margin: 2, color: 'white', fontWeight: '500', fontSize: 16}}>
                        Blue WorkS est ensemble d'espace de travail partagé ou se rencontrent Startups, TPE et PME. Nous 
                        vous offrons un environnement stimulant sans hiérachie, sans compétition, sans politique...
                        bref, un cadre convivial et cosy.
                    </Text>
                    </View>
                    <View style={{flexDirection: 'row', top: '-3%'}}>
                        <Image source={require('../assets/images/led1.png')} style={{marginRight: 2, width: 15, height: 15}} />
                        <Image source={require('../assets/images/led2.png')} style={{marginLeft: 2, width: 15, height: 15}}/>
                    </View>
                </View>
                <View style={styles.container}>
                    <Button title="Embarquez" onPress={()=> this.props.navigation.replace('Accueil')} containerStyle={{position: 'absolute',top: 100, width: 300}} />
                    <View style={styles.cardlogo1}>
                        <Text style={styles.slogan1}>Great places to focus on what matters...</Text>
                        <Text style={{textAlign: 'center', fontSize: 16, color: 'rgb(227,207,50)', fontWeight: '500'}}>www.blueworkspaces.com</Text>
                    </View>
                    <View style={styles.description1}>
                        <Text style={{textAlign: 'center', margin: 2, color: 'white', fontWeight: '500', fontSize: 16}}>
                        Blue WorkS vous donne la possibilité de choisir votre espace de travail et de bénéficier de tous les avantages d'un bureau
                        emménagé. En devenant Blue Worker, vous intégrez une communauté qui vous ressemble et qui vous appartient, une communauté
                        capable de se soutenir et de s'enrichir
                        </Text>
                        <Text style={{textAlign: 'center', margin: 2, color: 'white', fontWeight: '500', fontSize: 16}}>
                        Embarquez!!! Connectez vous au reste de la communauté et bénéficiez de nombreuse option tous les jours.
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', top: '-3%'}}>
                        <Image source={require('../assets/images/led2.png')} style={{marginRight: 2, width: 15, height: 15}} />
                        <Image source={require('../assets/images/led1.png')} style={{marginLeft: 2, width: 15, height: 15}}/>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
        );
    }
}
const {width = WIDTH} = Dimensions.get('window')
const {height = HEIGHT} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        alignItems: 'center',
        width,
        height,
        justifyContent: 'flex-end',
    },
    description: {
        justifyContent: 'flex-end',
        top: '-5%'
    },
    description1: {
        justifyContent: 'flex-end',
        top: '-5%'
    },
    slogan: {
        color: 'rgb(227,207,50)',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    slogan1: {
        color: 'rgb(227,207,50)',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cardlogo: {
        top: -230,
        alignItems: 'center'
    },
    cardlogo1: {
        top: -170,
        alignItems: 'center'
    }

});

AppRegistry.registerComponent('Couverture', ()=>Couverture);