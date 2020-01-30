import React, { useContext, useState } from 'react';
import { StyleSheet, AsyncStorage, TextInput, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import UserContext from '../contexts/user-context';
import Button from '../components/Button';

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export default function LoginModal({ navigation }) {
  const { userLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ loginMutation, { loading, error } ] = useMutation(LOGIN);

  const onLoginPress = () =>
    loginMutation({
      variables: {
        input: {
          email,
          password
        }
      }
    })
    .then(async ({data}) => {
      await AsyncStorage.setItem('bcToken', data.login.jwt);
      userLoggedIn();
      navigation.goBack();
    })
    .catch(error => console.log(error));

  return (
    <SafeAreaView style={styles.content}>
      <Ionicons
        style={styles.close}
        name={'md-close'}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Sign in" onPress={() => onLoginPress()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  close: {
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#eee',
    borderWidth: 1
  },
});
