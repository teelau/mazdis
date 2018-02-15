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

class MapPage extends Component {
    constructor(props) {
        super(props);

        this.latitudeDelta = 0.0122,
        this.longitudeDelta = 0.0481,

        this.onPressLogIn = this.onPressLogIn.bind(this);               
        this.onPressGetSpots = this.onPressGetSpots.bind(this);
        this.markerOnPress = this.markerOnPress.bind(this);
        this.mapOnRegionChangeComplete = this.mapOnRegionChangeComplete.bind(this);
        this.refreshLocation = this.refreshLocation.bind(this);
        this.setUserPosition = this.setUserPosition.bind(this);
        this.setUserPositionError = this.setUserPositionError.bind(this);
        this.renderMap = this.renderMap.bind(this);
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

    mapOnRegionChangeComplete(region){
        this.latitudeDelta = region.latitudeDelta;
        this.longitudeDelta = region.longitudeDelta;
    }

    renderMarker(spot, ind) {
        return(
            <MapView.Marker
                key={ind}
                coordinate={{
                    latitude: spot.lat,
                    longitude: spot.lng
                }}
                onPress={(e) => this.markerOnPress(ind, e)}>
            </MapView.Marker>
        );
    }

    renderLoadingView() {
        return (
            <Container style={{flex: 1}}>
                <HeaderBar nav={this.props.navigation} />
                <Text>
                    Loading...
                </Text>
            </Container>
        );
    }

    markerOnPress(ind, e) {
        this.setState({
            visibleModal: true,
            selectedSpotId: ind,
            selectedLat: this.props.spotList[ind].lat,
            selectedLon: this.props.spotList[ind].lng,
        });
    }

    renderMap() {
        let mapOptions = {
            latitude: this.state.selectedLat,
            longitude: this.state.selectedLon,
            latitudeDelta: this.latitudeDelta,
            longitudeDelta: this.longitudeDelta,
        };

        return(
            <Container style={styles.ScreenContainer}>
                <MapView
                    showsCompass={false}
                    initialRegion={mapOptions}
                    region={mapOptions}
                    style={styles.MapContainer} 
                    onRegionChangeComplete={region => this.mapOnRegionChangeComplete(region)}>
                    { this.props.spotList.map((spot, ind) => this.renderMarker(spot, ind)) }
                </MapView>

                {/*pop up message*/}
                <Modal isVisible={this.state.visibleModal} backdropOpacity={0}
                    style={styles.bottomModal} 
                    onBackdropPress={() => this.setState({visibleModal: false, selectedSpotId: -1 })}>
                    {this.state.selectedSpotId !== -1 ? this.renderModalContent(this.props.spotList[this.state.selectedSpotId]) : null}
                </Modal>

                {/*menu button */}
                <View style={styles.layerMenuButton}>
                    <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Icon 
                            style={{
                                color:'rgba(13,71,161,1)',
                                fontSize:30
                            }} 
                            name='menu' 
                        />
                    </Button>   
                </View>                     
            </Container>
        ); 
    }

    renderModalContent(spot) {
        const { title, address, city, availability, availableSpots, id } = spot;
        const addressString = `${address}, ${city}`;
        return (
            <View style={styles.modalContent}>
                <Text style={styles.nameTitle}>{ title }</Text>
                <Text>{ addressString }</Text>
                <Text>{ `id: ${id}` }</Text>
                <Button 
                    style={styles.getDetailButton} block
                    onPress={() => this.props.navigation.navigate('Spot Detail', { ...spot })}
                >
                    <Text style={styles.buttonText}> Get Details / Reserve </Text>
                </Button>
                <Button 
                    style={styles.getDirectionButton} block
                    // onPress={() => direction handler}
                >
                    <Text style={styles.buttonText}>Get Directions</Text>
                </Button>
            </View>
        )
    };

    static navigationOptions = {
        tabBarlabel: 'Map',
        drawerIcon: () => {
            return(
                <MaterialIcons 
                name="place" 
                size={25} 
                color="#0D47A1"
              />
            );
        }
    }

    render() {
        return (
                this.state.locnLoading || !this.props.spotsFetched ? this.renderLoadingView() : this.renderMap()
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
