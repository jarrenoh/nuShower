import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { FIREBASE_AUTH } from 'firebase';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import CustomNavbar from '../components/CustomNavbar';
import { Audio } from 'expo-av';

const stinky = require('../assets/stinky.mp3');

const FIREBASE_DB = getFirestore();

interface User {
  id: string;
  email: string;
  lastShowerTime: Date | null;
}

const playAlertSound = async () => {
  const sound = new Audio.Sound();
  try {
    await sound.loadAsync(stinky);
    await sound.playAsync();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

const LeaderboardScreen: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const currentUserId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
  
      // Fetch all user documents from the "users" collection
      const snapshot = await getDocs(collection(FIREBASE_DB, 'users'));
  
      const data: User[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const userData = doc.data();
  
        // Ensure timestamps is a valid array
        const timestamps = Array.isArray(userData.timestamps) ? userData.timestamps : [];
  
        // Get the last timestamp and validate it
        const lastTimestamp = timestamps[timestamps.length - 1];
        const lastShowerTime = lastTimestamp?.createdAt?.toDate?.() || null;
  
        return {
          id: doc.id,
          email: userData.email || 'No email available',
          lastShowerTime,
        };
      });
  
      // Sort users by the longest last shower time first, followed by users with no data (null)
      data.sort((a, b) => {
        if (a.lastShowerTime && b.lastShowerTime) {
          return a.lastShowerTime.getTime() - b.lastShowerTime.getTime();
        }
        if (!a.lastShowerTime) return 1;
        if (!b.lastShowerTime) return -1;
        return 0;
      });
  
      setLeaderboardData(data);
  
      // Check the current user's last shower time
      const currentUser = data.find((user) => user.id === currentUserId);
      if (currentUser && currentUser.lastShowerTime) {
        const now = new Date();
        const diffInHours = (now.getTime() - currentUser.lastShowerTime.getTime()) / (1000 * 60 * 60);
  
        if (diffInHours > 8) {
          await playAlertSound();
          Alert.alert('Reminder', 'It has been over 8 hours since your last shower. Time to freshen up!');
        }
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      setLoading(false);
    }
  };
  

  const formatTimeElapsed = (lastShowerTime: Date | null): string => {
    if (!lastShowerTime) return 'No data available';
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastShowerTime.getTime()) / 1000);
    const hours = String(Math.floor(diffInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((diffInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(diffInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const renderItem = ({ item, index }: { item: User; index: number }) => {
    const timeElapsed = formatTimeElapsed(item.lastShowerTime);

    return (
      <View style={[styles.item, item.id === currentUserId && styles.highlightedItem]}>
        <View style={styles.userInfo}>
          {index === 0 ? (
            // Show the image for first place
            <Image
              source={require('../assets/istockphoto-164109600-612x612.jpg')} // Path to your jpg image
              style={styles.rankImage}
            />
          ) : (
            <Text style={styles.rank}>{index + 1}</Text>
          )}
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.specialText}>{timeElapsed}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MUSTIEST MF</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={leaderboardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <CustomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  highlightedItem: {
    backgroundColor: '#7DF9FF',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailContainer: {
    marginLeft: 10,
  },
  rank: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rankImage: {
    width: 40,
    height: 40,
  },
  email: {
    fontSize: 18,
  },
  specialText: {
    fontSize: 14,
    color: '#888',
  },
});

export default LeaderboardScreen;