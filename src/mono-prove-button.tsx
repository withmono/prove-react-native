import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import React from 'react';
import useMonoProve from './use-mono-prove';

const MonoProveButton: React.FC = () => {
  const { init } = useMonoProve();
  let Btn: React.ComponentType<any>;

  function onPress() {
    init();
  }

  if (Platform.OS === 'ios') {
    Btn = TouchableOpacity;
  } else {
    Btn = TouchableNativeFeedback;
  }

  return (
    <Btn {...{ onPress, style: { width: '100%' } }}>
      <View style={styles.button}>
        <Text style={styles.label}>Onboard with Mono Prove</Text>
      </View>
    </Btn>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    backgroundColor: '#0055BA',
    opacity: 1,
  },
  label: {
    fontSize: 17,
    lineHeight: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default MonoProveButton;
