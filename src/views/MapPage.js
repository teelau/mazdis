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
    Button
} from 'native-base';

import { loginUser } from '../actions/Login.js';
import { getAllSpots } from '../actions/ParkingSpots.js';

import { DEMO_USER } from '../actions/config';

class MapPage extends Component {
    constructor(props) {
        super(props);
        this.onPressLogIn = this.onPressLogIn.bind(this);               
        this.onPressGetSpots = this.onPressGetSpots.bind(this);
        var spotsDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {r1 !== r2}});
        this.state = {
            spotList: {},
            spotsDs: spotsDs
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.spotList !== this.props.spotList){
            this.setState({
                spotList: nextProps.spotList,
                spotsDs: this.state.spotsDs.cloneWithRows(nextProps.spotList)
            });
        }
    }

    onPressLogIn() {
        this.props.loginUser();
    }

    onPressGetSpots() {
        this.props.getAllSpots();
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Left />
                    <Body>
                        <Title>Mazdis</Title>
                    </Body>
                    <Right />
                </Header>
                <MapView
                    style={styles.container} 
                    initialRegion={{
                        latitude: 49.2827,
                        longitude: -123.1207,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* <MapView.Marker
                        title="Me marker"
                        coordinate={{
                            latitude: 49.2777,
                            longitude: -123.1111
                        }}  
                    /> */}
                    {
                        Object.keys(this.state.spotList).map((key, ind) => {
                            return(<MapView.Marker
                                key={ind}
                                title={this.state.spotList[key].title}
                                coordinate={{
                                    latitude: this.state.spotList[key].lat,
                                    longitude: this.state.spotList[key].lng
                                }}  
                            />);
                        })
                    }
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
            </Container>
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
        spotList: state.parkingSpotsReducer.spots,
        userLoggedIn: state.loginReducer.loginSuccess,
        userEmail: state.loginReducer.email
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