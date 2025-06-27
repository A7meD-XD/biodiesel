import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const INITIAL_DATA = {
  fullName: 'Joe Doe',
  password: '••••••••',
  email: 'joedoe@gmail.com',
  phone: '+1 557484',
  birthday: '17, May 1988',
  location: 'New York, USA',
};

export default function ProfileScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState('https://randomuser.me/api/portraits/men/41.jpg');
  const [data, setData] = useState(INITIAL_DATA);
  const [editField, setEditField] = useState(null); 
  const [tempValue, setTempValue] = useState('');

  // فتح الـ image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('محتاج صلاحية للوصول للصور');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  };

  const saveEdit = () => {
    setData(prev => ({ ...prev, [editField]: tempValue }));
    setEditField(null);
    setTempValue('');
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue('');
  };

  const fields = [
    { key: 'fullName', icon: 'person', label: 'Full Name' },
    { key: 'password', icon: 'visibility', label: 'Password' },
    { key: 'email', icon: 'email', label: 'Email' },
    { key: 'phone', icon: 'phone', label: 'Phone' },
    { key: 'birthday', icon: 'calendar-today', label: 'Birthday' },
    { key: 'location', icon: 'location-on', label: 'Location' },
  ];

  const renderRow = ({ key, icon }) => {
    const isEditing = editField === key;
    return (
      <View key={key} style={styles.infoRow}>
        <View style={styles.rowLeft}>
          <MaterialIcons name={icon} size={20} color="#444" />
          {isEditing ? (
            <TextInput
              style={[styles.infoText, styles.input]}
              value={tempValue}
              onChangeText={setTempValue}
              autoFocus
            />
          ) : (
            <Text style={styles.infoText}>{data[key]}</Text>
          )}
        </View>

        {isEditing ? (
          <View style={styles.rowActions}>
            <TouchableOpacity onPress={saveEdit} style={styles.actionBtn}>
              <MaterialIcons name="check" size={20} color="#00b300" />
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEdit} style={styles.actionBtn}>
              <MaterialIcons name="close" size={20} color="#e53935" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => {
            setEditField(key);
            setTempValue(data[key]);
          }}>
            <MaterialIcons name="edit" size={20} color="#00b300" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => {/* to settings */}}
          >
            <Ionicons name="settings" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.name}>{data.fullName}</Text>
          <Text style={styles.job}>Director</Text>

          <View style={styles.avatarWrapper}>
            <Image source={{ uri: photoUri }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editAvatar}
              onPress={pickImage}
            >
              <MaterialIcons name="edit" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {fields.map(renderRow)}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.supportBtn}
            onPress={() => {/* open support */}}
          >
            <Text style={styles.btnText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {/* log out */}}
          >
            <Text style={styles.btnText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  header: {
    backgroundColor: '#1FAF38', 
    alignItems: 'center', 
    paddingTop: 50, 
    paddingBottom: 10, 
    borderBottomLeftRadius: 160, 
    borderBottomRightRadius: 160, 
    position: 'relative', 
  },
  backBtn: { 
    position: 'absolute', 
    top: 50, 
    left: 20 
  },
  settingsBtn: { 
    position: 'absolute', 
    top: 50, 
    right: 20 
  },
  name: {
    fontSize: 20,
    color: '#fff', 
    fontWeight: 'bold',
    marginTop: 80, 
  },
  job: { 
    fontSize: 14, 
    color: '#e0ffe0' 
  },
  avatarWrapper: {
    position: 'absolute', 
    top: '70%', 
    transform: [{ translateY: -40 }], 
    backgroundColor: '#fff', 
    borderRadius: 50, 
    padding: 2, 
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40 
  },
  editAvatar: {
    position: 'absolute', 
    bottom: 0,
    right: 0,
    backgroundColor: '#00b300', 
    borderRadius: 10, 
    padding: 3, 
  },
  infoSection: { 
    marginTop: 60, 
    paddingHorizontal: 25 
  },
  infoRow: {
    backgroundColor: '#fff', 
    padding: 12, 
    marginBottom: 12, 
    borderRadius: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rowLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  infoText: { 
    fontSize: 16, 
    color: '#444' 
  },
  input: {
    flex: 1, 
    paddingVertical: 0, 
    borderBottomWidth: 1, 
    borderColor: '#ccc' 
  },
  rowActions: { 
    flexDirection: 'row' 
  },
  actionBtn: { 
    marginLeft: -35, 
    padding: 4, 
    borderRadius: 6, 
  },
  buttons: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 25, 
    marginTop: 20, 
  },
  supportBtn: {
    backgroundColor: '#00b300', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutBtn: {
    backgroundColor: '#e53935', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: { 
    color: '#fff', 
    fontSize: 16 
  },
});