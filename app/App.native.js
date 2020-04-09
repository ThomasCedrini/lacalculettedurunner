import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';
import light from './theme';
import dark from './dark_theme';
import CalculatorScreen from './CalculatorScreen';

const App = () => {
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <PaperProvider theme={colorScheme === 'dark' ? dark : light}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <CalculatorScreen />
    </PaperProvider>
  );
};

export default App;
