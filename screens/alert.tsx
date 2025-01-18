import React from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import CustomNavbar from 'components/CustomNavbar';
import sos from '../assets/sos.png';

const alert = require('../assets/alert.mp3'); // Load the file directly

const EmergencyAlert: React.FC = () => {
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      console.log('Loading sound...');
      await soundObject.loadAsync(alert); // Load the sound file
      console.log('Playing sound...');
      await soundObject.playAsync(); // Play the sound

      // Optionally unload the sound after playback
      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          soundObject.unloadAsync(); // Unload the sound
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Error', 'Unable to play sound. Please check the file path or permissions.');
    }
  };

  const handleAlert = () => {
    playSound(); // Play the alert sound only
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peeping Tom Alert</Text>
      
      <TouchableOpacity onPress={handleAlert}>
        <Image source={sos} style={styles.sos} />
      </TouchableOpacity>
      <CustomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#173e78',
  },
  title: {
    fontSize: 24,
    color: '#fa6800',
    marginBottom: 20,
  },
  sos: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default EmergencyAlert;
