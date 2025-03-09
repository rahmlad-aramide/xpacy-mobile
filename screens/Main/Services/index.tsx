import { FilterIconSVG, RowActionsSVG, SortIconSVG } from '@/assets/svgs'
import { Empty } from '@/components/Empty'
import { Header } from '@/components/layout/Header'
import { SwitcherButtons } from '@/components/SwitcherButtons'
import { UnitextBold } from '@/components/Unitext'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useMemo, useRef, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type TStatus = 'In progress'|'Completed'|'Upcoming'|'Cancelled'
interface IListItem {
  id: number;
  date: string;
  service: string;
  status: TStatus;
  property: string;
}

const ListItem: React.FC<IListItem> = ({id, date, service, status, property}) => {
  return (
    <View className='py-6 gap-6 border-t-2 border-primary-100 bg-white'>
      <View className='h-6 flex-row justify-between items-center'>
        <Text className='font-unitext text-base-black text-sm'>24/09/24</Text>
        <TouchableOpacity>
          <RowActionsSVG />
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-between'>
        <Text className='font-unitext text-base-black text-sm' numberOfLines={2}>Waste Management</Text>
      </View>
      <View className='flex-row justify-between'>
        <Text className='font-unitext text-sm text-neutral-700'>Property</Text>
        <Text className='font-unitext text-sm text-base-black' numberOfLines={2}>22, Awolowo Way, Ikoyi, Lagos </Text>
      </View>
    </View>
  )
}
function Services() {
  const [servicesData, setServices] = useState([1]);
  const [activeTab, setActiveTab] = useState<'Booked Services'|'Book New Service'>('Booked Services');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [420], []);
  const [activeSheet, setActiveSheet] = useState<string>('');
  const data: IListItem[] = [
    {
      id: 1,
      date: '29/04/24',
      service: 'Plumbing',
      status: 'Upcoming',
      property: 'Novas Apartments.'
    },
    {
      id: 2,
      date: '29/04/24',
      service: 'Painting',
      status: 'Upcoming',
      property: 'Novas Apartments.'
    },
    {
      id: 3,
      date: '29/04/24',
      service: 'Waste Management',
      status: 'Upcoming',
      property: 'Novas Apartments.'
    },
    {
      id: 4,
      date: '29/04/24',
      service: 'Cleaning',
      status: 'Upcoming',
      property: 'Novas Apartments.'
    },
    {
      id: 5,
      date: '29/04/24',
      service: 'Fixing',
      status: 'Upcoming',
      property: 'Novas Apartments.'
    },
  ]

  return (
    <SafeAreaView className="flex-1 px-6 pt-2 bg-background">
          <Header title="Services" notificationIcon />
          {servicesData.length === 0 ? (
            <View className="flex-1 justify-center pt-3">
              <Empty message="You have no service(s) at the moment!" />
            </View>
          ) : (
            <GestureHandlerRootView className="flex-1">
              <View className="flex-1 pt-3 gap-6">
                <SwitcherButtons selectedOption={activeTab} setSelectedOption={setActiveTab} options={['Booked Services', 'Book New Service']} />
                  <View className="bg-white border-[1.5px] p-6 border-primary-200 rounded-lg gap-6">
                    <FlatList
                            data={data}
                            keyExtractor={(_, idx) => `${idx}`}
                            renderItem={({ item }) => (
                              <ListItem
                                id={item.id}
                                service={item.service}
                                status={item.status}
                                date={item.date}
                                property={item.property}
                              />
                            )}
                            ListHeaderComponent={
                              <View className="flex-row justify-between items-center pb-2">
                                  <Text className="font-florenceSans text-base text-base-black">
                                    Service Overview
                                  </Text>
                                <View className="flex-row gap-2">
                                  <TouchableOpacity onPress={()=> {setActiveSheet('sort'); bottomSheetRef.current?.expand()}} className="h-12 w-12 items-center justify-center">
                                    <SortIconSVG />
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=> {setActiveSheet('filter'); bottomSheetRef.current?.expand()}} className="h-12 w-12 items-center justify-center">
                                    <FilterIconSVG />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            }
                            ListFooterComponent={
                              <View className="flex-1 items-center mt-5 pb-12">
                                  <UnitextBold className="text-sm text-left">
                                    You're all caught up.
                                  </UnitextBold>
                              </View>
                            }
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View className="h-4"></View>}
                          />
                          <BottomSheet
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        index={-1}
        handleIndicatorStyle={{width: 60, backgroundColor: '#A2A2A2', height: 3, marginTop: 6}}
      >
        <BottomSheetView>
          <View className="p-6 rounded-lg border border-primary-100">
            <Text>
            {activeSheet === 'sort'?
          "Sort": "Filter"}  
            </Text>
          </View>
          </BottomSheetView>
        </BottomSheet>
                  </View>
              </View>
            </GestureHandlerRootView>
          )}
        </SafeAreaView>
  )
}

export default Services