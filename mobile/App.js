import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const authLink = setContext((_, { headers }) => {
  // const token = await AsyncStorage.getItem('bcToken');
  const token = 'stuff';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const customFetch = async (uri, options) => {
  const res = await fetch(uri, options);
  console.log('res', res);
  console.log('status', res.status);
  
  if (res.status >= 500 || res.status === 401) {
    console.log('handle errors');
    const text = await res.text();
    console.log('text', text);
    const newError = new Error(text);
    newError.status = res.status;
    console.log('new error', newError);
    return Promise.reject(newError);
  }

  return Promise.resolve(res);
};

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  fetch: customFetch
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
});

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </ApolloProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
