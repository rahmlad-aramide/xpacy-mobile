import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useTheme } from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';
import { IconButton } from 'react-native-paper';
import { GlobalStyleSheet } from '../constants/StyleSheet';

const Header = (props) => {

    const navigation = useNavigation();

    const theme = useTheme();
    const { colors } = theme;

    const { grid, handleLayout, layout } = props;

    return (
        <DropShadow
            style={[{
                shadowColor: 'rgba(0, 0, 0, 0.10)',
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: .1,
                shadowRadius: 5,
                zIndex:20,
            }, Platform.OS === "ios" && {
                backgroundColor:theme.dark ?  'rgba(0, 0, 0, 0.70)':'rgba(255,255,255,0.70)',
                borderBottomLeftRadius:25,
                borderBottomRightRadius:25,
                //zIndex:20
            }]}
        >
            <View
                style={[{
                    height: 60,
                    backgroundColor:props.color ? 'rgba(0,0,0,0.60)':colors.card,
                    alignItems:'center',justifyContent:'center'
                }, props.transparent && {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    borderBottomWidth: 0,
                },Platform.OS === 'ios' && {
                    backgroundColor:colors.card
                }]}
            >
                <View style={[GlobalStyleSheet.container, {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft:props.paddingLeft ? 15 : 0,
                    justifyContent: 'space-between',
                    paddingTop:10
                }]}
                >
                    {props.leftIcon == "back" &&
                        <View style={{height:40,width:40,borderRadius:15,backgroundColor:colors.background,justifyContent:'center',marginLeft:15}}>
                            <IconButton
                                onPress={() => props.backAction ? props.backAction() : navigation.goBack()}
                                icon={props => <MaterialIcons name="arrow-back-ios" {...props} />}
                                iconColor={colors.title}
                                size={20}
                            />
                        </View>
                    }
                    <View style={{ flex: 1,marginRight:props.rightIcon ? 0 : props.rightIcon2 ? 0 :props.rightIcon3 ? 0 :props.rightIcon4 ? 0 : 20}}>
                        <Text style={{ ...FONTS.fontMedium, fontSize: 20, color: colors.title, textAlign: props.titleLeft ? 'left' : 'center',paddingLeft:props.titleLeft2 ? 10 :0}}>{props.title}</Text>
                        {props.productId &&
                            <Text style={{ ...FONTS.fontSm, color: colors.text, textAlign: 'center', marginTop: 2 }}>{props.productId}</Text>
                        }
                    </View>
                    {props.rightIcon2 == "search" &&
                        <View style={{height:40,width:40,borderRadius:15,backgroundColor:colors.background,justifyContent:'center',alignItems:'center'}}>
                            <IconButton
                                onPress={() => navigation.navigate('Search')}
                                size={20}
                                iconColor={colors.title}
                                icon={props => <FeatherIcon name="search" {...props} />}
                            />
                        </View>
                    }
                    {props.rightIcon == "cart" &&
                        <View style={{height:40,width:40,borderRadius:15,backgroundColor:colors.background,justifyContent:'center',alignItems:'center'}}>
                            <IconButton
                                onPress={() => navigation.navigate('Shopping')}
                                size={20}
                                iconColor={colors.title}
                                icon={prop =>

                                    <Image {...prop} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.shopping2} />

                                }
                            />
                        </View>
                    }
                    {props.rightIcon3 == "home" &&
                        <IconButton
                            onPress={() => navigation.navigate('DrawerNavigation')}
                            size={20}
                            iconColor={colors.title}
                            icon={props => <FeatherIcon name="home" {...props} />}
                        />
                    }
                    {props.rightIcon4 == "chat" &&
                         <View style={{height:40,width:40,borderRadius:15,backgroundColor:colors.card,justifyContent:'center',alignItems:'center'}}>
                            <IconButton
                                onPress={() => navigation.navigate('SingleChat')}
                                size={20}
                                iconColor={colors.title}
                                icon={props => <Image {...props} style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }} source={IMAGES.comment} />}
                            />
                        </View>
                    }
                    {props.rightIcon == "wishlist" &&
                        <IconButton
                            onPress={() => props.handleLike()}
                            size={20}
                            iconColor={props.isLike ? "#F9427B" : colors.title}
                            icon={val => <FontAwesome name={props.isLike ? "heart" : "heart-o"} {...val} />}
                        />
                    }
                    {grid &&
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleLayout('grid')}
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'grid' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleLayout('list')}
                                style={{
                                    padding: 10,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'list' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid2}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </DropShadow>
    );
};



export default Header;