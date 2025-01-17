# Mono Prove React Native SDK

The Mono Prove SDK is a quick and secure way to onboard your users from within your React Native app. Mono Prove is a customer onboarding product that offers businesses faster customer onboarding and prevents fraudulent sign-ups, powered by the MDN and facial recognition technology.

For accessing customer accounts and interacting with Mono's API (Identity, Transactions, Income, DirectPay) use the server-side [Mono API](https://docs.mono.co/docs).

## Documentation

For complete information about Mono Prove, head to the [docs](https://docs.mono.co/docs).

## Getting Started

1. Register on the [Mono](https://app.mono.com) website and get your public and secret keys.
2. Retrieve a `sessionId` for a customer by calling the [initiate endpoint](https://docs.mono.co/api)

## Installation
Using NPM

```bash
npm install @mono.co/prove-react-native
```

Using yarn

```bash
yarn add @mono.co/prove-react-native
```

## Usage

### Hooks
```js
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProveProvider, useMonoProve } from '@mono.co/prove-react-native';
import type { ProveEventData } from '@mono.co/prove-react-native/lib/types';

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
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={() => init()}>
        <Text style={{ color: 'blue' }}>Verify your identity</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <ProveProvider {...config}>
      <View style={styles.container}>
        <VerifyIdentity />
      </View>
    </ProveProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
```

### Components

```js
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MonoProveButton, ProveProvider } from '@mono.co/prove-react-native';

const config = {
  sessionId: 'PRV...',
  onSuccess: () => {
    console.log('Successfully verified identity');
  },
  onClose: () => console.log('Widget closed'),
};

export default function App() {
  return (
    <ProveProvider {...config}>
      <View style={styles.container}>
        <MonoProveButton />
      </View>
    </ProveProvider>
  );
}
```

## Configuration Options

- [`sessionId`](#sessionId)
- [`onSuccess`](#onSuccess)
- [`onClose`](#onClose)
- [`onEvent`](#onEvent)
- [`reference`](#reference)


### <a name="sesssionId"></a> `sesssionId`
**String: Required**

This is the session ID returned after calling the [initiate endpoint](https://docs.mono.co/api).

```js
const config = {
  sessionId: 'PRV...', // your session id
};
```

### <a name="onSuccess"></a> `onSuccess`
**() => { Void }: Required**

The closure is called when a user has successfully verified their identity.

```js
const config = {
  sessionId: 'PRV...',
  onSuccess: () => {
    console.log('Successfully verified identity');
  },
};
```

### <a name="onClose"></a> `onClose`
**() => { Void }: Optional**

The optional closure is called when a user has specifically exited the Mono Prove flow. It does not take any arguments.

```js
const config = {
  sessionId: 'PRV...',
  onSuccess: () => {
    console.log('Successfully verified identity');
  },
  onClose: () => console.log('Widget closed'),
};
```

### <a name="onEvent"></a> `onEvent`
**(eventName, data) => { Void }: Optional**

This optional closure is called when certain events in the Mono Prove flow have occurred, for example, when the user opens or closes the widget. This enables your application to gain further insight into what is going on as the user goes through the Mono Prove flow.

See the [event details](#proveEvent) below.

```js
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
};
```

### <a name="reference"></a> `reference`
**String: Optional**

When passing a reference to the configuration it will be passed back on all onEvent calls.

```js
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
  reference: 'random_string',
};
```

### <a name="proveEvent"></a> Event Details

#### <a name="eventName"></a> `eventName: String`

Event names correspond to the type of event that occurred. Possible options are in the table below.

| Event type        | Description                                                   |
|-------------------|---------------------------------------------------------------|
| opened            | Triggered when the user opens the Prove Widget.               |
| closed            | Triggered when the user closes the Prove Widget.              |
| identityVerified | Triggered when the user successfully verifies their identity. |
| error             | Triggered when the widget reports an error.                   |


#### <a name="dataObject"></a> `data: JSON`
The data JSON returned from the onEvent callback.

```js
reference: String // reference passed through the prove config
pageName: String // name of page the widget exited on
errorType: String // error thrown by widget
errorMessage: String // error message describing the error
reason: String // reason for exiting the widget
timestamp: Number // unix timestamp of the event as a number
```

## Examples

See more examples [here](/example).


## Support
If you're having general trouble with Mono Prove React Native SDK or your Mono integration, please reach out to us at <hi@mono.co> or come chat with us on Slack. We're proud of our level of service, and we're more than happy to help you out with your integration to Mono.

## Contributing
If you would like to contribute to the Mono Prove React Native SDK, please make sure to read our [contributor guidelines](https://github.com/withmono/prove-react-native/tree/main/CONTRIBUTING.md).


## License

[MIT](https://github.com/withmono/prove-react-native/tree/main/LICENSE) for more information.
