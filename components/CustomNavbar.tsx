import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';


const CustomNavbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Shower')} style={styles.navItem}>
        <Text style={styles.navText}>Shower</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Alert')} style={styles.navItem}>
        <Text style={styles.navText}>Alert</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PurchaseScreen')} style={styles.navItem}>
        <Text style={styles.navText}>Purchase</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#76c7c0',
    paddingVertical: 10,
    width: '100%'
  },
  navItem: {
    paddingHorizontal: 20,
  },
  navText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});

export default CustomNavbar;