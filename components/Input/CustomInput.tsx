import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS } from '../../constants/theme';

const CustomInput = (props: any) => {

    const theme = useTheme();
    const { colors } = theme;

    const [passwordShow, setPasswordShow] = useState(true);

    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    return (
        <>
            <View style={{ position: 'relative', justifyContent: 'center' }}>
                <View style={{
                    position: 'absolute',
                    height: 48,
                    width: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,

                    //top:16,
                }}>
                    {props.icon && props.icon}
                </View>
                <TextInput
                    secureTextEntry={props.type === "password" ? passwordShow : false}
                    style={[{
                        ...FONTS.font,
                        fontSize: 14,
                        height: 48,
                        borderWidth: 1,
                        color: '#333333',
                        borderColor:props.background ? colors.background : '#C7D9E5',
                        paddingVertical: 5,
                        backgroundColor:props.background ? colors.background : '#FCFEFF',
                        paddingHorizontal: 16,
                        borderRadius: 10,
                    }, props.icon && {
                        paddingLeft: 50,
                    }, props.inputLg && {
                        height: 98,
                    }, props.inputSm && {
                        paddingVertical: 7,
                        height: 45,
                    }, props.inputRounded && {
                        borderRadius: 30,
                    }, props.inputBorder && {
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderRadius: 0,
                        backgroundColor: colors.card,
                    }]}
                    placeholderTextColor={'#585858'}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    multiline={props.inputLg}
                    keyboardType={props.keyboardType}
                    editable={props.editable}
                />
                {props.type === "password" &&
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Password"
                        accessibilityHint="Password show and hidden"
                        onPress={() => handndleShowPassword()}
                        style={styles.eyeIcon}>
                        <FeatherIcon color={'#585858'} size={18} name={passwordShow ? 'eye-off' : 'eye'} />
                    </TouchableOpacity>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    eyeIcon: {
        position: 'absolute',
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        zIndex: 1,
        top: 0,
    }
})

export default CustomInput;