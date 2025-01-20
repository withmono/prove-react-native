import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MonoProveButton,
  ProveProvider,
  useMonoProve,
} from '@mono.co/prove-react-native';
import type { ProveEventData } from '../../src/types';

const config = {
  sessionId: 'PRV...',
  onSuccess: () => {
    console.log('Successfully verified identity');
  },
  onClose: () => console.log('Widget closed'),
  onEvent: (eventName: string, data: ProveEventData) => {
    console.log(eventName);
    console.log(data);
  },
  reference: 'test_ref',
};

function VerifyIdentity() {
  const { init } = useMonoProve();

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={() => init()}>
        <Text style={styles.btn}>Verify your identity</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <ProveProvider {...config}>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          To verify your identity with the Mono Prove Demo App, click the link
          or button below!
        </Text>

        <VerifyIdentity />

        <MonoProveButton />
      </View>
    </ProveProvider>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 16,
  },
  btn: {
    color: '#0055BA',
  },
  headerText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
