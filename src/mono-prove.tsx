import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import type {
  MonoProveProps,
  ProveEventData,
  RenderErrorProps,
  WebviewMessage,
} from './types';
import { createUrl } from './utils';
import WebView from 'react-native-webview';

const INJECTED_JAVASCRIPT = `window.MonoClientInterface = window.ReactNativeWebView;`;

const RenderError: React.FC<RenderErrorProps> = (props) => {
  const { name, setOpenWidget } = props;

  return (
    <View style={styles.errorScreen}>
      <Text style={styles.errorMessage}>
        {name}: Something went wrong. Try again.
      </Text>
      <View style={{ marginTop: 5 }}>
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

const MonoProve: React.FC<MonoProveProps> = (props) => {
  const {
    sessionId,
    onClose,
    onSuccess,
    onEvent,
    openWidget,
    setOpenWidget,
    children,
    ...otherConfig
  } = props;

  const prove_url = React.useMemo(() => {
    const qs: any = {
      reference: otherConfig.reference,
      ...otherConfig,
    };
    return createUrl(sessionId, qs);
  }, [otherConfig.reference, sessionId]);

  function handleMessage(message: string) {
    const response: WebviewMessage = JSON.parse(message);

    const eventData: ProveEventData = response.data;

    switch (response.type) {
      case 'mono.prove.widget_opened':
        if (onEvent) onEvent('OPENED', eventData);
        break;
      case 'mono.prove.error_occurred':
        if (onEvent) onEvent('ERROR', eventData);
        break;
      case 'mono.prove.identity_verified':
        onSuccess();
        if (onEvent) onEvent('IDENTITY_VERIFIED', eventData);
        setOpenWidget(false);
        break;
      case 'mono.prove.widget.closed':
        setOpenWidget(false);
        onClose();
        break;
    }
  }

  return (
    <Modal visible={openWidget} animationType="slide" transparent={false}>
      <SafeAreaView style={[{ flex: 1, backgroundColor: 'rgba(0,0,0, 0.6)' }]}>
        <WebView
          style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          source={{ uri: prove_url }}
          onMessage={(e: any) => handleMessage(e.nativeEvent.data)}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#182CD1" />
            </View>
          )}
          renderError={(e) => (
            <RenderError name={e} setOpenWidget={setOpenWidget} />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
});

export default MonoProve;
