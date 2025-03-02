import { useEffect, useRef, useState } from 'react';
import { Image, Platform, TouchableOpacity, View, Animated, Text, Dimensions } from 'react-native';
import { COLORS, IMAGES, SIZES, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BottomTab = ({ state, descriptors, navigation }) => {

    const theme = useTheme();
    const { colors } = theme;

    const [tabWidth, setWidth] = useState(wp('100%'));

    const tabWD =
        tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

    const circlePosition = useRef(
        new Animated.Value(0),
    ).current;

    Dimensions.addEventListener('change', val => {
        setWidth(val.window.width);
    });
    
    useEffect(() => {
        Animated.spring(circlePosition, {
            toValue: state.index * tabWD,
            useNativeDriver: true,
        }).start();
    },[state.index,tabWidth])


    const onTabPress = index => {
        const tabW =
            tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5; // Adjust this according to your tab width

        Animated.spring(circlePosition, {
            toValue: index * tabW,
            useNativeDriver: true,
        }).start();
    };


    return (
        <DropShadow
            style={[{
                backgroundColor: colors.card,
                shadowColor:theme.dark ? 'rgba(255,255,255,1)': 'rgba(0,0,0,1)',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .1,
                shadowRadius: 5,
                //position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
            }, Platform.OS === 'ios' && {
                backgroundColor: colors.card,
            }]}
        >
            <View
                style={{
                    height: 60,
                    backgroundColor:colors.background,
                }}>
                <View style={[GlobalStyleSheet.container, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    height:'100%',
                    paddingHorizontal: 15,
                    //justifyContent:'flex-start',
                    paddingTop: 10,
                    paddingBottom: 10,
                }]}>
                    {/* <Animated.View
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
                            alignItems: 'center',
                            paddingHorizontal:10,
                            justifyContent: 'center',
                            transform: [{ translateX: circlePosition }],
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width:'100%',
                                borderRadius: 38,
                                backgroundColor: COLORS.primary,
                                marginTop: 10,
                            }}
                        />
                    </Animated.View> */}
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;


                        const scaleText = useRef(new Animated.Value(0)).current;
                        Animated.timing(scaleText, {
                            toValue: isFocused ? 1 : 0,
                            duration: 200,
                            useNativeDriver: true,
                        }).start();

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate({ name: route.name, merge: true });
                                // onTabPress(index);
                            }
                        };


                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={.8}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={[{ 
                                    flex: isFocused ? 2 : 1,
                                    flexDirection:'row',
                                    //backgroundColor:'red',
                                    
                                    alignItems:'center', 
                                    // alignItems:isFocused ? 
                                    //     'flex-start':'center', 
                                    height: '100%', 
                                    justifyContent:'center', 
                                    //marginTop: 10  
                                }]}
                            >
                                {isFocused &&
                                    <Animated.View
                                        style={[
                                            {
                                                transform: [{scaleX : scaleText}],
                                                overflow:'hidden',
                                                position:'absolute',
                                                top:0,
                                                bottom:0,
                                                backgroundColor:COLORS.primary,
                                                borderRadius:30,
                                            }
                                        ]}
                                    >
                                        <View
                                            style={{
                                                height:45,
                                                width:120,
                                            }}
                                        />
                                    </Animated.View>
                                }

                                <Image

                                    style={{ width: 21, height: 21, tintColor: isFocused ? COLORS.white : colors.title, resizeMode: 'contain' }}

                                    source={
                                        label == 'Home' ? IMAGES.home :
                                            label == 'Wishlist' ? IMAGES.heart2 :
                                                label == 'MyCart' ? IMAGES.shopping2 :
                                                    label == 'Category' ? IMAGES.document :
                                                        label == 'Profile' ? IMAGES.user2 : IMAGES.home
                                    }

                                />
                                {isFocused &&
                                    <Animated.Text style={[
                                        FONTS.fontRegular,{
                                            fontSize:16,
                                            color:COLORS.white,
                                            marginLeft:8,
                                            transform : [{scale : scaleText}]
                                        }
                                    ]}>
                                        {label}
                                    </Animated.Text>
                                }

                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </DropShadow>
    );
};

export default BottomTab;