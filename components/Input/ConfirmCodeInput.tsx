import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import Customotp from './Customotp';

export const ConfirmCodeInput = ({ navigation, phone, setCode }) => {
  const theme = useTheme();
  const { colors } = theme;

  const [timerCount, setTimerCount] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [showResend, setShowResend] = useState(false);
  const [resendCounts, setResendCounts] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (showResend) {
      clearInterval(intervalRef.current); // Clear any existing interval
      intervalRef.current = setInterval(() => {
        setTimerCount((lastTimerCount) => {
          if (lastTimerCount <= 1) {
            clearInterval(intervalRef.current);
            return 0; // Ensure timer stops at 0
          }
          return lastTimerCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [showResend, resendCounts]);

  useEffect(() => {
    if (timerCount === 0 && showResend) {
      setResendDisabled(false);
    }
  }, [timerCount, showResend]);

  const handleGetCode = () => {
    // Implement your get code logic here (e.g., API call)
    setShowResend(true);
    setTimerCount(30);
    setResendDisabled(true);
  };

  const handleResend = () => {
    // Implement your resend logic here (e.g., API call)
    setTimerCount(30); 
    setResendDisabled(true); 
    setResendCounts((prev)=>prev+1)
  };

  return (
    <View>
      <Text style={{ ...FONTS.fontRegular, fontSize: 16, color: colors.title, marginTop: 5 }}>
        Request for a Confirmation Code on {""}
        <Text style={{ ...FONTS.fontRegular, fontSize: 16, color: COLORS.primary }}>
          {phone}
        </Text>
      </Text>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5}}>
          Enter the code below:
        </Text>
        <View style={[{ width: '100%' }]}>
          <View style={[{ alignItems: 'center' }]}>
            <Customotp setCode={setCode} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, alignItems: 'center' }}>
            {!showResend ? (
              <TouchableOpacity onPress={handleGetCode}>
                <Text
                  style={{
                    ...FONTS.fontMedium,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.primary,
                    color: COLORS.primary,
                  }}
                >
                  Get Code
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>
                  If you don't receive code,{' '}
                </Text>
                <TouchableOpacity onPress={handleResend} disabled={resendDisabled}>
                  <Text
                    style={{
                      ...FONTS.fontMedium,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.primary,
                      color: COLORS.primary,
                      opacity: resendDisabled ? 0.5 : 1,
                    }}
                  >
                    Resend { timerCount && <Text>{timerCount <= 0 ? "" : `(${timerCount}s)`}</Text>}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
