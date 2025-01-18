import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc, arrayUnion, getFirestore, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH } from 'firebase'; // Assuming FIREBASE_AUTH is initialized and exported
import CustomNavbar from 'components/CustomNavbar';
import { useNavigation } from '@react-navigation/native';

export default function FrontPage() {
  const [lastShower, setLastShower] = useState(null); // State to store the last shower timestamp
  const user = FIREBASE_AUTH.currentUser; // Get the current user
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the last timestamp when the component mounts
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
      // Get a reference to the user's document
      const userDocRef = doc(getFirestore(), 'users', user.uid);

      // Update the document with the new timestamp
      await updateDoc(userDocRef, {
        timestamps: arrayUnion(timestamp), // Add the timestamp to an array
      });

      setLastShower(`${timestamp.date} at ${timestamp.time}`); // Update the display
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
    <View style={styles.container}>
      <Text style={styles.header}>
        nu<Text style={styles.orange}>S</Text>hower
      </Text>

      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>Your Last Shower:</Text>
        <Text style={styles.lastShowerText}>{lastShower || 'Loading...'}</Text>

        <TouchableOpacity style={styles.timestampButton} onPress={handleTimestampUpload}>
          <Text style={styles.uploadButtonText}>Log Shower</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.uploadButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <CustomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 36,
    fontFamily: 'Great Vibes',
    color: '#173e78',
    textAlign: 'center',
  },
  orange: {
    color: '#fa6800',
  },
  uploadContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: '80%',
    alignItems: 'center',
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
  timestampButton: {
    backgroundColor: '#32CD32', // Green color for timestamp button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#FF4500', // Red color for sign out button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
