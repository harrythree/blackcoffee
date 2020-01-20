import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MENU_ITEMS = gql`
  {
    menuItems {
      name
    }
  }
`;

export default function HomeScreen() {
  const { loading, error, data } = useQuery(MENU_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View>
        {data.menuItems.map(({name}) => <Text key={name}>{name}</Text>)}
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
