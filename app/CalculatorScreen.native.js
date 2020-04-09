import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Headline} from 'react-native-paper';
import Layout from './components/Layout';
import useCalculator from './useCalculator';
import Calculator from './Calculator';

const INIT_DISTANCE = '10.0';
const INIT_PACE = '03:30';
const INIT_DURATION = '00:35:50';
const INIT_SPEED = '16.73';

const CalculatorScreen = () => {
  const {submit, ...data} = useCalculator({
    distance: INIT_DISTANCE,
    pace: INIT_PACE,
    duration: INIT_DURATION,
    speed: INIT_SPEED,
  });

  const onSubmit = (selected) => {
    submit(selected);
  };

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.layout}>
        <View style={styles.header}>
          <Headline>La calculette du runner</Headline>
        </View>
        <Calculator {...data} onSubmit={onSubmit} />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    flex: 1,
  },
});

export default CalculatorScreen;
