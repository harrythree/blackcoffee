import React, { useEffect } from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const getToken = async () => {
      try {
        const bcToken = await AsyncStorage.getItem('bcToken');

        navigation.navigate(bcToken ? 'Main' : 'Auth');
      } catch (error) {
        console.log(error);
        navigation.navigate('Auth');
      }
    }

    getToken();
  }, []);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
