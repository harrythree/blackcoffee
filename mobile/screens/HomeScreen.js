import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const NEWS_ITEMS = gql`
  {
    newsItems {
      title
      body
      image
    }
  }
`;

export default function HomeScreen() {
  const { loading, error, data } = useQuery(NEWS_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data.newsItems.map(({title, body, image}) => {
          return (
            <View key={title} style={styles.card}>
              <Image source={{ uri: image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardBody}>{body}</Text>
            </View>
          )
        })}
      </ScrollView>
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
    height: 300,
    flex: 1,
    shadowColor: "#000",
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
    height: 150,
    width: '100%',
    backgroundColor: '#eee'
  },
  cardTitle: {
    padding: 10,
    fontSize: 20
  },
  cardBody: {
    padding: 10,
  }
});
