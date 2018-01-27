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
    Form,
    Item,
    Input,
    Label,
} from 'native-base';

import { logoutUser } from '../actions/Login.js';

import HeaderBar from '../components/HeaderBar';

class LogoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
        };
    }

    componentDidMount() {
        this.props.logoutUser();
    }
    
    componentWillReceiveProps(nextProps){
        this.setState({
            loginError: nextProps.loginError,
        });
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <HeaderBar
                    nav={this.props.navigation}
                />
                <Text>Logging you out...</Text>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => {
            dispatch(logoutUser());
        },
    };
}

function mapStateToProps(state) {
    return {
        loginError: state.loginReducer.loginError,
        userEmail: state.loginReducer.email,
    };
}

const styles = StyleSheet.create({
    loginButton: {
        flex: 1,
        flexDirection: 'column',
    },
    formLabel: {
        flex: 1,
    },
    formInput: {
        flex: 3,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
