import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import CustomNavbar from 'components/CustomNavbar';

const alert = require('../assets/alert.m4a'); // Load the file directly

const EmergencyAlert: React.FC = () => {
  const playSound = async () => {
    try {
      await Audio.requestPermissionsAsync(); // Request permissions for audio playback
      const { sound } = await Audio.Sound.createAsync(alert);
      await sound.playAsync();
      console.log('Playing sound');
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
      <Text style={styles.title}>Emergency Alert System</Text>
      <Button title="Trigger Alarm" onPress={handleAlert} color="#fa6800" />
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
});

export default EmergencyAlert;
