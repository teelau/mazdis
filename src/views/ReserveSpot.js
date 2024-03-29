import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';

import {
    Container,
    Header,
    Body,
    Card, 
    CardItem,
    Right,
    Icon,
    Button
} from 'native-base';

import MapView from 'react-native-maps';

import { reserveSpot, resetReservation } from '../actions/Reservation';

import { cardStyles } from '../components/CardStyles';
import { listStyles } from '../components/ListStyles';
import HeaderBar from '../components/HeaderBar';

let { height, width } = Dimensions.get('window');

class ReserveSpot extends Component {

    constructor(props){
        super(props);
        this.renderResError = this.renderResError.bind(this);
        this.renderTitleSection = this.renderTitleSection.bind(this);
    }

    renderResError() {
        const { resInvalid, resInvalidMsg } = this.props;

        if(resInvalid) {
            return <Text style={styles.errorText}>{resInvalidMsg}</Text>;
        }
    }

    renderTitleSection(spot) {
        const { title, address, city, availableSpots, id } = spot;
        return (
            <Card style={cardStyles.card}>
                <CardItem>
                    <Text style={styles.reserveLabel}>
                        Reserving for:
                    </Text>
                </CardItem>
                <CardItem>
                    <Text style={styles.nameTitle}>{ title }</Text>
                </CardItem>
                <CardItem>
                    <Text style={styles.addressLabel}> {address}, </Text>
                    <Text style={styles.addressLabel}> {city} </Text>
                </CardItem>
                <CardItem>
                    <Text> Please arrive at the parking spot within the next 30 minutes. </Text>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Button
                        style={styles.reserveButton}
                        onPress={() => { this.props.reserveSpot(id) }}>
                        <Text style={styles.buttonText}> Confirm Reservation </Text>
                    </Button>
                </CardItem>
                <CardItem>
                    { this.renderResError() }
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    <Button 
                        style={styles.getDirectionButton} block
                        onPress={() => { this.props.navigation.navigate('Spot Detail') }}
                    >
                        <Text style={styles.buttonText}> Go Back </Text>
                    </Button>
                </CardItem>

            </Card>
        );
    }


    render(){
        const { params } = this.props.navigation.state;
        let spot = params;
        this.props.resSuccess && this.props.navigation.navigate('My Reservations');
        return(
            <Container style={{flex: 1}}>
                <HeaderBar nav={this.props.navigation} />
                <ScrollView style={styles.container}>
                    { this.renderTitleSection(spot, this.props.navigation) }
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
    },
});


function mapDispatchToProps(dispatch) {
    return {
        reserveSpot: (stationId) => {
            dispatch(reserveSpot(stationId));
        },
    };
}

function mapStateToProps(state) {
    return {            
        resSubmitted: state.reservationReducer.resSubmitted,
        resSuccess: state.reservationReducer.resSuccess,
        resError: state.reservationReducer.resError,            
        resInvalid: state.reservationReducer.resInvalid,
        resInvalidMsg: state.reservationReducer.resInvalidMsg,
        resDetail: state.reservationReducer.resDetail,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReserveSpot);
