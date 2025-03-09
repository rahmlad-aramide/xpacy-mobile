import { Text, View } from "react-native";

export default function Badge({value}:{value?: number}) {
  if(!value) return
  return (
    <View className="w-fit min-w-5 h-fit max-h-5 aspect-square absolute top-1 right-2 bg-error rounded-full z-10 flex justify-center items-center border border-white">
      <Text className="text-sm font-unitext text-primary">{value >= 10 ? '9+' : value}</Text>
    </View>
  );
}
