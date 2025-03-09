import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Text, View } from "react-native"
import { NotificationButton } from "../NotificationButton";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface IHeader {
    backIcon?: boolean;
    title: string;
    notificationIcon?: boolean;
}
export const Header: FC<IHeader> = ({backIcon=true, title='', notificationIcon=false}) => {
    const navigaton = useNavigation()
    return (
        <View className="flex flex-row justify-between items-center pb-3">
            <View>
                {backIcon &&
                    <TouchableOpacity onPress={()=>navigaton.goBack()}>
                        <View className="h-12 w-12 rounded-full flex items-center justify-center border border-primary-200 relative">
                            <MaterialIcons name="chevron-left" size={35} /> 
                        </View>
                    </TouchableOpacity>
                }
            </View>
            <View><Text className="text-lg font-florenceSansExp text-black">{title}</Text></View>
            <View className="w-12">
                {notificationIcon &&
                    <NotificationButton />
                }
            </View>
        </View>
    )
}