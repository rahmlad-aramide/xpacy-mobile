import { KeyboardTypeOptions, Text } from "react-native";
import { View } from "react-native";
import CustomInput from "./CustomInput";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  onChangeText: any;
  value: string | number;
  editable?: boolean;
  required?: boolean;
  type?: "text" | "password";
  keyboardType?: KeyboardTypeOptions;
  errorText?: string | null;
}

const LabeledInput = ({
  label,
  placeholder,
  onChangeText,
  value,
  editable = true,
  required = true,
  type = "text",
  keyboardType = "default",
  errorText = null,
}: LabeledInputProps) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text className="mb-2 text-base-black text-sm font-unitext">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <CustomInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        editable={editable}
        errorText={errorText}
        type={type}
        keyboardType={keyboardType}
      />
      {errorText && (
        <Text className="mt-1 text-xs font-unitext text-red-500">
          * {errorText}
        </Text>
      )}
    </View>
  );
};

export default LabeledInput;
