import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
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

export default function OrderScreen() {
  const { loading, error, data } = useQuery(MENU_ITEMS);

  if (loading) return <Text>Loading...</Text>;

  if (error) {
    console.log(error);
    return <Text>Error...</Text>;
  }

  return (
    <FlatList
      data={data.menuItems}
      renderItem={({ item: { name } }) => <Text>{name}</Text>}
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
});
