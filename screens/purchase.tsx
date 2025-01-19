import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, SafeAreaView } from 'react-native';
import CustomNavbar from 'components/CustomNavbar';
import deodorant from '../assets/deodorant.png';
import towel from '../assets/towel.png';
import soap from '../assets/soap.png';

const PurchaseScreen = () => {d
  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.header}>Purchase Your Shower Items Now!</Text>

        <Text style={styles.description}>
          Buy what you need to stay fresh and clean, you smelly human...
        </Text>

        <View style={styles.linkContainer}>
          {/* Deo Link Card */}
          <View style={styles.linkCard}>
            <Image source={deodorant} style={styles.logo} />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://shopee.sg/search?keyword=deodorant'
                )
              }
            >
              <Text style={styles.linkText}>Deodorant</Text>
            </TouchableOpacity>
          </View>

          {/* Amazon Link Card */}
          <View style={styles.linkCard}>
            <Image source={towel} style={styles.logo} />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://shopee.sg/search?keyword=towel')
              }
            >
              <Text style={styles.linkText}>Towels</Text>
            </TouchableOpacity>
          </View>

          {/* Soap Link Card */}
          <View style={styles.linkCard}>
            <Image source={soap} style={styles.logo} />
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://shopee.sg/search?keyword=head%20%26%20shoulder%20shampoo')
              }
            >
              <Text style={styles.linkText}>Body Wash</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>
          &copy; 2025 NUS team1234 | Designed with care.
        </Text>
      </View>

      {/* Navbar */}
      <CustomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between', // Ensure navbar is at the bottom
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: '#104376',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontFamily: 'Arial',
    fontSize: 18,
    color: '#03305e',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  linkCard: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#ffa385',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  linkText: {
    color: '#03305e',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#f8f8f8',
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PurchaseScreen;
