import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CopyIconSVG, FacebookLogoSVG, GmailLogoSVG, SortIconSVG, TiktokLogoSVG, XLogoSVG } from '@/assets/svgs'
import { Header } from '@/components/layout/Header'
import { IMAGES } from '@/constants/theme'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { copyReferralCodeToClipboard, copyReferralLinkToClipboard, openSocialApp, shareReferral } from '@/utils/helper'
import { users } from './users'
import { UserCard } from './UserCard'

function Referral() {
  const referralCode = "myrefcode";
  const referralLink = `https://xpacy.com/auth/signup?referral=${referralCode}`;

  return (
    <SafeAreaView className="flex-1 px-6 pt-2 bg-background">
          <Header title="Referral" notificationIcon />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex pt-3 pb-6 gap-8">
              <View className="gap-2">
                <Text className="font-florenceSans text-base text-base-black">
                  Refer Friends And Earn
                </Text>
                <Text className="font-unitext text-neutral-900">
                  Invite your friends to Xpacy and earn rewards for every successful
                  signup.
                </Text>
              </View>
              <View className="bg-white border-[1.5px] p-6 border-primary-200 rounded-lg gap-6">
                <View className="gap-2">
                  <Text className="font-unitext text-sm text-base-black">
                    Referral Code
                  </Text>
                  <TouchableOpacity
                    onPress={()=>copyReferralCodeToClipboard(referralCode)}
                    className="flex-row justify-between items-center h-12 px-4 rounded-lg border-primary-200 bg-primary-100"
                  >
                    <Text
                      numberOfLines={1}
                      className="text-base-black font-unitext"
                    >
                      {referralCode}
                    </Text>
                    <CopyIconSVG />
                  </TouchableOpacity>
                </View>
                <View className="gap-2">
                  <Text className="font-unitext text-sm text-base-black">
                    Referral Link
                  </Text>
                  <TouchableOpacity
                    onPress={()=>copyReferralLinkToClipboard(referralCode)}
                    className="flex-row justify-between items-center h-12 px-4 rounded-lg border-primary-200 bg-primary-100"
                  >
                    <Text
                      numberOfLines={1}
                      className="text-base-black font-unitext"
                    >
                      {referralLink}
                    </Text>
                    <CopyIconSVG />
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-between w-full h-10 gap-2">
                  <View className="h-[0.5px] w-auto flex-1 bg-[#265E33]"></View>
                  <View>
                    <Text className="font-unitext text-black/70 text-base leading-5">
                      or
                    </Text>
                  </View>
                  <View className="h-[0.5px] w-auto flex-1 bg-[#265E33]"></View>
                </View>
                <View className="gap-6">
                  <View className="p-2.5">
                    <Text className="font-unitext text-center">Share link via</Text>
                  </View>
                  <View className="flex-row justify-center px-4 gap-8">
                    <TouchableOpacity onPress={() => openSocialApp("gmail")}>
                      <GmailLogoSVG />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shareReferral("facebook")}>
                      <FacebookLogoSVG />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shareReferral("instagram")}>
                      <Image
                        source={IMAGES.igLogo}
                        resizeMode="center"
                        style={{ height: 25, width: 26 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => shareReferral("tiktok")}>
                      <TiktokLogoSVG />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openSocialApp("x")}>
                      <XLogoSVG />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className="bg-white border-[1.5px] p-6 border-primary-200 rounded-lg gap-2.5">
                <Text className="font-unitext text-center">Referral points</Text>
                <Text className="font-unitextBold text-center text-2xl">0 Point</Text>
              </View>
              <View className="bg-white border-[1.5px] p-6 gap-6 border-primary-200 rounded-lg">
                <View className="flex-row justify-between items-center h-12">
                  <Text className="font-florenceSansRegular">Referred Users</Text>
                  <TouchableOpacity>
                    <SortIconSVG />
                  </TouchableOpacity>
                </View>
                <View>
                  {users.map((user) => (
                    <UserCard
                      key={user.id}
                      name={user.name}
                      email={user.email}
                      dateJoined={user.dateJoined}
                    />
                  ))}
                </View>
              </View>
              {/* TODO: Paginate the data manually */}
              <View className="bg-white border-[1.5px] p-6 gap-6 border-primary-200 rounded-lg">
                <View className="flex-row justify-between items-center h-12">
                  <Text className="font-florenceSansRegular">Leaderboard</Text>
                </View>
                <View>
                  {users.map((user) => (
                    <UserCard
                      key={user.id}
                      name={user.name}
                      email={user.email}
                      dateJoined={user.dateJoined}
                    />
                  ))}
                </View>
              </View>
              {/* TODO: Paginate the data here too */}
            </View>
          </ScrollView>
        </SafeAreaView>
  )
}

export default Referral