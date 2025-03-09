import { IReferredUser } from "@/types";
import { FC } from "react";
import { Text, View } from "react-native";

export const UserCard: FC<IReferredUser> = ({ name, email, dateJoined }) => {
    return (
      <View className="border-t-2 border-primary-100 py-6 gap-6">
        <Text numberOfLines={1} className="font-unitext text-sm text-base-black">{name}</Text>
        <Text numberOfLines={1} className="font-unitext text-sm text-base-black">{email}</Text>
        <View className="flex-row justify-between">
          <Text className="text-neutral-900 font-unitext text-sm">Date joined</Text>
          <Text className="text-base-black font-unitext text-sm">{dateJoined}</Text>
        </View>
      </View>
    );
  };