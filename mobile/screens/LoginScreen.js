import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, AsyncStorage } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();

      if (response.status === 200) {
        await AsyncStorage.setItem('bcToken', text);
        navigation.navigate('Main');
      } else {
        const loginError = new Error(text);
        loginError.status = response.status;
        throw loginError;
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      { errorMessage ? <Text>{errorMessage}</Text> : null }
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={login} />
      <Text>Don't have an account?</Text>
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
});
