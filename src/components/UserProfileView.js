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
import { fetchCurrentUser, updateCurrentUser } from '../actions/CurrentUser';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SingleLineInput from '../components/SingleLineInput';
import buttonStyling from '../components/Button';


class UserProfilePage extends Component {
    constructor(props) {
        super(props);
        this.createInput = this.createInput.bind(this);
    }

    componentWillMount(){
        this.props.fetchCurrentUser();
    }

    createInput(props) {
        const { input, label, meta: { touched, error }, ...inputProps } = props;
        return (
            <View>
                <SingleLineInput 
                    {...props}
                    hasLabel={true}
                    onFocus={this.scrollToInput} />
                <View style={styles.inputErrorBox}>
                    {touched && error && <Text style={styles.errorText}>{error}</Text>}
                </View>
            </View>
        ); 
    }

    _scrollToInput (reactNode: any) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    renderProfileError() {
        const { updateUserInvalid, updateUserInvalidMsg } = this.props;

        if(updateUserInvalid) {
            return <Text style={styles.errorText}>{updateUserInvalidMsg}</Text>;
        }
    }

    renderProfileSuccess() {
        const { updateUserSuccess } = this.props;

        if (updateUserSuccess){
            return <Text style={styles.successText}> Profile Successfully Updated! </Text>
        }
    }

    render() {
        console.log(this.props);
        const { error, valid, handleSubmit, pristine, submitting } = this.props;
        const {
            updateUserError,
            updateUserInvalid,
            updateUserInvalidMsg,
            updateUserSubmitted,
            updateUserSuccess,
            
            userFetching,
            userFetchSuccess,
            userFetchInvalid,
            userFetchError,
        } = this.props;
        // TODO: alert doens't work after submitting and reediting form
        // if (updateUserInvalid){
        //     alert(updateUserInvalidMsg);
        // }

        return (
            <KeyboardAwareScrollView innerRef={ref => {this.scroll = ref}}>
                { userFetching && <Text> Populating Data... </Text> }
                { userFetchSuccess && 
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
                            placeholder={''}
                            component={this.createInput}
                            validate={[validation.required]}
                        />
                        <Field
                            name={'address'}
                            label={'Address'}
                            placeholder={''}
                            component={this.createInput}
                        />
                        <Field
                            name={'postalCode'}
                            label={'Postal Code'}
                            placeholder={''}
                            component={this.createInput}
                            validate={[validation.noSpaces, validation.postalOrZip]}
                        />
                        {/* TODO: format phone number properly on initial view */}
                        <Field
                            name={'phone'}
                            label={'Phone Number'}
                            normalize={normalizePhone}
                            placeholder={''}
                            keyboardType={'numeric'}
                            maxLength={12}
                            component={this.createInput}
                            validate={[validation.phone]}
                        />
                        <View style={styles.updateErrorBox}>
                            {this.renderProfileError()}
                        </View>
                        <View style={styles.updateButtonBox}>
                            <Button 
                                style={buttonStyling(this.props.valid)}
                                block 
                                disabled={!valid}
                                onPress={handleSubmit(this.props.updateCurrentUser)}>
                                    <Text style={styles.updateButtonText}> Update Profile </Text>
                            </Button>
                        </View>
                        <View style={styles.updateSuccessBox}>
                            {this.renderProfileSuccess()}
                        </View>
                    </Form>
                }
            </KeyboardAwareScrollView>  
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateCurrentUser: (body) => {
            dispatch(updateCurrentUser(body));
        },
        fetchCurrentUser: () => {
            dispatch(fetchCurrentUser());
        },
        // https://redux-form.com/7.2.0/docs/faq/handlevson.md/
        // handleRegSubmit: value => dispatch(....);
    };
}


function mapStateToProps(state) {
    const {
        updateUserError,
        updateUserInvalid,
        updateUserInvalidMsg,
        updateUserSubmitted,
        updateUserSuccess,
    } = state.userProfileReducer

    const {
        userFetching,
        userFetchSuccess,
        userFetchInvalid,
        userFetchError,
     } = state.currentUserReducer;

    const { email, name, address, postalCode, phone } = state.currentUserReducer.currentUserInfo;

    return {
        updateUserError,
        updateUserInvalid,
        updateUserInvalidMsg,
        updateUserSubmitted,
        updateUserSuccess,
        
        userFetching,
        userFetchSuccess,
        userFetchInvalid,
        userFetchError,
        

        initialValues: { email, name, address, postalCode, phone }
    };
}


const styles = StyleSheet.create({
    registerButton: {
        width: '50%',
        backgroundColor: 'lightblue',
    },
    updateButtonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    updateButtonBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    updateErrorBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    updateSuccessBox: {
        marginTop: 25,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: 'red'
    },
    successText: {
        color: 'green'
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

let NewUserProfilePage = reduxForm({
    form: 'userProfileForm',
    enableReinitialize: true,
})(UserProfilePage);

export default connect(mapStateToProps, mapDispatchToProps)(NewUserProfilePage);
