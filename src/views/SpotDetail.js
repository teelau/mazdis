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

import { cardStyles } from '../components/CardStyles';
import { listStyles } from '../components/ListStyles';
import HeaderBar from '../components/HeaderBar';

let { height, width } = Dimensions.get('window');

class SpotDetail extends Component {

    constructor(props){
        super(props);
        this.renderTitleSection = this.renderTitleSection.bind(this);
    }

    renderTitleSection(spot) {
        const { title, address, city, availableSpots, id } = spot;
        return (
            <Card style={cardStyles.card}>
                <CardItem style={cardStyles.titleCardItem}>
                    <Text style={styles.nameTitle}>{ title }</Text>
                    <Right>
                        <Text> Spots Available </Text>
                        <Text style={styles.availabilityLabel}>
                            { availableSpots }
                        </Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={styles.addressLabel}> {address}, {city} </Text>
                    </Body>
                </CardItem>
                <CardItem style={styles.cardItemStyle}>
                    {
                        !this.props.loggedIn && <Text> You must be logged in to reserve this spot! </Text>
                    }
                    { this.props.loggedIn && <Button
                        style={styles.reserveButton}
                        onPress={() => this.props.navigation.navigate('Reserve Spot', { ...spot })}
                    >
                        <Text style={styles.buttonText}> Reserve </Text>
                    </Button> }
                </CardItem>
                <CardItem>
                    <Text> The reservation will be valid for 30 minutes  </Text>
                </CardItem>
            </Card>
        );
    }

    renderMapSection(spot){
        const { lat, lng } = spot;
        return (
            <Card style={cardStyles.card}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922/4,
                        longitudeDelta: 0.0421/4,
                    }}
                >
                    <MapView.Marker
                        onPress={() => {console.log('pressed')}}
                        coordinate={{
                            latitude: lat,
                            longitude: lng
                        }}
                    />      
                </MapView>
                <CardItem style={cardStyles.cardItemStyle}>
                    <Button 
                        style={styles.getDirectionButton} block
                        onPress={() => { console.log("Get directions pressed") }}>
                        <Text style={styles.buttonText}>Get Directions</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    }

    render(){
        const { params } = this.props.navigation.state;
        let spot = params;
        return(
            <Container style={{flex: 1}}>
                <HeaderBar nav={this.props.navigation} />
                <ScrollView style={styles.container}>
                    { this.renderTitleSection(spot) }
                    { this.renderMapSection(spot) }
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
    availabilityLabel: {
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
});


function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loginReducer.loginSuccess,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);