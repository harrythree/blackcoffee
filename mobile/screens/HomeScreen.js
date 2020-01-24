import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Modal,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Ionicons } from '@expo/vector-icons';

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
  const [ registerMutation, { data: registerData } ] = useMutation(REGISTER);

  if (loading) return <Text>Loading...</Text>;

  if (error) {
    console.log(error);
    return <Text>Error...</Text>;
  }

  if (registerData) {
    console.log(registerData);
    const { jwt } = registerData.register;
    AsyncStorage.setItem('@blackcoffee-jwt', jwt);
  }

  const onPressRegister = async () =>
    registerMutation({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password
        }
      }
    });

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
      <TouchableHighlight style={styles.joinNowButton} onPress={() => toggleModal(!modalOpen)}>
        <Text style={styles.joinNowText}>Join now</Text>
      </TouchableHighlight>
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
  joinNowButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 55,
    width: 130,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  joinNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
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
