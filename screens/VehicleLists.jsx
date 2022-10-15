import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { normalize } from '../utils/responsive';

const VehicleLists = ({ navigation }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    api
      .get('vehicle-groups/vehicles')
      .then((res) => {
        const tempList = [];
        res.data?.data.forEach((data) => {
          if (data?.vehicles.length > 0) tempList.push(...data?.vehicles);
        });
        setList(tempList);
      })
      .catch((err) => console.log('ERROR', err));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LiveVehicles', {
            id: item?.id,
            registrationNumber: item?.registrationNumber,
          });
        }}
        style={styles.renderItemStyle}
      >
        <View>
          <Text>Id: {item?.id || '--------'}</Text>
          <Text>Company: {item?.make || '--------'}</Text>
          <Text>Model: {item?.model || '--------'}</Text>
          <Text>Registration No: {item?.registrationNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
      />
    </View>
  );
};

export default VehicleLists;

const styles = StyleSheet.create({
  renderItemStyle: {
    padding: normalize(15),
    backgroundColor: '#ccc',
    marginBottom: normalize(5),
  },
});
