import { Dimensions } from "react-native";
import { COLORS } from "./Colors";
const { width, height } = Dimensions.get("screen");

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 12,

  //radius
  radius_sm: 8,
  radius: 6,
  radius_lg: 15,

  //space
  padding: 15,
  margin: 15,

  //Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  //App dimensions
  width,
  height,

  container: 800,
};

export const FONTS = {
  fontLg: {
    fontSize: SIZES.fontLg,
    color: COLORS.text,
    lineHeight: 20,
    fontFamily: "FlorencesansSC",
  },
  font: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 20,
    fontFamily: "Unitext-Regular",
  },
  fontSm: {
    fontSize: SIZES.fontSm,
    color: COLORS.text,
    lineHeight: 18,
    fontFamily: "FlorencesansSC",
  },
  fontXs: {
    fontSize: SIZES.fontXs,
    color: COLORS.text,
    lineHeight: 14,
    fontFamily: "FlorencesansSC",
  },
  h1: { fontSize: SIZES.h1, color: COLORS.title, fontFamily: "FlorencesansSC-Exp-Bold" },
  h2: { fontSize: SIZES.h2, color: COLORS.title, fontFamily: "FlorencesansSC-Exp-Bold", lineHeight: 37.234 },
  h3: { fontSize: SIZES.h3, color: COLORS.title, fontFamily: "FlorencesansSC-Bold" },
  h4: { fontSize: SIZES.h4, color: COLORS.title, fontFamily: "FlorencesansSC-Bold" },
  h5: { fontSize: SIZES.h5, color: COLORS.title, fontFamily: "FlorencesansSC-Bold" },
  h6: { fontSize: SIZES.h6, color: COLORS.title, fontFamily: "FlorencesansSC-Bold" },
  fontRegular: { fontFamily: "FlorencesansSC" },
  fontBold: { fontFamily: "FlorencesansSC-Bold" },
  fontUniBold: { fontFamily: "Unitext-Bold" },
  fontTitle: { fontFamily: "FlorencesansSC-Bold" },
};

export const IMAGES = {
  onbaording1: require('../assets/images/onboarding/onboarding-1.png'),
  onbaording2: require('../assets/images/onboarding/onboarding-2.png'),
  onbaording3: require('../assets/images/onboarding/onboarding-3.png'),
  logo: require('../assets/images/logo.png'),
  logo2: require('../assets/images/logo2.png'),
  user: require('../assets/images/home/user.png'),
  featured: require('../assets/images/home/featured.png'),
  latest: require('../assets/images/home/latest.png'),
  gift: require('../assets/images/home/gift.png'),
  arrowUp: require('../assets/images/home/arrow-up.png'),
  dictation: require('../assets/images/search/dictation.png'),
  empty: require('../assets/images/empty.png'),
  igLogo: require('../assets/images/instagram-logo.png'),
};

const appTheme = { COLORS, SIZES, FONTS, IMAGES };

export default appTheme;
