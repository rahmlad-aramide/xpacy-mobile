import { Text } from "react-native";
import { View } from "react-native";
import CustomInput from "./CustomInput";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  onChangeText: any;
  value: string | number;
  editable?: boolean;
  required?: boolean;
  type?: 'text'|'password';
}

const LabeledInput = ({
    label,
    placeholder,
    onChangeText,
    value,
    editable = true,
    required = true,
    type = 'text',
  }: LabeledInputProps) => {
    return (
      <View style={{ marginBottom: 24 }}>
        <Text className="mb-2 text-base-black text-sm font-unitext">
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
        <CustomInput placeholder={placeholder} onChangeText={onChangeText} value={value} editable={editable} type={type} />
      </View>
    );
  };

  export default LabeledInput;