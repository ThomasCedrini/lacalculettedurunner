import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Dial from './Dial';

const Calculator = ({
  distance,
  setDistance,
  speed,
  setSpeed,
  duration,
  setDuration,
  pace,
  setPace,
  onSubmit,
}) => {
  const window = useWindowDimensions();
  const size = window.width / 2 - 10;

  const [selected, setSelect] = useState({
    distance: false,
    speed: false,
    duration: false,
    pace: false,
  });

  const countSelected = () =>
    selected.distance + selected.duration + (selected.pace || selected.speed);

  const select = (index, value) => {
    if (!value) {
      setSelect({...selected, [index]: value});
      return;
    }

    if (index === 'pace' && selected.speed) {
      setSelect({...selected, speed: false, pace: true});
      return;
    }

    if (index === 'speed' && selected.pace) {
      setSelect({...selected, speed: true, pace: false});
      return;
    }

    if (countSelected() >= 2) {
      return;
    }

    setSelect({...selected, [index]: true});
  };

  const submit = () => {
    if (countSelected() === 2) {
      return onSubmit(selected);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.calculator}>
      <Dial
        selected={selected.distance}
        size={size}
        onSelect={(v) => select('distance', v)}
        title="Distance"
        unit="km"
        value={distance}
        onChange={setDistance}
        onSubmit={submit}
      />
      <Dial
        selected={selected.pace}
        size={size}
        onSelect={(v) => select('pace', v)}
        title="Allure"
        unit="min/km"
        value={pace}
        keyboardType="number-pad"
        format="mm:ss"
        onSubmit={submit}
        onChange={setPace}
      />
      <Dial
        selected={selected.duration}
        size={size}
        onSelect={(v) => select('duration', v)}
        title="Temps"
        unit="min"
        value={duration}
        onChange={setDuration}
        format="hh:mm:ss"
        onSubmit={submit}
      />
      <Dial
        selected={selected.speed}
        size={size}
        onSelect={(v) => select('speed', v)}
        title="Vitesse"
        unit="km/h"
        value={speed}
        onChange={setSpeed}
        onSubmit={submit}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  calculator: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dial: {},
});

export default Calculator;
