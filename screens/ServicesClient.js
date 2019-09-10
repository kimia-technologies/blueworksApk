import React from 'react';
import { Text, View, Image, StyleSheet,TextInput,KeyboardAvoidingView,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';

export default class ServicesClient extends React.Component{
    static navigationOptions = {
        headerTitle: <Image source={require('../assets/images/blueworks.png')} style={{width: 35, height: 35}} />,
        headerRight: (
          <Text style={{marginRight: 20, color: 'black', fontSize: 20, fontWeight: 'bold'}}>Services client</Text>
        )
    }
    render(){
        return(
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200} enabled>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.conctact}>
                            <Image source={require('../assets/images/call.png')} style={{height: 30, width: 30}} />
                            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}> Contactez nous :</Text>
                        </View>
                        <View style={{marginVertical: 5}}>
                            <Text style={styles.tel}>- (+237) 657 66 07 07</Text>
                            <Text style={styles.tel}>- (+237) 699 66 07 07</Text>
                            <Text style={styles.tel}>- (+237) 669 66 07 07</Text>
                        </View>
                        <View style={styles.suivre}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center' ,marginVertical: 10}}>Rejoinez-nous sur :</Text>
                            <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <Image source={require('../assets/images/twitter.png')} style={{height: 40, width: 40, marginHorizontal: 10}}/>
                                <Image source={require('../assets/images/facebook.png')} style={{height: 40, width: 40, marginHorizontal: 10}}/>
                                <Image source={require('../assets/images/ig.png')} style={{height: 40, width: 40, marginHorizontal: 10}}/>
                                <Image source={require('../assets/images/link.png')} style={{height: 40, width: 40, marginHorizontal: 10}}/>
                            </View>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>Laissez nous un message :</Text>
                        <View style={styles.message}>
                            <TextInput style={styles.inputEmail} placeholder="Votre email" placeholderTextColor="grey" />
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                            <TextInput style={styles.inputMsg} multiline = {true}
                                numberOfLines = {4} placeholder="Votre email" placeholderTextColor="grey" />
                        </View>
                        <View style={{width: 300}}>
                            <Button title="Envoyer" value='Message' style={{}} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        alignItems: 'center'
    },
    conctact: {
        flexDirection: 'row',
    },
    inputMsg: {
        width: 300,
        height:100,
        paddingHorizontal: 16,
        fontSize:16,
        color: 'black',
        marginVertical: 10,
        paddingLeft: 15,
        borderRadius: 15,
        borderBottomColor: 'rgb(0, 111, 186)',
        borderBottomWidth: 1,
        backgroundColor: 'whitesmoke'
    },
    inputEmail: {
        width: 300,
        height: 35,
        paddingHorizontal: 16,
        fontSize:16,
        color: 'black',
        marginVertical: 10,
        paddingLeft: 15,
        borderRadius: 5,
        borderBottomColor: 'rgb(0, 111, 186)',
        borderBottomWidth: 1,
        backgroundColor: 'whitesmoke'
    },
    tel:{
        fontSize: 16,
    },
    message: {
        flexDirection: 'row',
    }
});