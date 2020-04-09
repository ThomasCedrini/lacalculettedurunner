import React, {createRef} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {
  Text,
  Subheading,
  Surface,
  withTheme,
  Checkbox,
  IconButton,
} from 'react-native-paper';

import LightTheme from './theme';
import DarkTheme from './dark_theme';

import TextInput from './components/TextInput';

const Dial = ({
  title,
  unit,
  size,
  value,
  selected,
  onSelect = () => {},
  onChange = () => {},
  onSubmit = () => {},
  keyboardType = 'decimal-pad',
  format,
  theme: currentTheme,
}) => {
  const oppositeTheme = currentTheme.dark ? LightTheme : DarkTheme;
  const theme = selected ? oppositeTheme : currentTheme;

  const inputRef = createRef();

  // useEffect(() => {
  //   const ref =
  //     inputRef.current && inputRef.current.focus
  //       ? inputRef.current
  //       : inputRef.current.getElement();
  //
  //   if (selected) {
  //     ref.focus();
  //   } else {
  //     ref.blur();
  //   }
  // }, [selected, inputRef]);

  return (
    <TouchableWithoutFeedback onPress={() => onSelect(!selected)}>
      <Surface
        style={StyleSheet.flatten([
          {height: size, width: size},
          styles.surface,
          selected && styles.select,
        ])}
        theme={theme}>
        {selected && (
          <IconButton
            icon="check"
            color={theme.colors.primary}
            style={styles.icon}
            size={25}
          />
        )}
        <Subheading style={styles.title} theme={theme}>
          {title}
        </Subheading>
        <View style={styles.centerContent}>
          <View style={styles.alignContent}>
            <TextInput
              ref={inputRef}
              theme={theme}
              style={styles.value}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={onSubmit}
              keyboardType={keyboardType}
              format={format}
              editable={selected}
            />

            <Text style={styles.unit} theme={theme}>
              {unit}
            </Text>
          </View>
        </View>
      </Surface>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  surface: {
    elevation: 1,
    margin: 4,
  },
  select: {
    elevation: 12,
  },
  title: {
    textAlign: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  icon: {
    position: 'absolute',
  },
  value: {
    fontSize: 32,
  },
  unit: {
    fontSize: 16,
  },
});

export default withTheme(Dial);
