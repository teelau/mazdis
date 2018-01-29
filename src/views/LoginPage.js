import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
    Platform,
    StyleSheet,
    Text,
    ListView,
    View,
    findNodeHandle,
    TouchableHighlight
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
import { reduxForm, Field, formValueSelector, SubmissionError } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import validation from '../helpers/formValidation';
import { loginUser } from '../actions/Login.js';
import { getAllSpots } from '../actions/ParkingSpots.js';

import { DEMO_USER } from '../actions/config';

import HeaderBar from '../components/HeaderBar';
import SingleLineInput from '../components/SingleLineInput';
import buttonStyling from '../components/Button.js';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.onPressLogIn = this.onPressLogIn.bind(this);
        this.createInput = this.createInput.bind(this);
        this.scrollToInput = this.scrollToInput.bind(this);

        this.state = {
            // email: '',
            // password: '',
            // loginError: false,
        };
    }

    componentWillReceiveProps(nextProps){
        // this.setState({
        //     loginError: nextProps.loginError,
        // });
    }

    createInput(props) {
        
        const { meta: { touched, error } } = props;

        return (
            <View>
                <SingleLineInput 
                    {...props} 
                    onFocus={this.scrollToInput} />
                <View style={styles.inputErrorBox}>
                    {touched && error && <Text style={styles.errorText}>{error}</Text>}
                </View>
            </View>
        ); 
    }

    scrollToInput(reactNode) {
        this.scroll.props.scrollToFocusedInput(reactNode);
    }

    onPressLogIn() {
        this.props.loginUser(this.state.email, this.state.password);
    }
    
    onPressSignupLink() {
    }

    renderLoginError() {
        const { loginError, loginBadCred } = this.props;
        
        if(loginError) {
            return <Text style={styles.errorText}>Login Error!</Text> 
        } else if(loginBadCred) {
            return <Text style={styles.errorText}>Invalid Credentials</Text>
        }
    }

    render() {
        const { error, valid, handleSubmit, pristine, submitting } = this.props;
        return (
            <Container style={{flex: 1}}>
                <HeaderBar
                    nav={this.props.navigation}
                />
                <KeyboardAwareScrollView innerRef={ref => {this.scroll =  ref}}>
                    <View style={styles.titleCard}>
                        <Text style={styles.nameTitle}>Mazdis</Text>
                    </View>
                    <Form>
                        <Field
                            name={'email'}
                            label={'Email'}
                            keyboardType={'email-address'}
                            component={this.createInput}
                            validate={[validation.required, validation.email]}
                        />
                        <Field
                            name={'password'}
                            label={'Password'}
                            secureTextEntry={true}
                            component={this.createInput}
                            validate={[validation.required]}
                        />
                    </Form>
                    <View style={styles.loginButtonBox}>
                        <Button 
                            style={buttonStyling(this.props.valid)}
                            block 
                            disabled={!valid}
                            onPress={handleSubmit(this.props.loginUser)}>
                            <Text style={styles.loginButtonText}> LOG IN </Text>
                        </Button>
                    </View>
                    <View style={styles.loginErrorBox}>
                        {this.renderLoginError()}
                    </View>
                    <View style={styles.creatAccountLinkBox}>
                        <Text style={styles.noAccountText}>No account? </Text>
                        <TouchableHighlight
                            onPress={this.onPressSignupLink}
                            underlayColor='lightgrey'>
                            <Text style={styles.signUpLinkText}>Register now!</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: ({email, password}) => {
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
    creatAccountLinkBox: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    loginButtonBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formLabel: {
        flex: 1,
    },
    formInput: {
        flex: 3,
    },
    validTextView: {
        flex: 2,
    },
    ValidText: {
        fontSize: 12,
    },
    nameTitle: {
        fontSize: 46,
        fontWeight: 'bold',
    },
    titleCard: {
        alignItems: 'center',
        marginTop: 75
    },
    loginButton: {
        width: '50%',
        backgroundColor: 'lightblue',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    signUpLinkText: {
        color: 'dodgerblue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    noAccountText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputErrorBox: {
        marginLeft: 15
    },
    loginErrorBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: 'red'
    }
});

let NewLoginPage = reduxForm({
    form: 'login',
})(LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(NewLoginPage);
