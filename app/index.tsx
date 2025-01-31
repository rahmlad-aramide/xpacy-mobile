import { FlorenceText } from "@/components/FlorenceText";
import { theme } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Text, SafeAreaView, View, ImageBackground } from "react-native";

const slides = [
    {
        id: '1',
        image: require('../assets/images/onboarding/onboarding-1.png'),
        title: 'Discover properties that fit your vision and goals.',
        backgroundCover: '#00000033'
    },
    {
        id: '2',
        image: require('../assets/images/onboarding/onboarding-2.png'),
        title: 'Let us handle the details while you enjoy peace of mind.',
        backgroundCover: '#00000066'
    },
    {
        id: '3',
        image: require('../assets/images/onboarding/onboarding-3.png'),
        title: 'Your trusted partner for seamless property experiences.',
        backgroundCover: '#0000004D'
    }
]
const Slide = () => {
    return (
        <ImageBackground source={slides[1].image} imageStyle={{overlayColor: slides[1].backgroundCover, backgroundColor: slides[1].backgroundCover,}} style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: slides[1].backgroundCover, justifyContent: 'space-between', paddingTop: 96, paddingBottom: 36 }}>
                <View>
                    <FlorenceText>{slides[0].title}</FlorenceText>
                </View>
                <View style={{gap: 30, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', gap: 8}}>
                        <View style={{width: 25, height: 12, backgroundColor: theme.secondary, borderRadius: 12}}></View>
                        <View style={{width: 12, height: 12, backgroundColor: theme.white, borderRadius: 12}}></View>
                        <View style={{width: 12, height: 12, backgroundColor: theme.white, borderRadius: 12}}></View>
                    </View>
                    <FlorenceText size={'sm'}>Skip</FlorenceText>
                </View>
            </View>
        </ImageBackground>
    )
}
export default function Onboarding ({navigation}) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef();
    const updateCurrentSlide = (e: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX)
    }
    return (
        <ImageBackground source={slides[1].image} imageStyle={{overlayColor: slides[1].backgroundCover, backgroundColor: slides[1].backgroundCover,}} style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: slides[1].backgroundCover, justifyContent: 'space-between', paddingTop: 96, paddingBottom: 36 }}>
                <View>
                    <FlorenceText style={{fontFamily: 'SpaceMono-Regular'}}>{slides[0].title}</FlorenceText>
                </View>
                <View style={{gap: 30, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', gap: 8}}>
                        <View style={{width: 25, height: 12, backgroundColor: theme.secondary, borderRadius: 12}}></View>
                        <View style={{width: 12, height: 12, backgroundColor: theme.white, borderRadius: 12}}></View>
                        <View style={{width: 12, height: 12, backgroundColor: theme.white, borderRadius: 12}}></View>
                    </View>
                    <FlorenceText size={'sm'}>Skip</FlorenceText>
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    )
}