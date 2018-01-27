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

import { loginUser } from '../actions/Login.js';
import { getAllSpots } from '../actions/ParkingSpots.js';

import { DEMO_USER } from '../actions/config';

import HeaderBar from '../components/HeaderBar';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.onPressLogIn = this.onPressLogIn.bind(this);
        this.state = {
            email: '',
            password: '',
            loginError: false,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            loginError: nextProps.loginError,
        });
    }

    onPressLogIn() {
        this.props.loginUser(this.state.email, this.state.password);
    }

    render() {
        return (
            <Container style={{flex: 1}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                            <Icon name='menu' />
                        </Button>                        
                    </Left>
                    <Body>
                        <Title>Mazdis</Title>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Form>
                        <Item inlineLabel>
                            <Label style={styles.formLabel}>Email</Label>
                            <Input
                                style={styles.formInput}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {this.setState({email: text})}}
                            />
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.formLabel}>Password</Label>
                            <Input
                                style={styles.formInput}
                                secureTextEntry={true}
                                onChangeText={(text) => {this.setState({password: text})}}
                            />
                        </Item>
                        <Item>
                            <Button block
                                onPress={this.onPressLogIn}
                            >
                                <Text> Log In </Text>
                            </Button>
                        </Item>
                        {
                            this.state.loginError && <Text>Login Error!</Text>
                        }
                    </Form>
                </View>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => {
            dispatch(loginUser(email, password));
        },
    };
}

function mapStateToProps(state) {
    return {
        userLoggedIn: state.loginReducer.loginSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
