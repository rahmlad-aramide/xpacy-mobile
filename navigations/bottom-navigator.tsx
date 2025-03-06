import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import Home from '../screens/Main/Home';
import Search from '../screens/Main/Search';
import { HomeTabParamList } from '@/types';
import MyTabBar from '@/components/layout/TabBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Services from '@/screens/Main/Services';
import Saved from '@/screens/Main/Saved';
import Payments from '@/screens/Main/Payments';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/constants/Colors';


const Tab = createBottomTabNavigator<HomeTabParamList>();

const BottomNavigator = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar backgroundColor={COLORS.background} style="dark" />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName='Home'
                tabBar={props => <MyTabBar {...props} />}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Services" component={Services} />
                <Tab.Screen name="Saved" component={Saved} />
                <Tab.Screen name="Payments" component={Payments} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default BottomNavigator;