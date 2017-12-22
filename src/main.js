import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';


import MapPage from './views/MapPage';
import LoginPage from './views/LoginPage';
import AcctPage from './views/AcctPage';


const GuestRouter = DrawerNavigator(
    {
        Map: { screen: MapPage },
        'Log in': { screen: LoginPage },
    },
    {
        initialRouteName: 'Map',
    }
);

const UserRouter = DrawerNavigator(
    {
        Map: { screen: MapPage },
        'My Account': { screen: AcctPage },
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
                <GuestRouter />
            );
        } else {
            return (
                <UserRouter />
            );
        }
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loginSuccess,
});

export default connect(mapStateToProps)(Main);

