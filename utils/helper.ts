import { DropdownComponentDataProps, ILocationResponse, TPlatform } from "@/types";

export const transformLocationsForDropdown = (response: ILocationResponse | null): DropdownComponentDataProps[] => {
    if (!response || !response.state) {
      return [];
    }
  
    return response.state.map((data) => ({
      label: data.location,
      value: data.location,
    }));
  };

  export function formatNigerianCurrency(
    amount: number | string
  ): string {
    try {
      const num = typeof amount === 'string' ? parseInt(amount, 10) : amount;
  
      if (isNaN(num)) {
        throw new Error('Invalid number provided.');
      }
  
      const formatter = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      });
  
      const formatted = formatter.format(num);
  
      const parts = formatter.formatToParts(num);
  
      const symbolPart = parts.find((part) => part.type === 'currency');
      const valuePart = parts
        .filter((part) => part.type !== 'currency')
        .map((part) => part.value)
        .join('');
  
        // symbol: symbolPart ? symbolPart.value : '₦', // Fallback to ₦ if symbol part is not found
      return valuePart
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return 'An unexpected error occurred.';
    }
  }
  
  import { Alert, Linking, Share, ToastAndroid } from 'react-native'
  import * as Clipboard from 'expo-clipboard';
  
  const referralCode = "myrefcode";
    const referralLink = `https://xpacy.com/auth/signup?referral=${referralCode}`;
  
    export const copyReferralCodeToClipboard = async (referralCode: string) => {
      await Clipboard.setStringAsync(referralCode);
      ToastAndroid.show("Referral Code Copied to Clipboard!", ToastAndroid.SHORT);
    };
    
    export const copyReferralLinkToClipboard = async (referralCode: string) => {
      await Clipboard.setStringAsync(`https://xpacy.com/auth/signup?referral=${referralCode}`);
      ToastAndroid.show("Referral Link Copied to Clipboard!", ToastAndroid.SHORT);
    };

    export const shareReferral = async (platform?: TPlatform) => {
      let title = `Invitation to Xpacy`
      let message = `Join me on Xpacy! You can use my referral code: ${referralCode} \n Visit: ${referralLink}`;
      
      let url;
      try{
        switch (platform) {
          case "gmail":
            url = `mailto:?subject=Join%20Me%20On%20Xpacy&body=${encodeURIComponent(message)}`;
            break;
          case "facebook":
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
            break;
          case "instagram":
            url = `https://www.instagram.com/?url=${encodeURIComponent(referralLink)}`;
            break;
          case "tiktok":
            url = `https://www.tiktok.com/share?url=${encodeURIComponent(referralLink)}`;
            break;
          case "x":
            url = `https://x.com/intent/tweet?text=${encodeURIComponent(message)}`;
            break;
          default:
            await Share.share({ message });
            return;
        }
    
        if (url) {
          Share.share({ message, url, title }, {dialogTitle: title, subject: title});
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    };

    export const openSocialApp = async (platform: TPlatform) => {
      let url = "";
  
      switch (platform) {
        case "gmail":
          url = `mailto:?subject=Join%20Me%20On%20Xpacy&body=${encodeURIComponent(`Use my referral code: ${referralCode}\n${referralLink}`)}`;
          break;
        case "facebook":
          url = `https://www.facebook.com/sharer/sharer.php?u=REFERRAL_LINK&quote=MESSAGE`; // Open Facebook App
          // url = `fb://facewebmodal/f?href=${encodeURIComponent(referralLink)}`; // Open Facebook App
          break;
        case "instagram":
          url = `instagram://share?url=${encodeURIComponent(referralLink)}`; // Open Instagram
          break;
        case "tiktok":
          url = `tiktok://share?url=${encodeURIComponent(referralLink)}`; // Open TikTok
          // url = `https://www.tiktok.com/share?url=${encodeURIComponent(referralLink)}`; // Open TikTok
          break;
        case "x":
          url = `x://post?text=${encodeURIComponent(`Hey there, join me on Xpacy! You can use my referral link: ${referralLink} \n Don't forget to share with your loved ones.`)}`;
          break;
        default:
          ToastAndroid.show("Invalid platform selected!", ToastAndroid.SHORT);
          return;
      }
  
      // Check if the app is installed before opening
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        ToastAndroid.show(`${platform} app is not installed, Sharing instead!`, ToastAndroid.SHORT);
        shareReferral(platform)
      }
    };