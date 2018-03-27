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
    Dimensions,
    ScrollView,
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
    Card, 
    CardItem,
} from 'native-base';

import moment from 'moment';
import Modal from 'react-native-modal';

import { fetchReservations, deleteReservation } from '../actions/Reservation';
import { parkBike, retrieveBike } from '../actions/index'

import { cardStyles } from '../components/CardStyles';
import { listStyles } from '../components/ListStyles';
import HeaderBar from '../components/HeaderBar';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


let { height, width } = Dimensions.get('window');

class ReservationList extends Component {
    constructor(props) {
        super(props);
        this.renderCurrentReservation = this.renderCurrentReservation.bind(this);
        this.renderPastReservation = this.renderPastReservation.bind(this);
    }

    componentWillMount() {
        this.props.fetchReservations();
    }

    renderCurrentReservation(currReservation, currSpot) {
        const { bookTime, code } = currReservation;
        const { title, address, city, availableSpots, id } = currSpot;
        return (
            <Card style={cardStyles.card}>
                <CardItem style={cardStyles.titleCardItem}>
                    <Text style={styles.nameTitle}>Current Booking</Text>
                </CardItem>
                <CardItem>
 
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={styles.reserveLabel}>
                            {title} {"\n"}
                            Booking code: { code } {"\n"}
                        </Text>
                        <Text style={styles.addressLabel}> {address}, {city} </Text>
                    </Body>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Text>
                        Book time: {moment(bookTime).format("ddd, MMM. D, h:mm a")}{"\n\n"}
                        You must arrive within 30 minutes of the booking time or you will be temporarily suspended
                    </Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Text>
                        You must cancel the reservations within 5 minutes of the booking time or you will be temporarily suspended
                    </Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Button 
                        style={styles.cancelButton} block
                        onPress={() => { this.props.deleteReservation() }}>
                        <Text style={styles.buttonText}>Cancel Reservation</Text>
                    </Button>
                </CardItem>
                <CardItem>
                    <Button 
                        style={styles.getDirectionButton} block
                        onPress={() => { parkBike(code) }}>
                        <Text style={styles.buttonText}>Park Bike</Text>
                    </Button>
                    <Text>
                        {"   "}
                    </Text>
                    <Button 
                        style={styles.getDirectionButton} block
                        onPress={() => { retrieveBike(code) }}>
                        <Text style={styles.buttonText}>Retrieve Bike</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    }

    // renderMapSection(currSpot){
    //     const { lat, lng } = spot;
    //     return (
    //         <Card style={cardStyles.card}>
    //             <MapView
    //                 style={styles.map}
    //                 initialRegion={{
    //                     latitude: lat,
    //                     longitude: lng,
    //                     latitudeDelta: 0.0922/4,
    //                     longitudeDelta: 0.0421/4,
    //                 }}
    //             >
    //                 <MapView.Marker
    //                     onPress={() => {console.log('pressed')}}
    //                     coordinate={{
    //                         latitude: lat,
    //                         longitude: lng
    //                     }}
    //                 />      
    //             </MapView>
    //             <CardItem style={cardStyles.cardItemStyle}>
    //                 <Button 
    //                     style={styles.getDirectionButton} block
    //                     onPress={() => { console.log("Get directions pressed") }}>
    //                     <Text style={styles.buttonText}>Get Directions</Text>
    //                 </Button>
    //             </CardItem>
    //         </Card>
    //     );
    // }

    renderPastReservation(pastReservation, pastSpot){
        const { bookTime, parkTime, retrieveTime, cost } = pastReservation;
        const { title, address, city } = pastSpot;
        return(
            <Card style={cardStyles.card}>
                <CardItem style={styles.cardItemStyle}>
                    <Text>
                        Spot Name: {title}{"\n"}
                        Spot Address: {address}, {city}{"\n"}
                        Book Time: {moment(bookTime).format("ddd, MMM. D, h:mm a")}{"\n"}
                        Park Time: {moment(parkTime).format("ddd, MMM. D, h:mm a")}{"\n"}
                        Retrieve Time: {moment(retrieveTime).format("ddd, MMM. D, h:mm a")}{"\n"}
                        Cost: ${Math.round(cost * 100) / 100}
                    </Text>
                </CardItem>
            </Card>
        );
    }

    static navigationOptions = {
        tabBarlabel: 'Map',
        drawerIcon: () => {
            return(
                <MaterialIcons 
                name="history" 
                size={25} 
                color="#0D47A1"
              />
            );
        }
    }

    render() {
        // console.log(this.props.resList.currentBooking);
        // this.props.resDeleteSuccess && this.props.navigation.navigate('My Reservations');
        this.props.resDeleteSuccess && this.componentWillMount();
        return (
            <Container style={{flex: 1}}>
                <HeaderBar
                    nav={this.props.navigation}
                />
                <ScrollView style={styles.container}>
                    {
                        this.props.resFetchSuccess &&
                        this.props.resList.currentBooking &&
                        this.renderCurrentReservation(
                            this.props.resList.currentBooking, this.props.resList.currentBooking.parkingStation)
                    }
                    <Text style={styles.nameTitle}>Booking History</Text>
                    {
                        this.props.resFetchSuccess &&
                        this.props.resList.pastBookings.map((booking, ind) => 
                            this.renderPastReservation(booking, booking.parkingStation))
                    }
                </ScrollView>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'stretch',
        flexDirection: 'column',
        // alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
    nameTitle: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    reserveLabel: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    addressLabel: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        // flex: 1
    },
    full: {
        flex: 1
    },
    getDirectionButton: {
        backgroundColor: 'lightblue',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    map: {
        height: height / 2.5,
        width: width
    },
    reserveButton: {
        backgroundColor: 'green',
        marginTop: 10
    },
    cardItemStyle: {
        justifyContent: 'center',
    },
    errorText: {
        color: 'red'
    },    buttonStyle: {
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
    cancelButton: {
        backgroundColor: 'red',
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

function mapDispatchToProps(dispatch) {
    return {
        fetchReservations: () => {
            dispatch(fetchReservations());
        },
        deleteReservation: () => {
            dispatch(deleteReservation());
        }
    };
}

function mapStateToProps(state) {
    return {
        resFetching: state.reservationReducer.resFetching,
        resFetchSuccess: state.reservationReducer.resFetchSuccess,
        resFetchInvalid: state.reservationReducer.resFetchInvalid,
        resFetchError: state.reservationReducer.resFetchError,
        resList: state.reservationReducer.resList,
        resDelete: state.reservationReducer.resDelete,
        resDeleteSuccess: state.reservationReducer.resDeleteSuccess,
        resDeleteInvalid: state.reservationReducer.resDeleteInvalid,
        resDeleteError: state.reservationReducer.resDeleteError,
        resDeleteMsg: state.reservationReducer.resDeleteMsg,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationList);
