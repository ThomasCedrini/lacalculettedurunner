import React from 'react';
import moment from 'moment';

const padZero = (input) => (input + '').padStart(2, '0');

const figureDistance = ({speed, duration}) =>
  floatToString(
    parseFloat((stringToFloat(speed) * stringToTime(duration)) / 3600).toFixed(
      2,
    ),
  );
const figureSpeed = ({distance, duration}) =>
  floatToString(
    parseFloat(
      stringToTime(duration) !== 0
        ? (stringToFloat(distance) * 3600) / stringToTime(duration)
        : 0,
    ).toFixed(2),
  );
const figureDuration = ({distance, speed}) =>
  timeToString(
    Math.round(
      stringToFloat(speed) !== 0
        ? (stringToFloat(distance) / stringToFloat(speed)) * 3600
        : 0,
    ),
  );

const figurePace = ({speed}) =>
  timeToString(
    Math.round(stringToFloat(speed) !== 0 ? 3600 / stringToFloat(speed) : 0),
  );
const figureSpeedFromPace = ({pace}) =>
  floatToString(
    parseFloat(
      stringToTime(pace) !== 0 ? 3600 / stringToTime(pace) : 0,
    ).toFixed(2),
  );

const floatToString = (a) => a + '';
const timeToString = (t) => {
  const duration = moment.duration(t, 's');
  let res = padZero(duration.minutes()) + ':' + padZero(duration.seconds());
  if (duration.hours() > 0) {
    res = padZero(duration.hours()) + ':' + res;
  }
  return res;
};

const stringToFloat = (a) => parseFloat(a);
const stringToTime = (t) => {
  const [h, m, s] = t.split(':');
  if (s) {
    return h * 3600 + (m || 0) * 60 + (s * 1 || 0);
  }

  return h * 60 + (m * 1 || 0);
};

export default (data) => {
  const [distance, setDistance] = React.useState(data.distance);
  const [pace, setPace] = React.useState(data.pace);
  const [duration, setDuration] = React.useState(data.duration);
  const [speed, setSpeed] = React.useState(data.speed);

  const submit = (s) => {
    let selected = {...s};
    let sp = speed;

    if (selected.pace) {
      sp = figureSpeedFromPace({pace});
      setSpeed(sp);
    } else if (selected.speed) {
      setPace(figurePace({speed}));
    }

    if (selected.duration && selected.distance) {
      sp = figureSpeed({distance, duration});
      setSpeed(sp);
      setPace(figurePace({speed: sp}));
    } else if (selected.duration) {
      setDistance(figureDistance({speed: sp, duration}));
    } else if (selected.distance) {
      setDuration(figureDuration({speed: sp, distance}));
    }
  };

  return {
    distance,
    setDistance,
    pace,
    setPace,
    duration,
    setDuration,
    speed,
    setSpeed,
    submit,
  };
};
