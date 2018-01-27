import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, } from 'react-native';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Button,
    Icon,
    Text,
} from 'native-base';

class HeaderBar extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Header style={styles.header} androidStatusBarColor='blue'>
                <Left>
                    <Button transparent onPress={() => this.props.nav.navigate('DrawerOpen')}>
                        <Icon name='menu' />
                    </Button>                        
                </Left>
                <Body>
                    <Title>{ this.props.message || 'Mazdis' }</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => null}>
                        { !this.props.loggedIn && <Text style={styles.rightSide}>Log in / Register</Text> }
                    </Button> 
                </Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightblue', 
    },
    rightSide: {
        textAlign: 'right',
    }
});

export default HeaderBar;
