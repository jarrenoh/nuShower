import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, SafeAreaView } from 'react-native';
import { doc, updateDoc, arrayUnion, getFirestore, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH } from 'firebase'; // Assuming FIREBASE_AUTH is initialized and exported
import CustomNavbar from 'components/CustomNavbar';
import { useNavigation } from '@react-navigation/native';

export default function FrontPage() {
  const [lastShower, setLastShower] = useState(null); // State to store the last shower timestamp
  const user = FIREBASE_AUTH.currentUser; // Get the current user
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLastShower = async () => {
      if (user) {
        try {
          const userDocRef = doc(getFirestore(), 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const timestamps = userDoc.data().timestamps || [];
            if (timestamps.length > 0) {
              const lastTimestamp = timestamps[timestamps.length - 1]; // Get the latest timestamp
              setLastShower(`${lastTimestamp.date} at ${lastTimestamp.time}`);
            } else {
              setLastShower('No record available.');
            }
          }
        } catch (error) {
          console.error('Error fetching last shower timestamp:', error);
          Alert.alert('Error', 'Unable to fetch the last shower timestamp.');
        }
      }
    };

    fetchLastShower();
  }, [user]);

  const handleTimestampUpload = async () => {
    if (!user) {
      Alert.alert('Error', 'No user is logged in.');
      return;
    }

    const now = new Date();
    const timestamp = {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      createdAt: now,
    };

    try {
      const userDocRef = doc(getFirestore(), 'users', user.uid);
      await updateDoc(userDocRef, {
        timestamps: arrayUnion(timestamp),
      });

      setLastShower(`${timestamp.date} at ${timestamp.time}`);
      Alert.alert('Timestamp Uploaded', `Date: ${timestamp.date}\nTime: ${timestamp.time}`);
    } catch (error) {
      console.error('Error uploading timestamp:', error.message);
      Alert.alert('Error', `Failed to upload timestamp. ${error.message}`);
    }
  };

  const handleSignOut = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        Alert.alert('Signed Out', 'You have been successfully signed out.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
        Alert.alert('Error', 'Failed to sign out.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.uploadTitle}>Your Last Shower:</Text>
        <Text style={styles.lastShowerText}>{lastShower || 'Loading...'}</Text>

        <TouchableOpacity style={[styles.button, styles.timestampButton]} onPress={handleTimestampUpload}>
          <Text style={styles.buttonText}>Log Shower</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.showerButton]} onPress={() => Linking.openURL('https://maps.app.goo.gl/2ZThXp6xrsazqEjB7')}>
          <Text style={styles.buttonText}>Find a Shower Near You</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <CustomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  uploadTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lastShowerText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: 200,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  timestampButton: {
    backgroundColor: '#6DAF6D',
  },
  showerButton: {
    backgroundColor: '#4169e1',
  },
  signOutButton: {
    backgroundColor: '#D64531',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
