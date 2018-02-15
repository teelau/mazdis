import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    ListView,
    View,
    TouchableOpacity,
    Image,
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
import Modal from 'react-native-modal';

import { loginUser } from '../actions/Login.js';
import { getAllSpots } from '../actions/ParkingSpots.js';

import { DEMO_USER } from '../actions/config';

import HeaderBar from '../components/HeaderBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class SpotList extends Component {
    constructor(props) {
        super(props);

        this.latitudeDelta = 0.0122,
        this.longitudeDelta = 0.0481,

        this.onPressLogIn = this.onPressLogIn.bind(this);               
        this.onPressGetSpots = this.onPressGetSpots.bind(this);
        this.refreshLocation = this.refreshLocation.bind(this);
        this.setUserPosition = this.setUserPosition.bind(this);
        this.setUserPositionError = this.setUserPositionError.bind(this);
        // var spotsDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {r1 !== r2}});
        // this.state = {
        //     spotList: {},
        //     spotsDs: spotsDs,
        //     visibleModal: false,
        //     selectedSpotId: -1,
        // };

        this.state = {
            userLoggedIn: false,

            visibleModal: false,

            userLat: 0,
            userLon: 0,
            selectedLat: 0,
            selectedLon: 0,

            locnLoadingError: null,
            locnLoadingSuccess: false,
            locnLoading: false,

            selectedSpotId: -1
        };
        this.onPressGetSpots();
    }

    componentWillMount() {
        this.refreshLocation();
    }

    setUserPosition(position) {
        this.setState({
            userLat: position.coords.latitude,
            userLon: position.coords.longitude,
            selectedLat: position.coords.latitude,
            selectedLon: position.coords.longitude,
            locnLoadingSuccess: true,
            locnLoadingError: null,
            locnLoading: false
        });
    }

    setUserPositionError(err) {
        this.setState({
            locnLoadingError: err,
            locnLoadingSuccess: false,
            locnLoading: false,
            userLat: 49.2827,
            userLon: -123.1207,
            selectedLat: 49.2827,
            selectedLon: -123.1207,            
        });
    }

    componentWillReceiveProps(nextProps){
        let nextState = {};
        if (nextProps.userLoggedIn != this.state.userLoggedIn){
            nextState.userLoggedIn = nextProps.userLoggedIn;
        }

        if (nextProps.spotsFetching != this.state.spotsFetching || 
            nextProps.spotsFetched != this.state.spotsFetched || 
            nextProps.spotsFetchError != this.state.spotsFetchError){
                nextState.spotsFetching = nextProps.spotsFetching;
                nextState.spotsFetched = nextProps.spotsFetched;
                nextState.spotsFetchError = nextProps.spotsFetchError;
        }

        if (!(Object.keys(nextState).length === 0 && nextState.constructor === Object)){
            this.setState(nextState);
        }

    }
    refreshLocation() {
        this.setState({
            locnLoadingError: null,
            locnLoadingSuccess: false,
            locnLoading: true
        });
        navigator.geolocation.getCurrentPosition(this.setUserPosition, this.setUserPositionError);
    }
    onPressLogIn() {
        this.props.loginUser();
    }

    onPressGetSpots() {
        this.props.getAllSpots();
    }

    renderListContent(spot) {
        const { title, address, city, availability, availableSpots, id } = spot;
        const addressString = `${address}, ${city}`;
        return (
            <View>
                <Text style={styles.nameTitle}>{ title }</Text>
                <Text>{ addressString }</Text>
                <Text>{ `id: ${id}` }</Text>
            </View>
        )
    };

    // TODO: remove comment to show icon once page is finished
    // static navigationOptions = {
    //     tabBarlabel: 'Parking Spot List',
    //     drawerIcon: () => {
    //         return(
    //             <MaterialIcons 
    //             name="list" 
    //             size={25} 
    //             color="#0D47A1"
    //           />
    //         );
    //     }
    // }

    render() {
        return (
            <Container style={{flex: 1}}>
                <HeaderBar
                    nav={this.props.navigation}
                />
                <View>
                    <Text> Spot List </Text>
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
        spotsFetching: state.parkingSpotsReducer.spotsFetching,
        spotsFetched: state.parkingSpotsReducer.spotsFetched,
        spotsFetchError: state.parkingSpotsReducer.spotsFetchError,
        spotList: state.parkingSpotsReducer.spots,
        userLoggedIn: state.loginReducer.loginSuccess,
        userEmail: state.loginReducer.email
    };
}


const styles = StyleSheet.create({
    ScreenContainer: {
        zIndex: -1,
    },
    MapContainer: {
        zIndex: -2,
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    layerMenuButton: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    nameTitle: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    getDirectionButton: {
        backgroundColor: 'green',
        marginTop: 10
    },
    getDetailButton: {
        backgroundColor: 'lightpink',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotList);
