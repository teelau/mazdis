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

import validation, { normalizePhone } from '../helpers/formValidation';
import { registerUser } from '../actions/Register';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HeaderBar from '../components/HeaderBar';
import SingleLineInput from '../components/SingleLineInput';
import buttonStyling from '../components/Button.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class RegPage extends Component {
    constructor(props) {
        super(props);
        this.createInput = this.createInput.bind(this);
        this.renderRegisterError = this.renderRegisterError.bind(this);

        // this.state = {
        //     regInvalid: false,
        //     regError: false,
        //     regInvalidMsg: '',
        //     regSubmitted: false,
        // };
    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         regError: nextProps.regError,
    //         regInvalid: nextProps.regInvalid,
    //         regInvalidMsg: nextProps.regInvalidMsg,
    //         regSubmitted: nextProps.regSubmitted,
    //     });
    // }

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

    renderRegisterError() {
        const { regInvalid, regInvalidMsg } = this.props;

        if(regInvalid)
            return <Text style={styles.errorText}>{regInvalidMsg}</Text>;
    }

    static navigationOptions = {
        tabBarlabel: 'Register',
        drawerIcon: () => {
            return(
                <MaterialIcons 
                name="person-add" 
                size={25} 
                color="#0D47A1"
              />
            );
        }
    }

    render() {
        const { error, valid, handleSubmit, pristine, submitting } = this.props;
        return (
            <Container style={{flex: 1}}>
                <HeaderBar nav={this.props.navigation} />
                <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
                    <View style={styles.titleCard}>
                        <Text style={styles.nameTitle}>Register for Mazdis</Text>
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
                            name={'name'}
                            label={'Name'}
                            component={this.createInput}
                            validate={[validation.required]}
                        />
                        <Field
                            name={'password'}
                            label={'Password'}
                            secureTextEntry={true}
                            component={this.createInput}
                            validate={[validation.required]}

                        />
                        <Field
                            name={'confirmPassword'}
                            label={'Confirm Password'}
                            secureTextEntry={true}
                            component={this.createInput}
                            validate={[validation.required]}
                        />
                    </Form>
                    <View style={styles.registerErrorBox}>
                        {this.renderRegisterError()}
                    </View>
                    <View style={styles.registerButtonBox}>
                        <Button 
                            style={buttonStyling(this.props.valid)}
                            block 
                            disabled={!valid}
                            onPress={handleSubmit(this.props.registerUser)}>
                            <Text style={styles.registerButtonText}> REGISTER </Text>
                        </Button>
                    </View>
                </KeyboardAwareScrollView>  
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        registerUser: (body) => {
            dispatch(registerUser(body));
        },
    };
}


function mapStateToProps(state) {
    return {
        regError: state.regReducer.regError,
        userEmail: state.regReducer.email,
        regInvalid: state.regReducer.regInvalid,
        regInvalidMsg: state.regReducer.regInvalidMsg,
        regSubmitted: state.regReducer.regSubmitted,
        regSuccess: state.regReducer.regSuccess,
    };
}

const styles = StyleSheet.create({
    registerButton: {
        width: '50%',
        backgroundColor: 'lightblue',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    registerButtonBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerErrorBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: 'red'
    },
    titleCard: {
        alignItems: 'center',
        marginTop: 75
    },
    nameTitle: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    inputErrorBox: {
        marginLeft: 15
    }
});

let NewRegPage = reduxForm({
    form: 'register',
    validate: validation.password,
})(RegPage);

export default connect(mapStateToProps, mapDispatchToProps)(NewRegPage);
