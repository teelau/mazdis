import React, { Component } from 'react';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { Container, Header, Body, Content} from 'native-base';

import MapPage from './views/MapPage';
import LoginPage from './views/LoginPage';
import RegPage from './views/RegPage';
import AcctPage from './views/AcctPage';
import LogoutPage from './views/LogoutPage';

import { checkLogin } from './actions/Login';

const CustomDrawerComponent = (props) => (
    <Container>
        <Header style={styles.drawerHeader}>
            <Body>
                <Image 
                    style={styles.drawerImage}
                    source={require('./assets/images/mazdis-logo-black.png')}
                />
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
)

const GuestRouter = DrawerNavigator(
    {
        Map: { screen: MapPage },
        'Log in': { screen: LoginPage },
        Register: { screen: RegPage },
    },
    {
        initialRouteName: 'Map',
        contentComponent: CustomDrawerComponent,
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
        contentComponent: CustomDrawerComponent,
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
    drawerHeader: {
        backgroundColor: '#0D47A1',
        height: 80,
    },
    drawerImage: {
        height:60,
        width:60,
    },
});