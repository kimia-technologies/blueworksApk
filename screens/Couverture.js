import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    AppRegistry,
    TouchableNativeFeedback
} from 'react-native';
import { Button } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class Couverture extends React.Component{
    static navigationOptions = {
        header: null,
    }
    componentDidMount() {
        lor(this);
      }
      
      componentWillUnmount() {
        rol();
      }
    render(){
        const {replace} = this.props.navigation;
        return(
            <ImageBackground source={require('../assets/images/bac1.jpeg')} style={{}}>
            <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={true}>
                <View style={styles.container}>
                    <View style={styles.entete}>
                        <TouchableNativeFeedback>
                        <Button raised title="Embarquez!!!" onPress={()=> replace('Accueil')}
                            buttonStyle={{backgroundColor: 'white'}}
                            titleStyle={{color: 'rgb(0, 111, 186)'}}
                            TouchableNativeFeedback
                            containerStyle={{width: '75%',marginVertical: 20, marginTop: '15%'}}
                        />
                        </TouchableNativeFeedback>
                        <Image source={require('../assets/images/blueworks.png')} style={{height: 150, width: 150}} />
                        <Text style={styles.slogan}>Great places to focus on what matters...</Text>
                    </View>
                    <View style={styles.pieds}>
                        <Text style={{textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 17}}>
                            #BlueWorkS est ensemble d'espace de travail partagé ou se rencontrent Startups, TPE et PME. Nous 
                            vous offrons un environnement stimulant sans hiérachie, sans compétition, sans politique...
                            bref, un cadre convivial et cosy.
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../assets/images/led1.png')} style={{marginRight: 2, width: 15, height: 15}} />
                            <Image source={require('../assets/images/led2.png')} style={{marginLeft: 2, width: 15, height: 15}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                <View style={styles.entete}>
                        <TouchableNativeFeedback>
                        <Button raised title="Lancez vous!!!" onPress={()=> replace('Accueil')}
                            TouchableNativeFeedback
                            containerStyle={{width: '75%',marginVertical: 20, marginTop: '15%'}}
                        />
                        </TouchableNativeFeedback>
                        <Image source={require('../assets/images/blueworksN.png')} style={{height: 150, width: 150}} />
                        <Text style={styles.slogan}>Great places to focus on what matters...</Text>
                    </View>
                    <View style={styles.pieds}>
                        <Text style={{textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 17, top: '-5%', marginVertical: 10}}>
                            #BlueWorkS vous donne la possibilité de choisir votre espace de travail et de bénéficier de tous les avantages d'un bureau
                            emménagé. En devenant Blue Worker, vous intégrez une communauté qui vous ressemble et qui vous appartient, une communauté
                            capable de se soutenir et de s'enrichir.
                        </Text>
                    <View style={{flexDirection: 'row', top: '-3%'}}>
                        <Image source={require('../assets/images/led2.png')} style={{marginRight: 2, width: 15, height: 15}} />
                        <Image source={require('../assets/images/led1.png')} style={{marginLeft: 2, width: 15, height: 15}}/>
                    </View>
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
        height
    },
    entete: {
        height: hp('60%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    pieds: {
        height: hp('40%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    slogan: {
        textAlign: 'center',
        fontSize: 17,
        color: 'rgb(227,207,50)',
        fontWeight: 'bold'
    }

});

AppRegistry.registerComponent('Couverture', ()=>Couverture);