import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import stores from '../assets/stores.js';

export default function StoresScreen() {
  const mapRef = useRef();
  const markers = stores
    .map(store => <Marker key={store['Store Number']} coordinate={{latitude: store.Latitude, longitude: store.Longitude}} />);

  const rowPress = ({ Longitude, Latitude }) => {
    mapRef.current.animateToRegion({
      latitude: Latitude,
      longitude: Longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }, 1000);
  };

  const renderStore = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => rowPress(item)}>
        <View style={styles.storeRow}>
          <Text style={styles.rowTitle}>{item['Store Name']}</Text>
          <Text>{`${item['Street Address']}, ${item.City}`}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        initialRegion={{
          latitude: stores[0].Latitude,
          longitude: stores[0].Longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        ref={mapRef}
      >
        {markers}
      </MapView>
      <FlatList
        style={styles.storeList}
        data={stores}
        renderItem={renderStore}
        keyExtractor={item => item['Store Number']}
      />
    </View>
  )
}

StoresScreen.navigationOptions = {
  title: 'Stores',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    flex: 1
  },
  storeList: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  storeRow: {
    height: 100,
    width: '100%',
    padding: 20
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
