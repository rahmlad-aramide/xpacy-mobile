import { FlorenceText } from "@/components/FlorenceText";
import { theme } from "@/constants/Colors";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { StatusBar as RNStatusBar, View, ImageBackground, Dimensions, TouchableOpacity, FlatList } from "react-native";

interface ISlide {
    id: string;
    image: any;
    title: string;
    backgroundCover: string;
}

const {width, height} = Dimensions.get('window');
// @ts-ignore
const statusBarHeight: number = RNStatusBar?.currentHeight;
const slides: ISlide[] = [
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
const Slide = ({item}: {item: ISlide}) => {
    return (
        <ImageBackground source={item.image} imageStyle={{overlayColor: item.backgroundCover, backgroundColor: item.backgroundCover }} style={{flex: 1, position: 'relative', width}}>
            <View style={{flex: 1, backgroundColor: item.backgroundCover, justifyContent: 'space-between', paddingTop: 96, paddingBottom: 36,  }}>
                <View style={{flex: 1, alignSelf: "center", maxWidth: '80%', }}>
                    <FlorenceText>{item.title}</FlorenceText>
                </View>
            </View>
        </ImageBackground>
    )
}

export default function Onboarding () {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef();
    const updateCurrentSlideIndex = (e: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX)
        setCurrentSlideIndex(currentIndex);
    }
    
    const goToSlideIndex = (slideIndex: number) => {
        if(slideIndex !== slides.length ){
            const offset = slideIndex * width;
            //@ts-ignore
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(currentSlideIndex + 1)
        }
    }
    const handlePressSkip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        //@ts-ignore
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex)
    }
    
    const Footer = () => {
        const currentSlide = Math.round(currentSlideIndex / width);
    
        return (
            <View style={{gap: 30, alignItems: 'center', position: 'absolute', bottom: 36, alignSelf: 'center'}}>
                <View style={{flexDirection: 'row', gap: 8}}>
                    {slides.map((_, index)=> (
                        <TouchableOpacity key={index} onPress={()=> goToSlideIndex(index)}>
                            <View style={[ currentSlide === index ? {width: 25, backgroundColor: theme.secondary } : {width: 12, backgroundColor: theme.white}, {borderRadius: 12, height: 12}]}></View>
                        </TouchableOpacity>
                    ))}
                </View>
                {currentSlide === slides.length - 1 ?
                (<Link href={'/main'} style={{flex: 1, width: '100%', textDecorationLine: 'underline', textDecorationStyle: 'solid'}}>
                        <FlorenceText size={'sm'} style={{textDecorationLine: 'underline', textDecorationStyle: 'solid'}}>Get Started</FlorenceText>
                </Link>):
                (<TouchableOpacity onPress={handlePressSkip}>
                    <FlorenceText size={'sm'} style={{textDecorationLine: 'underline', textDecorationStyle: 'solid'}}>Skip</FlorenceText>
                </TouchableOpacity>)
                }
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar style="auto" />
            <FlatList 
                //@ts-ignore
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                contentContainerStyle={{height: height + statusBarHeight }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={slides}
                pagingEnabled
                renderItem={({item}) => <Slide item={item} />}
                keyExtractor={(item) => item.id}
            />
            <Footer />
        </View>
    )
}