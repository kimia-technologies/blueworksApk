import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator
} from 'react-navigation';
import Couverture from '../screens/Couverture';
import Login from '../screens/Login';
import Sign from '../screens/Signin';
import Acceuil, { Accueil } from '../screens/Accueil';
import GererReservation from '../screens/GererReservation';
import Adherer from '../screens/Adherer';
import Reservation from '../screens/Reservation';
import Code from '../screens/Code';
import Historiques from '../screens/Historique';
import Services from '../screens/Services';
import Actualites from '../screens/Actualites';
import GererCompte from '../screens/GererCompte';
import ModifierCompte from '../screens/ModifierCompte';
import EtatServices from '../screens/EtatServices';
import ServicesClient from '../screens/ServicesClient';
import GererServices from '../screens/GererServices';
import React from 'react';
import {Image, Text} from 'react-native';

const screen = createStackNavigator({
    Couverture: {
        screen: Couverture
    },
    Accueil: {
        screen: Acceuil,
        navigationOptions: {
            headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35, marginLeft: 15}} />,
            headerRight: <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Blue Work Spaces</Text>
        }
    },
    Login: {
        screen: Login
    },
    Sign: {
        screen: Sign
    },
    Adherer: {
        screen: Adherer
    },
    GererReservation: {
        screen: GererReservation
    },
    Reservation: {
        screen: Reservation
    },
    Code: {
        screen: Code
    },
    Historiques: {
        screen: Historiques
    },
    GererServices: {
        screen: GererServices
    },
    Services: {
        screen: Services
    },
    ServicesClient: {
        screen: ServicesClient
    },
    EtatServices: {
        screen: EtatServices
    },
    Actualites: {
        screen: Actualites
    },
    GererCompte: {
        screen: GererCompte
    },
    ModifierCompte: {
        screen: ModifierCompte
    }
}, {
    initialRouteName: 'Couverture'
}, {
    headerMode: 'float',
    mode: 'modal'
});
module.exports = createAppContainer(screen);