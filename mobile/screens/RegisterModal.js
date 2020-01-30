import React, { useState } from 'react';
import { StyleSheet, Modal, View, TextInput, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Button from '../components/Button';

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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

export default function RegisterModal({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ registerMutation, { data: registerData, loading: mutationLoading, error: mutationError } ] = useMutation(REGISTER);

  const onPressRegister = () =>
    registerMutation({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password
        }
      }
    })
    .catch(error => dispatch({ type: 'logout' }));

  return (
    <SafeAreaView style={styles.content}>
      <Ionicons
        style={styles.close}
        name={'md-close'}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Text>First Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setFirstName(text)}
        value={firstName}
      />
      <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setLastName(text)}
        value={lastName}
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
      <Button title="Register" onPress={() => console.log('register')} />
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
