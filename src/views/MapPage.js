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
import { Button } from 'native-base';

import { loginUser } from '../actions/Login.js';
import { getAllSpots } from '../actions/ParkingSpots.js';

import { DEMO_USER } from '../actions/config'

class MapPage extends Component {
    constructor(props) {
        super(props);
        this.onPressLogIn = this.onPressLogIn.bind(this);               
        this.onPressGetSpots = this.onPressGetSpots.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // TODO: handle and render places data in nextProps
    }

    onPressLogIn() {
        this.props.loginUser();
    }

    onPressGetSpots() {
        this.props.getAllSpots();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MapView
                    style={styles.container} 
                    initialRegion={{
                        latitude: 49.2827,
                        longitude: -123.1207,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
                <View style={styles.underMap}>
                    <Button 
                        style={styles.buttonStyle}
                        onPress={this.onPressLogIn}
                    >
                        <Text>Log in</Text>
                    </Button>
                    <Button
                        style={styles.buttonStyle}
                        onPress={this.onPressGetSpots}                        
                    >
                        <Text>Get Spots</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: () => {
            dispatch(loginUser(DEMO_USER.email, DEMO_USER.password));
        },
        getAllSpots: () => {
            dispatch(getAllSpots());
        }
    };
}

function mapStateToProps(state) {
    return {
        user: state.loginReducer.email
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
