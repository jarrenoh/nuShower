import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import CustomNavbar from 'components/CustomNavbar';
import lazada from '../assets/lazada.png';
import amazon from '../assets/amazon.png';
import shopee from '../assets/shopee.png';

const PurchaseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Purchase Your Soap Now!</Text>

      <Text style={styles.description}>
        discover & buy high-quality body washes from trusted online stores:
      </Text>

      <View style={styles.linkContainer}>
        {/* Lazada Link Card */}
        <View style={styles.linkCard}>
          <Image
            source={lazada} // Use the imported image
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.lazada.sg/shop-healthbeauty-bathbody-bodysoapsshowergels-bodywash/')}
          >
            <Text style={styles.linkText}>shop on Lazada</Text>
          </TouchableOpacity>
        </View>

        {/* Amazon Link Card */}
        <View style={styles.linkCard}>
          <Image
            source={amazon}
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.amazon.sg/s?k=amazon+body+wash&adgrpid=94984823719&hvadid=587401489396&hvdev=c&hvlocphy=9062542&hvnetw=g&hvqmt=e&hvrand=9494914807759701025&hvtargid=kwd-361201549438&hydadcr=1056_339584&tag=googlepcstdsg-22&ref=pd_sl_4w6jff7hft_e')}
          >
            <Text style={styles.linkText}>shop on Amazon</Text>
          </TouchableOpacity>
        </View>

        {/* Shopee Link Card */}
        <View style={styles.linkCard}>
          <Image
            source={shopee}
            style={styles.logo}
          />
          <TouchableOpacity
            onPress={() => Linking.openURL('https://shopee.sg/search?keyword=body%20wash&is_from_login=true')}
          >
            <Text style={styles.linkText}>shop on Shopee</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>
        &copy; 2025 NUS team1234 | Designed with care.
      </Text>
      <CustomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: '#104376', // Navy Blue
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontFamily: 'Arial', // font
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
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: 100,
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
