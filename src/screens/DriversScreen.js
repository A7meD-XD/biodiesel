import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';


const orders = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    customerId: 778844,

  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    customerId: 778844,

  },
  {
    id: 3,
    name: "Robert Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    customerId: 778844,

  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=4",
    customerId: 778844,

  },
  {
    id: 5,
    name: "Michael Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    customerId: 778844,

  },
  {
    id: 6,
    name: "Sarah Brown",
    avatar: "https://i.pravatar.cc/150?img=6",
    customerId: 778844,

  },
];

const { width } = Dimensions.get('window');

export default function OrdersScreen() {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => console.log('Call pressed for', item.name)}
      >
        <Ionicons name="call" size={20} color="#1FAF38" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => console.log('Chat pressed for', item.name)}
      >
        <Ionicons name="chatbubble" size={20} color="#1FAF38" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.iconButton} 
        onPress={() => console.log('Location pressed for', item.name)}
      >
        <Entypo name="location-pin" size={24} color="#1FAF38" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Tracking All Drivers</Text>
          <Text style={styles.subtitle}>Carriers Details</Text>
        </View>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerContent: {
    justifyContent: 'center',
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#1FAF38',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF7F50',
    textAlign: 'left',
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  orderContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 7,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: { 
    width: 46, 
    height: 46, 
    borderRadius: 25, 
    borderWidth: 0,
    borderColor: '#1FAF38',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 13,
    color: '#333',
  },
  iconButton: {
    padding: 8,
    marginLeft: 5,
  },
});