import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ref, onValue } from 'firebase/database';
import { db } from '../utils/firebase';
import { Snackbar } from 'react-native-paper';

const MapScreen = ({ route }) => {
  const { id, registrationNumber } = route.params;
  const [marker, setMarker] = useState({});
  const [{ visible, message }, setSnapshot] = useState({
    visible: false,
    message: '',
  });
  useEffect(() => {
    const reference = ref(db, `${id}-${registrationNumber}/location`);
    onValue(
      reference,
      (snapshot) => {
        if (snapshot.exists) {
          if (snapshot.val()) {
            console.log(snapshot.val());
            setMarker(snapshot.val());
          } else {
            setSnapshot({
              visible: true,
              message: 'No location log found',
            });
          }
        }
      },
      (err) => console.log(err)
    );
  }, []);
  return (
    <View style={styles.container}>
      {
        <MapView
          style={styles.map}
          region={{
            latitude: marker?.latitude || 0,
            longitude: marker?.longitude || 0,
            latitudeDelta: 0.018,
            longitudeDelta: 0.018,
          }}
        >
          {marker.latitude && marker.longitude && (
            <Marker
              title='Vehicle'
              coordinate={{
                latitude: marker?.latitude,
                longitude: marker?.longitude,
              }}
            />
          )}
        </MapView>
      }
      <Snackbar
        visible={visible}
        onDismiss={() =>
          setSnapshot({
            visible: false,
            message: '',
          })
        }
      >
        <Text>{message}</Text>
      </Snackbar>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
