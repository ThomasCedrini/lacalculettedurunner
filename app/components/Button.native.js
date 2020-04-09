import React from 'react';
import {withTheme, Button as B} from 'react-native-paper';

const Button = ({theme, children, ...props}) => (
  <B mode="contained" color={theme.colors.primary} {...props}>
    {children}
  </B>
);

export default withTheme(Button);
