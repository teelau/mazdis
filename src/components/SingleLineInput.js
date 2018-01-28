import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    findNodeHandle,
    StyleSheet
} from 'react-native';
import { 
    Input,
    Item,
    Label,
    Text
} from 'native-base';


class SingleLineInput extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {};
    }

    render() {
        const { hasLabel, label, input, ...inputProps } = this.props;

        //const onFocusFunction = onFocus || input.onFocus;

        return (
            <Item inlineLabel style={styles.boxInput} >
                {hasLabel && <Label style={styles.labelStyle}>{label}</Label> }
                <Input
                    {...inputProps}
                    style={styles.inputWithLabel}
                    placeholder={!hasLabel ? label : ''}
                    value={input.value}
                    onChangeText={input.onChange}
                    onBlur={input.onBlur}
                    onFocus={input.onFocus} />
            </Item>
        );
    }
}

const styles = StyleSheet.create({
    boxInput: {
        marginRight: 15
    },
    labelStyle: {
        fontSize: 14,
        paddingRight: 5,
        flex: 1,
    },
    inputWithLabel: {
        flex: 3,
    },
});


export default SingleLineInput;
