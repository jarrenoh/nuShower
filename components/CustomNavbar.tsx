import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import leaderboad from '../assets/leaderboard.png';
import shop from '../assets/shop.png';
import shower from '../assets/shower.png';
import alert from '../assets/alert.png';

const CustomNavbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Shower')} style={styles.navItem}>
          <Image source={shower} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Alert')} style={styles.navItem}>
          <Image source={alert} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('PurchaseScreen')} style={styles.navItem}>
          <Image source={shop} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')} style={styles.navItem}>
          <Image source={leaderboad} style={styles.icons} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row', // Arrange the rows vertically
    justifyContent: 'space-around', // Space out the rows
    backgroundColor: '#104376', // Navy Blue
    paddingVertical: 10,
    width: '100%',
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
  icons : {
    width: 30,
    height: 30,
  },
});

export default CustomNavbar;