import { IMAGES } from "@/constants/theme"
import { Text, useWindowDimensions } from "react-native"
import { View, Image } from "react-native"

export const Empty = ({message='No item(s) to show.'}: {message: string}) => {
    const {width} = useWindowDimensions()
    return (
        <View style={{width: width-48}} className="gap-2 items-center justify-center w-full mx-auto">
            <Image source={IMAGES.empty} />
            <Text className="text-base font-unitext text-base-black">{message}</Text>
        </View>
    )
}