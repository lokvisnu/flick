import { View, Text, StyleSheet, FlatList, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../theme';
import FlickCard from '../components/FlickCard';

function HomeSceen():JSX.Element {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          ]);
          if (
            granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
            granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('You can use the storage');
          } else {
            console.log('Storage permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestPermissions();
  },[]);
  const flicks: Flick[] = [
    {
      id: '1',
      imageUrl: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '2',
      imageUrl: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '3',
      imageUrl: 'https://via.placeholder.com/150',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flicks</Text>
      <View style={styles.flickContainer}>
          <FlatList
            data={flicks}
            renderItem={({ item }:{item:Flick}) => (
              <FlickCard flick={item} />
            )}
            keyExtractor={item => item.id}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primaryBackground,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.primaryText,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  flickContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
export default HomeSceen