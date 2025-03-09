import React from "react";
import { Text } from "react-native";

interface IUnitext {
    [x: string]: any;
    children: React.ReactNode;
    className?: string | undefined;
}

export const Unitext: React.FC<IUnitext> = ({ children, className = "", ...props }) => {
  return <Text className={`font-unitext ${className}`} {...props}>{children}</Text>;
};

export const UnitextBold: React.FC<IUnitext> = ({ children, className = "", ...props }) => {
  return <Text style={{fontFamily: 'Unitext-Bold'}} className={`${className}`} {...props}>{children}</Text>;
};

