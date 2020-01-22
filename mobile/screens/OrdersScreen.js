import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function OrdersScreen() {
  return (
    <ScrollView style={styles.container}>

    </ScrollView>
  );
}

OrdersScreen.navigationOptions = {
  title: 'Orders',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
