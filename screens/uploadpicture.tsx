import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { doc, updateDoc, arrayUnion, getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore imports
import { FIREBASE_AUTH } from 'firebase'; // Assuming FIREBASE_AUTH is initialized and exported
import CustomNavbar from 'components/CustomNavbar';


export default function FrontPage() {
  const [imageUri, setImageUri] = useState(null); // State to store the selected image URI
  const user = FIREBASE_AUTH.currentUser; // Get the current user

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo', // Specify that only photos should be selectable
        selectionLimit: 1,  // Allow only one image to be selected
      });
  
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.assets && result.assets.length > 0) {
        // Access the selected image
        const asset = result.assets[0];
        setImageUri(asset.uri); // Save the URI of the selected image
        console.log('Selected image:', asset.uri);
      } else {
        console.log('No image selected');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Something went wrong while picking the image.');
    }
  };
  

  const handleUpload = () => {
    if (imageUri) {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();

      Alert.alert('Shower Logged', `Date: ${date}\nTime: ${time}`);
    } else {
      Alert.alert('No image', 'Please select an image to upload.');
    }
  };

  

  const handleTimestampUpload = async () => {
    const user = FIREBASE_AUTH.currentUser;
  
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
  
    console.log('Preparing to upload timestamp for user:', user.uid);
  
    try {
      // Get a reference to the user's document
      const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
  
      // Update the document with the new timestamp
      await updateDoc(userDocRef, {
        timestamps: arrayUnion(timestamp), // Add the timestamp to an array
      });
  
      Alert.alert('Timestamp Uploaded', `Date: ${timestamp.date}\nTime: ${timestamp.time}`);
      console.log('Timestamp successfully added for user:', user.uid);
    } catch (error) {
      console.error('Error uploading timestamp:', error.message);
      Alert.alert('Error', `Failed to upload timestamp. ${error.message}`);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        nu<Text style={styles.orange}>S</Text>hower
      </Text>

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

        <TouchableOpacity style={styles.timestampButton} onPress={handleTimestampUpload}>
          <Text style={styles.uploadButtonText}>Log Timestamp</Text>
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
  timestampButton: {
    backgroundColor: '#32CD32', // Green color for timestamp button
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
