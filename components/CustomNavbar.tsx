import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const CustomNavbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('UploadPicture')} style={styles.navItem}>
          <Text style={styles.navText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Alert')} style={styles.navItem}>
          <Text style={styles.navText}>Alert</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('PurchaseScreen')} style={styles.navItem}>
          <Text style={styles.navText}>Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')} style={styles.navItem}>
          <Text style={styles.navText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'column', // Arrange the rows vertically
    backgroundColor: '#76c7c0',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',  // Center the navbar items horizontally
  },
  row: {
    flexDirection: 'row',   // Arrange items in each row horizontally
    justifyContent: 'center', // Center items in the row
    marginVertical: 5,       // Space between rows
  },
  navItem: {
    paddingHorizontal: 20,
    marginHorizontal: 10,    // Space between navbar items horizontally
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomNavbar;