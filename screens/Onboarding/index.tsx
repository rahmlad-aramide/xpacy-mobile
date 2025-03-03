import { FlorenceText } from "../../components/FlorenceText";
import { COLORS } from "../../constants/Colors";
import { IMAGES } from "../../constants/theme";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  StatusBar as RNStatusBar,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";

interface ISlide {
  id: string;
  image: any;
  title: string;
  backgroundCover: string;
}

const { width, height } = Dimensions.get("window");
// @ts-ignore
const statusBarHeight: number = RNStatusBar?.currentHeight;
const slides: ISlide[] = [
  {
    id: "1",
    image: IMAGES.onbaording1,
    title: "Discover properties that fit your vision and goals.",
    backgroundCover: "#00000033",
  },
  {
    id: "2",
    image: IMAGES.onbaording2,
    title: "Let us handle the details while you enjoy peace of mind.",
    backgroundCover: "#00000066",
  },
  {
    id: "3",
    image: IMAGES.onbaording3,
    title: "Your trusted partner for seamless property experiences.",
    backgroundCover: "#0000004D",
  },
];
const Slide = ({ item }: { item: ISlide }) => {
  return (
    <ImageBackground
      source={item.image}
      imageStyle={{
        overlayColor: item.backgroundCover,
        backgroundColor: item.backgroundCover,
      }}
      style={{ flex: 1, position: "relative", width }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundCover,
          justifyContent: "space-between",
          paddingTop: 96,
          paddingBottom: 36,
        }}
      >
        <View style={{ flex: 1, alignSelf: "center", maxWidth: "80%" }}>
          <FlorenceText fontWeight="bold">{item.title}</FlorenceText>
        </View>
      </View>
    </ImageBackground>
  );
};

export default function Onboarding({
  navigation,
}: {
  navigation: { navigate: (value: string) => {} };
}): React.ReactNode {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = (e: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX);
    setCurrentSlideIndex(currentIndex);
  };

  const goToSlideIndex = (slideIndex: number) => {
    if (slideIndex !== slides.length) {
      const offset = slideIndex * width;
      //@ts-ignore
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const handlePressSkip = () => {
    navigation.navigate("SignUp");
    //TODO: Remove this comment below >
    // const lastSlideIndex = slides.length - 1;
    // const offset = lastSlideIndex * width;
    // //@ts-ignore
    // ref?.current.scrollToOffset({offset});
    // setCurrentSlideIndex(lastSlideIndex)
  };

  const Footer = () => {
    const currentSlide = Math.round(currentSlideIndex / width);

    return (
      <View
        style={{
          gap: 30,
          alignItems: "center",
          position: "absolute",
          bottom: 36,
          alignSelf: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          {slides.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => goToSlideIndex(index)}>
              <View
                style={[
                  currentSlide === index
                    ? { width: 35, backgroundColor: COLORS.secondary }
                    : { width: 12, backgroundColor: COLORS.white },
                  { borderRadius: 12, height: 12 },
                ]}
              ></View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handlePressSkip}>
          <Text
            className="text-white underline"
            style={{
              fontFamily: "Unitext-Regular",
            }}
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Skip"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="transparent" />
      <FlatList
        //@ts-ignore
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height + statusBarHeight }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </View>
  );
}
