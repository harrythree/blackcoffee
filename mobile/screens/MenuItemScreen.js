import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Button from '../components/Button';

export default function MenuItemScreen({ navigation }) {
  const { name, image, description } = navigation.getParam('item');
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: image }}/>
        <Text style={styles.name}>{ name }</Text>
      </View>
      <Text style={styles.description}>{ description }</Text>
      <Button title={'Add item'} />
    </View>
  )
}

MenuItemScreen.navigationOptions = {
  title: 'Menu Item',
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.50,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: '#eee'
  },
  description: {
    padding: 20,
    fontWeight: '200'
  }
});
