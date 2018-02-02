import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import MapPage from './views/MapPage';
import LoginPage from './views/LoginPage';
import RegPage from './views/RegPage';
import AcctPage from './views/AcctPage';
import LogoutPage from './views/LogoutPage';

import { checkLogin } from './actions/Login';

const GuestRouter = DrawerNavigator(
    {
        Map: { screen: MapPage },
        'Log in': { screen: LoginPage },
        Register: { screen: RegPage },
    },
    {
        initialRouteName: 'Map',
    }
);

const UserRouter = DrawerNavigator(
    {
        Map: { screen: MapPage },
        'My Account': { screen: AcctPage },
        'Log Out': {screen: LogoutPage},
    },
    {
        initialRouteName: 'Map',
    }
);

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };
        this.props.checkLogin();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.loggedIn !== this.props.loggedIn){
            this.setState({
                loggedIn: nextProps.loggedIn,
            });
        }
    }

    render() {
        if (!this.state.loggedIn){
            return (
                <GuestRouter style={styles.layering}/>
            );
        } else {
            return (
                <UserRouter style={styles.layering}/>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch);
    return {
        checkLogin: () => {
            dispatch(checkLogin());
        },
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loginSuccess,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    layering: {
        zIndex: 10, 
    },
});