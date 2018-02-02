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

class MapPage extends Component {
    constructor(props) {
        super(props);
        this.onPressLogIn = this.onPressLogIn.bind(this);               
        this.onPressGetSpots = this.onPressGetSpots.bind(this);
        var spotsDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {r1 !== r2}});
        this.state = {
            spotList: {},
            spotsDs: spotsDs,
            visibleModal: false,
            selectedSpotId: -1,
            userLoggedIn: false,
        };
        this.onPressGetSpots();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.spotList !== this.props.spotList){
            this.setState({
                spotList: nextProps.spotList,
                spotsDs: this.state.spotsDs.cloneWithRows(nextProps.spotList)
            });
        }
        if (nextProps.userLoggedIn != this.state.userLoggedIn){
            this.setState({
                userLoggedIn: nextProps.userLoggedIn,
            });
        }
    }

    onPressLogIn() {
        this.props.loginUser();
    }

    onPressGetSpots() {
        this.props.getAllSpots();
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styles.modalContent}>
          <Text>You selected MazDome: {this.state.selectedSpotId}</Text>
          {this._renderButton('Close', () => this.setState({
              visibleModal: false,
              selectedSpotId: -1,
            }))}
        </View>
    );

    render() {
        return (
            <Container style={styles.ScreenContainer}>
                {/* <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name='menu' />
                        </Button>                        
                    </Left>
                    <Body>
                        <Title>Mazdis</Title>
                    </Body>
                    <Right>
                        {!this.state.userLoggedIn && <Text>Log in/Register</Text>}
                    </Right>
                </Header> */}
                {/* <HeaderBar
                    nav={this.props.navigation}
                    loggedIn={this.state.userLoggedIn}
                /> */}

            <MapView
                style={styles.MapContainer} 
                initialRegion={{
                    latitude: 49.2827,
                    longitude: -123.1207,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {
                    Object.keys(this.state.spotList).map((key, ind) => {
                        return(<MapView.Marker
                            key={ind}
                            title={this.state.spotList[key].title}
                            coordinate={{
                                latitude: this.state.spotList[key].lat,
                                longitude: this.state.spotList[key].lng
                            }}
                            onPress={(e) => {
                                e.id = ind;
                                this.setState({
                                    visibleModal: true,
                                    selectedSpotId: e.id
                                });
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
            {/*pop up message*/}
            <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
                {this._renderModalContent()}
            </Modal>
            {/*menu button */}
            <View style={styles.layerMenuButton}>
                <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                    <Icon style={styles.menuButton} name='menu' />
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
    ScreenContainer: {
        zIndex: -1,
    },
    MapContainer: {
        zIndex: -2,
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
  },
  menuButton: {
      color:'rgba(13,71,161,1)',
      fontSize:30,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
