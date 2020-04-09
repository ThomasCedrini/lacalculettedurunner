import {DarkTheme} from 'react-native-paper';

// import {PixelRatio} from 'react-native';
//
// const scaleFont = (size) => size * PixelRatio.getFontScale();
//
// // FONT SIZE
// export const FONT_SIZE_20 = {fontSize: scaleFont(20)};
// export const FONT_SIZE_18 = {fontSize: scaleFont(18)};
// export const FONT_SIZE_16 = {fontSize: scaleFont(16)};
// export const FONT_SIZE_14 = {fontSize: scaleFont(14)};
// export const FONT_SIZE_12 = {fontSize: scaleFont(12)};

export default {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FFBF00',
    accent: '#0086AD',
  },
};
