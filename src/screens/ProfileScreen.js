// ProfileScreen.js
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
  const [editField, setEditField] = useState(null); // null or key of field
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

  // حفظ التعديل
  const saveEdit = () => {
    setData(prev => ({ ...prev, [editField]: tempValue }));
    setEditField(null);
    setTempValue('');
  };

  // إلغاء التعديل
  const cancelEdit = () => {
    setEditField(null);
    setTempValue('');
  };

  // صفوف المعلومات مع إعداداتها
  const fields = [
    { key: 'fullName', icon: 'person', label: 'Full Name' },
    { key: 'password', icon: 'visibility', label: 'Password' },
    { key: 'email', icon: 'email', label: 'Email' },
    { key: 'phone', icon: 'phone', label: 'Phone' },
    { key: 'birthday', icon: 'calendar-today', label: 'Birthday' },
    { key: 'location', icon: 'location-on', label: 'Location' },
  ];

  // دالة لرندر صف واحد إما Text أو TextInput مع أزرار حفظ/إلغاء
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
    backgroundColor: '#f5f5f5' // خلفية عامة للشاشة
  },
  header: {
    backgroundColor: '#1FAF38', // لون خلفية الهيدر (أخضر)
    alignItems: 'center', // توسيط العناصر أفقيًا
    paddingTop: 50, // تباعد علوي للهيدر
    paddingBottom: 10, // تباعد سفلي للهيدر
    borderBottomLeftRadius: 160, // تدوير الزوايا السفلية
    borderBottomRightRadius: 160, // شكل نصف دائري
    position: 'relative', // لتحديد مكان الأزرار المطلقة
  },
  backBtn: { 
    position: 'absolute', // زر العودة ثابت في مكانه
    top: 50, 
    left: 20 
  },
  settingsBtn: { 
    position: 'absolute', // زر الإعدادات ثابت
    top: 50, 
    right: 20 
  },
  name: {
    fontSize: 20,
    color: '#fff', // اسم المستخدم باللون الأبيض
    fontWeight: 'bold',
    marginTop: 80, // تباعد كبير من الأعلى لترك مساحة للصورة
  },
  job: { 
    fontSize: 14, 
    color: '#e0ffe0' // لون باهت للمهنة
  },
  avatarWrapper: {
    position: 'absolute', // مغلف الصورة مطلق
    top: '70%', // تحديد موقع رأسي
    transform: [{ translateY: -40 }], // رفع الصورة للأعلى
    backgroundColor: '#fff', // خلفية بيضاء للصورة
    borderRadius: 50, // تدوير الخلفية
    padding: 2, // تباعد داخلي بسيط
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40 // جعل الصورة دائرية
  },
  editAvatar: {
    position: 'absolute', // زر تعديل الصورة داخل الدائرة
    bottom: 0,
    right: 0,
    backgroundColor: '#00b300', // لون أخضر
    borderRadius: 10, // تدوير الزوايا
    padding: 3, // تباعد داخلي
  },
  infoSection: { 
    marginTop: 60, // تباعد كبير من الأعلى (لإفساح مجال للصورة)
    paddingHorizontal: 25 // تباعد جانبي
  },
  infoRow: {
    backgroundColor: '#fff', // خلفية بيضاء لكل صف
    padding: 12, // تباعد داخلي
    marginBottom: 12, // تباعد بين الصفوف
    borderRadius: 12, // تدوير زوايا الصف
    flexDirection: 'row', // توزيع العناصر أفقيًا
    justifyContent: 'space-between', // مسافة بين العناصر
    alignItems: 'center', // توسيط عمودي
    elevation: 2, // ظل خفيف (لأندرويد)
    // للـ iOS نضيف ظلًا بديلاً:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rowLeft: { 
    flexDirection: 'row', // العناصر جنبًا إلى جنب
    alignItems: 'center', // توسيط عمودي
    gap: 10 // مسافة بين الأيقونة والنص
  },
  infoText: { 
    fontSize: 16, 
    color: '#444' // لون نص غامق
  },
  input: {
    flex: 1, // يأخذ كل المساحة المتاحة
    paddingVertical: 0, // إزالة التباعد الرأسي
    borderBottomWidth: 1, // خط سفلي
    borderColor: '#ccc' // لون الخط
  },
  rowActions: { 
    flexDirection: 'row' // الأزرار في خط أفقي
  },
  actionBtn: { 
    marginLeft: -35, // تقليل المسافة بين الأزرار نفسها
    padding: 4, // جعل الأزرار أصغر
    borderRadius: 6, // تدوير الزوايا
  },
  buttons: {
    flexDirection: 'row', // الأزرار في صف واحد
    justifyContent: 'space-between', // توزيع المساحة بينها
    paddingHorizontal: 25, // تباعد جانبي
    marginTop: 20, // تباعد علوي
  },
  supportBtn: {
    backgroundColor: '#00b300', // لون أخضر
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutBtn: {
    backgroundColor: '#e53935', // لون أحمر
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: { 
    color: '#fff', // نص الأزرار أبيض
    fontSize: 16 
  },
});