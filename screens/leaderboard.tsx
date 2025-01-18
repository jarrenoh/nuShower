import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FIREBASE_AUTH } from 'firebase';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';
import CustomNavbar from '../components/CustomNavbar';

const FIREBASE_DB = getFirestore();

interface User {
  id: string;
  email: string;
  lastShowerTime: Date | null;
}

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

      // Map the data into a User array
      const data: User[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const userData = doc.data();
        const lastShowerTime = userData.timestamps?.[userData.timestamps.length - 1]?.createdAt?.toDate() || null;

        return {
          id: doc.id,
          email: userData.email || 'No email available',
          lastShowerTime,
        };
      });

      // Sort users by the longest last shower time first, followed by users with no data (null)
      data.sort((a, b) => {
        // If both have lastShowerTime, sort by the time difference (longest time first)
        if (a.lastShowerTime && b.lastShowerTime) {
          return a.lastShowerTime.getTime() - b.lastShowerTime.getTime(); // descending order
        }
        // If a has no lastShowerTime, move it to the end (but keep b in the list)
        if (!a.lastShowerTime) return 1;
        // If b has no lastShowerTime, move it to the end (but keep a in the list)
        if (!b.lastShowerTime) return -1;
        return 0;
      });

      setLeaderboardData(data);
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
          <Text style={styles.rank}>{index + 1}</Text>
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
  email: {
    fontSize: 18,
  },
  specialText: {
    fontSize: 14,
    color: '#888',
  },
});

export default LeaderboardScreen;
