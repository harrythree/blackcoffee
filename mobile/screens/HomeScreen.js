import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
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

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(NEWS_ITEMS);
  const { loggedIn, userLoggedOut, userLoggedIn } = useContext(UserContext);

  if (loading) return <Text>Loading...</Text>;

  if (error) {
    return <Text>Error...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.newsItems}
        renderItem={({ item: { image, title, body } }) => (
          <View key={title} style={styles.card}>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardBody}>{body}</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.title}
      />
      { loggedIn ? null :
        <Button
          title={'Join now'}
          onPress={() => navigation.navigate('RegisterModal')}
        />
      }
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: null,
    headerLeft: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate('LoginModal')}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-log-in' : 'md-log-in'}
          size={26}
        />
        <Text style={styles.headerButtonText}>Sign in</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => alert('This is a button!')}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
          size={26}
        />
      </TouchableOpacity>
    )
  }
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
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  headerButtonText: {
    marginLeft: 20
  },
  detailsButton: {
    height: 40,
    width: 80,
    borderRadius: 20,
    backgroundColor: '#000',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
