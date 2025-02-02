import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";
import WebView from "react-native-webview";

export default function Main() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar style="inverted" />
        <WebView source={{uri: 'https://xpacy.com/auth/sign-up', }}
            setBuiltInZoomControls={false}
            style={{flex: 1}}
        />
    </SafeAreaView>
  );
}
