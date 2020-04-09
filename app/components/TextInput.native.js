import React, {forwardRef, useState} from 'react';
import {withTheme} from 'react-native-paper';
import {TextInput} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import moment from 'moment';

const padZero = (input) => (input + '').padStart(2, '0');

export default withTheme(
  forwardRef(
    (
      {
        theme,
        style,
        format,
        value,
        onChangeText = () => {},
        onBlur = () => {},
        ...defaultProps
      },
      ref,
    ) => {
      const convertToString = (v) => {
        if (format) {
          const duration = moment.duration(v, 's');
          let res =
            padZero(duration.minutes()) + ':' + padZero(duration.seconds());

          if (format === 'hh:mm:ss') {
            res = padZero(duration.hours()) + ':' + res;
          }

          return res;
        }

        return v + '';
      };

      const convertToData = (v) => {
        if (v) {
          if (format === 'hh:mm:ss') {
            const [h, m, s] = v.split(':');
            return h * 3600 + (m || 0) * 60 + (s || 0);
          } else if (format === 'mm:ss') {
            const [m, s] = v.split(':');
            return m * 60 + s;
          }

          return parseFloat(v);
        }
      };

      const props = {
        ref: ref,
        value: value + '',
        onChangeText: (v) => onChangeText(v),
        onBlur: onBlur,
        style: {color: theme.colors.text, ...theme.fonts.regular, ...style},
        selectionColor: theme.colors.text,
        keyboardType: 'number-pad',
        caretHidden: true,
        returnKeyType: 'done',
        selectTextOnFocus: true,
        ...defaultProps,
      };

      return format ? (
        <TextInputMask type="datetime" options={{format}} {...props} />
      ) : (
        <TextInput {...props} />
      );
    },
  ),
);
