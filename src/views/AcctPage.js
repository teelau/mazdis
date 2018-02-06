import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    ListView,
    View,
    Dimensions,
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
import {
    TabViewAnimated,
    TabBar,
    SceneMap,
} from 'react-native-tab-view';

import { loginUser } from '../actions/Login';

import HeaderBar from '../components/HeaderBar';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

import { DEMO_USER } from '../actions/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfilePage = () => { return <View style={[ styles.container, { backgroundColor: '#ff4081' } ]} /> };

const PasswordPage = () => { return <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} /> };

class AcctPage extends Component {
    state = {
        index: 0,
        routes: [
            { key: 'profile', title: 'Profile' },
            { key: 'password', title: 'Password' },
        ],
    }

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarlabel: 'My Account',
        drawerIcon: () => {
            return(
                <MaterialIcons 
                name="info" 
                size={25} 
                color="#0D47A1"
              />
            );
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            loginError: nextProps.loginError,
            loginBadCred: nextProps.loginBadCred,
        });
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        profile: ProfilePage,
        password: PasswordPage,
      });

    render() {
        return (
            <Container style={{flex: 1}}>
                <HeaderBar nav={this.props.navigation} />
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
            </Container>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

function mapStateToProps(state) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(AcctPage);
