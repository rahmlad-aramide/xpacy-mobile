import { View, Platform, StyleProp, ViewStyle, Image } from 'react-native';
import { NavigationHelpers, NavigationState, ParamListBase, useLinkBuilder } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { IMAGES } from '@/constants/theme';
import { ActiveBookedServicesSVG, ActiveHomeSVG, ActivePaymentsSVG, ActiveSavedSVG, ActiveSearchSVG, BookedServicesSVG, HomeSVG, PaymentsSVG, SavedSVG, SearchSVG } from '@/assets/svgs';
import { COLORS } from '@/constants/Colors';

interface MyTabBarProps {
    state: NavigationState<ParamListBase>;
    descriptors: Record<string, any>;
    navigation: NavigationHelpers<ParamListBase>;
    style?: StyleProp<ViewStyle>;
  }

export default function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row', gap: 6, backgroundColor: 'white', borderTopStartRadius: 10, borderTopEndRadius: 10, boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const icon = route.name === 'Home'? isFocused? <ActiveHomeSVG />: <HomeSVG /> :
            route.name === 'Search'? isFocused? <ActiveSearchSVG />: <SearchSVG />:
                route.name === 'Services'? isFocused? <ActiveBookedServicesSVG />: <BookedServicesSVG />:
                    route.name === 'Saved'? isFocused? <ActiveSavedSVG />: <SavedSVG />:
                        route.name === 'Payments'? isFocused? <ActivePaymentsSVG />: <PaymentsSVG />: <HomeSVG />;

        const onPress = () => {
          const event = navigation.emit({
            // @ts-ignore
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          //@ts-ignore
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={[{ flex: 1, paddingHorizontal: 4, paddingBottom: 4, borderTopWidth: 2, borderTopColor: 'transparent'}, isFocused && {borderTopColor: COLORS.primary }, index === state.routes.length - 1 && {borderTopRightRadius: 10}, index === 0 && {borderTopLeftRadius: 10}]}
            key={index}
          >
            <View className='flex justify-between items-center min-h-12'>
                <View className='flex justify-center items-center w-8 h-8'>
                    {icon}
                </View>
                <View>
                    {/* TODO: Change active label weight to bold */}
                    <Text style={{ color: isFocused ? '#203645' : '#585858', fontFamily: 'Unitext-Regular', textAlign: 'center' }}>
                        {label}
                    </Text>
                </View>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
