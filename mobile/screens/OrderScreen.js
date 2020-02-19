import React from 'react';
import { StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MENU_ITEMS = gql`
  {
    menuItems {
      name
      image
      price
      description
      rewards
    }
  }
`;

export default function OrderScreen({ navigation }) {
  const { loading, error, data } = useQuery(MENU_ITEMS);
  console.log(loading);

  if (loading) return <Text>Loading...</Text>;

  if (error) {
    console.log(error);
    return <Text>Error...</Text>;
  }

  return (
    <FlatList
      data={data.menuItems}
      renderItem={({ item }) => {
        const { name, image } = item;
        return (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('MenuItem', { item })}
            >
              <Image style={styles.image} source={{ uri: image }} />
              <Text style={styles.name}>{name}</Text>
            </TouchableOpacity>
          </View>
        )}
      }
      numColumns={2}
      keyExtractor={item => item.name}
    />
  );
}

OrderScreen.navigationOptions = {
  title: 'Order',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20
  },
  card: {
    alignItems: 'center'
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  name: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
