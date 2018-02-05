import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    ListView,
    View,
} from 'react-native';
import { 
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Content,
    Footer,
    Button,
    Icon,
} from 'native-base';

import { loginUser } from '../actions/Login.js';
import { getAllSpots } from '../actions/ParkingSpots.js';

import { DEMO_USER } from '../actions/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class AcctPage extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarlabel: 'My Account',
        drawerIcon: () => {
            return(
                <MaterialIcons 
                name="info" 
                size={25} 
                color="#0D47A1"
              />
            );
        }
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name='menu' />
                        </Button>                        
                    </Left>
                    <Body>
                        <Title>Mazdis</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Text>Account Info Page</Text>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    underMap: {
        flex: 1,        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    }
});

export default AcctPage;
