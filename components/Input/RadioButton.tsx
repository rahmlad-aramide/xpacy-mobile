import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ options }: {options: string[]}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  useEffect(()=> {
    setSelectedOption(options[0])
  },[])

  return (
    <View className='flex flex-row justify-between items-center'>
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
    </View>
  );
};

export default RadioButton