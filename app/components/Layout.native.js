import React from 'react';
import {View} from 'react-native';
import {withTheme} from 'react-native-paper';

const Layout = ({style, theme, children}) => (
  <View style={[{backgroundColor: theme.colors.background}, style]}>
    {children}
  </View>
);

export default withTheme(Layout);
