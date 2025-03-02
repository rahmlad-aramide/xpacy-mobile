import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
// import WebView from "react-native-webview";

function Home() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <StatusBar style="inverted" />
        <View><Text>Home</Text></View>
        {/* <WebView source={{uri: 'https://xpacy.com/auth/sign-up', }}
            setBuiltInZoomControls={false}
            style={{flex: 1, paddingTop: 40}}
        /> */}
    </SafeAreaView>
  );
}
export default Home;