import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Add image picker library

export default function FrontPage() {
  const [imageUri, setImageUri] = useState(null); // State to store the selected image URI

  const handleImageUpload = () => {
    // Use the image picker to select an image
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      }
    });
  };

  const handleUpload = () => {
    if (imageUri) {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();

      // Show the log entry in an alert (for demo purposes)
      Alert.alert('Shower Logged', `Date: ${date}\nTime: ${time}`);

      // You would also update the calendar/log here
      // For example, storing the log entry in a database or local storage
    } else {
      Alert.alert('No image', 'Please select an image to upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>nu<Text style={styles.orange}>S</Text>hower</Text>

      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>Prove That You Showered</Text>
        <Text style={styles.uploadText}>
          Upload a picture and we’ll log the date and time in your calendar!
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
          <Text style={styles.uploadButtonText}>Choose File</Text>
        </TouchableOpacity>

        {imageUri && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>Uploaded Picture:</Text>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          </View>
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
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
  uploadText: {
    fontSize: 16,
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#4169e1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});