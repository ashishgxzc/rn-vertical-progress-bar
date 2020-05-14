/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  StatusBarIOS,
  Animated,
} from 'react-native';

const App = () => {
  const [progress, setProgress] = useState(0);
  let animation = useRef(new Animated.Value(0));
  const height = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '0%'],
    extrapolate: 'clamp',
  });

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (progress < 100) {
      setProgress(progress + 25);
    }
  }, 1000);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: 'white', height: height},
          ]}
        />
        <Text>{`${progress}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || StatusBarIOS.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    height: 400,
    width: 20,
    backgroundColor: '#8BED4F',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default App;
