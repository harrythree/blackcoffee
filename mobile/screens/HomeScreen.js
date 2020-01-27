import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TextInput,
  AsyncStorage
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/Button';
import UserContext from '../contexts/user-context';

const NEWS_ITEMS = gql`
  {
    newsItems {
      title
      body
      image
    }
  }
`;

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

export default function HomeScreen() {
  const [ modalOpen, toggleModal ] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, data } = useQuery(NEWS_ITEMS);
  const [ registerMutation, { data: registerData, loading: mutationLoading, error: mutationError } ] = useMutation(REGISTER);
  const { loggedIn, userLoggedOut, userLoggedIn } = useContext(UserContext);

  if (loading) return <Text>Loading...</Text>;

  if (error || mutationError) {
    console.log('error');
    return <Text>Error...</Text>;
  }

  if (registerData) {
    const { jwt } = registerData.register;
    // await AsyncStorage.setItem('@blackcoffee-jwt', jwt);
    // dispatch({ 'login': true });
  }

  // const onPressRegister = () =>
  //   registerMutation({
  //     variables: {
  //       input: {
  //         firstName,
  //         lastName,
  //         email,
  //         password
  //       }
  //     }
  //   })
  //   .catch(error => dispatch({ type: 'logout' }));

  const onPressRegister = () => userLoggedIn();

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOpen}
      >
        <View style={styles.modalContent}>
          <Ionicons
            style={styles.modalClose}
            name={'md-close'}
            size={30}
            onPress={() => toggleModal(false)}
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
          <Button title="Register" onPress={() => onPressRegister()} />
        </View>
      </Modal>
      { loggedIn ? 
        <View style={{ height: 200, width: '100%', backgroundColor: 'green' }}></View>
        : null
      }
      <FlatList
        data={data.newsItems}
        renderItem={({ item: { image, title, body } }) => (
          <View key={title} style={styles.card}>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardBody}>{body}</Text>
          </View>
        )}
        keyExtractor={item => item.title}
      />
      { loggedIn ? null :
        <Button
          title={'Join now'}
          onPress={() => toggleModal(!modalOpen)}
        />
      }
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    margin: 10,
    borderRadius: 5,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: 'white'
  },
  cardImage: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 200,
    width: '100%',
    backgroundColor: '#eee'
  },
  cardTitle: {
    padding: 10,
    fontSize: 20
  },
  cardBody: {
    padding: 10,
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    height: '95%',
    width: '100%'
  },
  modalClose: {
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
