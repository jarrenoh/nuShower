import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, SafeAreaView } from 'react-native';
import { doc, updateDoc, arrayUnion, getFirestore, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH } from 'firebase'; // Assuming FIREBASE_AUTH is initialized and exported
import CustomNavbar from 'components/CustomNavbar';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const stinky = require('../assets/stinky.mp3');

export default function FrontPage() {
  const [lastShower, setLastShower] = useState<string | null>(null); // State to store the last shower timestamp
  const user = FIREBASE_AUTH.currentUser; // Get the current user
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLastShowerAndCheckAlert = async () => {
      if (user) {
        try {
          const userDocRef = doc(getFirestore(), 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const timestamps = userDoc.data().timestamps || [];
            if (timestamps.length > 0) {
              const lastTimestamp = timestamps[timestamps.length - 1]?.createdAt;
              const lastShowerTime = lastTimestamp.toDate ? lastTimestamp.toDate() : new Date(lastTimestamp);

              setLastShower(`${lastShowerTime.toLocaleDateString()} at ${lastShowerTime.toLocaleTimeString()}`);

              // Calculate hours since last shower
              const now = new Date();
              const hoursSinceLastShower = (now.getTime() - lastShowerTime.getTime()) / (1000 * 60 * 60);

              if (hoursSinceLastShower > 8) {
                // Play sound and show alert
                await playAlertSound();
                Alert.alert('Reminder', 'It’s been more than 8 hours since your last shower. Time to freshen up!');
              }
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

    fetchLastShowerAndCheckAlert();
  }, [user]);

  const playAlertSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(stinky);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

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
