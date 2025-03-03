import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import Home from '../screens/Main/Home';
import Search from '../screens/Main/Search';
import { HomeTabParamList } from '@/types';


const Tab = createBottomTabNavigator<HomeTabParamList>();


const BottomNavigator = () => {

    const theme = useTheme();
    const { colors } = theme;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName='Home'
                // tabBar={props => <BottomTab {...props} />}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default BottomNavigator;