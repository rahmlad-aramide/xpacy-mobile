import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, GestureResponderEvent } from 'react-native';

const RadioButton = ({ options, type='default', activeSheet, onPress, selectedOption, setSelectedOption }: {options: string[], type?: 'default'|'list', activeSheet?: 'filter'|'sort', onPress?: ((event: GestureResponderEvent) => void) | undefined, selectedOption: string, setSelectedOption: Dispatch<SetStateAction<string>>}) => {
  // const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(()=> {
    type=== 'default' && setSelectedOption(options[0])
  },[]);

  useEffect(()=> {
    type === 'list' &&  setSelectedOption(options[0])
  },[activeSheet])

  return (
    type === 'default'? <View className='flex flex-row justify-between items-center'>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleOptionSelect(option)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: '#203645',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedOption === option && (
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 14,
                  backgroundColor: '#203645',
                }}
              />
            )}
          </View>
          <Text className='font-unitext' style={{ marginLeft: 8 }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>:
    <>
        {options.map((option, idx)=> (
          <Pressable key={option} onPress={()=>{handleOptionSelect(option); onPress} } className={`${idx === 0? '': 'border-t border-primary-100'} px-6 h-12 flex-row justify-between items-center w-full`}>
            <View><Text className='font-unitext text-base-black'>{option}</Text></View>
            <View
            style={{
              height: 16,
              width: 16,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#203645',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedOption === option && (
              <View
                style={{
                  height: 11.5,
                  width: 11.5,
                  borderRadius: 10,
                  backgroundColor: '#203645',
                }}
              />
            )}
          </View>
          </Pressable>
        ))}
    </>
  );
};

export default RadioButton