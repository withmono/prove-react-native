import React from 'react';
import type { ErrorProps } from './types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Error: React.FC<ErrorProps> = (props) => {
  const { name, setOpenWidget } = props;

  return (
    <View style={styles.errorScreen}>
      <Text style={styles.errorMessage}>
        {name}: Something went wrong. Try again.
      </Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setOpenWidget(false)}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 5,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#E4E7EB',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  errorScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Error;
