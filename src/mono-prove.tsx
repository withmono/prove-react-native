import {
  View,
  StyleSheet,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import type { MonoProveProps, ProveEventData, WebviewMessage } from './types';
import { createUrl } from './utils';
import WebView from 'react-native-webview';
import Error from './error';

const INJECTED_JAVASCRIPT = `window.MonoClientInterface = window.ReactNativeWebView;`;

const MonoProve: React.FC<MonoProveProps> = (props) => {
  const {
    sessionId,
    onClose,
    onSuccess,
    onEvent,
    openWidget,
    setOpenWidget,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children,
    ...otherConfig
  } = props;

  const prove_url = React.useMemo(() => {
    const qs: any = {
      reference: otherConfig?.reference,
      ...otherConfig,
    };
    return createUrl(sessionId, qs);
  }, [otherConfig, sessionId]);

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
      <SafeAreaView style={styles.container}>
        <WebView
          javaScriptEnabled
          startInLoadingState
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          mediaCapturePermissionGrantType="grant"
          style={styles.webViewContainer}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          source={{ uri: prove_url }}
          onMessage={(e: any) => handleMessage(e.nativeEvent.data)}
          renderLoading={() => (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#182CD1" />
            </View>
          )}
          renderError={(e) => <Error name={e} setOpenWidget={setOpenWidget} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0, 0.6)' },
  webViewContainer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
