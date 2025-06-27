import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  TouchableWithoutFeedback,
  Pressable
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const orders = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    isVip: true,
    orderId: 15907,
    customerId: 778844,
    liters: 5,
    bottles: 3,
    date: "25, May , 2025",
    time: "09:00 AM",
    total: 1658,
    description: "طلب مياه معدنية مع توصيل سريع. العميل يفضل زجاجات صغيرة الحجم.",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    isVip: false,
    orderId: 15908,
    customerId: 778845,
    liters: 10,
    bottles: 5,
    date: "26, May , 2025",
    time: "11:00 AM",
    total: 2150,
    description: "توصيل إلى الطابق الثالث بدون مصعد. يرجى الحذر أثناء النقل.",
  },
  {
    id: 3,
    name: "Robert Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    isVip: true,
    orderId: 15909,
    customerId: 778846,
    liters: 8,
    bottles: 4,
    date: "27, May , 2025",
    time: "02:30 PM",
    total: 1895,
    description: "العميل يفضل مياه باردة. يرجى التأكد من درجة الحرارة قبل التوصيل.",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=4",
    isVip: false,
    orderId: 15910,
    customerId: 778847,
    liters: 12,
    bottles: 6,
    date: "28, May , 2025",
    time: "10:15 AM",
    total: 2450,
    description: "طلب كبير لمناسبة خاصة. يرجى التوصيل قبل الساعة 11 صباحاً.",
  },
  {
    id: 5,
    name: "Michael Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    isVip: true,
    orderId: 15911,
    customerId: 778848,
    liters: 7,
    bottles: 4,
    date: "29, May , 2025",
    time: "03:00 PM",
    total: 1750,
    description: "العميل يطلب مياه من نوعية خاصة. يرجى التأكد من توفرها قبل التوصيل.",
  },
  {
    id: 6,
    name: "Sarah Brown",
    avatar: "https://i.pravatar.cc/150?img=6",
    isVip: false,
    orderId: 15912,
    customerId: 778849,
    liters: 9,
    bottles: 5,
    date: "30, May , 2025",
    time: "01:45 PM",
    total: 1995,
    description: "توصيل إلى مكتب في الطابق الثاني عشر. يرجى استخدام المصعد الخلفي.",
  },
];

const { width } = Dimensions.get('window');

export default function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuTimeoutRef = useRef(null);

  const handleMoreDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
    setActiveMenu(null);
  };

  const toggleMenu = (orderId) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setActiveMenu(activeMenu === orderId ? null : orderId);
  };

  const handleMenuAction = (action, order) => {
    setActiveMenu(null);
    if (action === 'moreDetails') {
      handleMoreDetails(order);
    } else {
      console.log(`${action} for ${order.name}`);
    }
  };

  const closeMenu = () => {
    // Add a small delay to allow menu actions to be pressed
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const renderOrderItem = ({ item }) => (
    <Pressable 
      style={[styles.orderContainer, activeMenu === item.id && styles.activeCard]}
      onPress={() => activeMenu && closeMenu()}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      
      {/* Location icon */}
      <TouchableOpacity 
        style={styles.locationIcon} 
        onPress={() => console.log('Location pressed for', item.name)}
      >
        <Entypo name="location-pin" size={24} color="#1FAF38" />
      </TouchableOpacity>
      
      {/* Three-dot menu */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={() => toggleMenu(item.id)}
      >
        <Entypo name="dots-three-vertical" size={20} color="#666" />
      </TouchableOpacity>
      
      {/* Dropdown menu */}
      {activeMenu === item.id && (
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <TouchableOpacity 
              style={styles.menuAction} 
              onPress={() => handleMenuAction('call', item)}
            >
              <Ionicons name="call" size={20} color="#1FAF38" style={styles.menuIcon} />
              <Text style={styles.menuText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuAction} 
              onPress={() => handleMenuAction('chat', item)}
            >
              <Ionicons name="chatbubble" size={20} color="#1FAF38" style={styles.menuIcon} />
              <Text style={styles.menuText}>Chat</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.moreDetailsButton} 
            onPress={() => handleMenuAction('moreDetails', item)}
          >
            <Text style={styles.moreDetailsText}>More Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Orders Received</Text>
        </View>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal for Details */}
      {selectedOrder && (
        <Modal visible={modalVisible} animationType="fade" transparent>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Image source={{ uri: selectedOrder.avatar }} style={styles.modalAvatar} />
                    <View style={styles.modalNameContainer}>
                      <Text style={styles.modalName}>{selectedOrder.name}</Text>
                      {selectedOrder.isVip && <Text style={styles.vip}>VIP</Text>}
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                      <Ionicons name="close" size={22} color="white" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Customer ID</Text>
                      <Text style={styles.value}>{selectedOrder.customerId}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Order ID</Text>
                      <Text style={styles.value}>{selectedOrder.orderId}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Liter</Text>
                      <Text style={styles.value}>{selectedOrder.liters}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Bottles</Text>
                      <Text style={styles.value}>{selectedOrder.bottles}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Date</Text>
                      <Text style={styles.value}>{selectedOrder.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Time</Text>
                      <Text style={styles.value}>{selectedOrder.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.label}>Total amount</Text>
                      <Text style={[styles.value, styles.totalAmount]}>EGP{selectedOrder.total}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.label}>Description</Text>
                      <Text style={styles.descriptionText}>{selectedOrder.description}</Text>
                    </View>
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
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
    paddingHorizontal: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#FF7F50',
    textAlign: 'center',
    marginBottom: -1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
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
  activeCard: {
    zIndex: 10,
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
  },
  name: { 
    fontWeight: 'bold', 
    fontSize: 13,
    color: '#333',
  },
  locationIcon: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
    width: 180,
    zIndex: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  menuAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    width: '48%',
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  moreDetailsButton: {
    backgroundColor: '#e9f7fe',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1ecff',
  },
  moreDetailsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1FAF38',
  },
  modalOverlay: {
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white', 
    width: width > 500 ? '80%' : '95%',
    maxWidth: 500,
    borderRadius: 20,
    overflow: 'hidden',
    width: width * 0.9, // 90% من عرض الشاشة
  },
  modalHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  modalAvatar: { 
    width: 46, 
    height: 46, 
    borderRadius: 30, 
    borderWidth: 2,
    borderColor: '#1FAF38',
  },
  modalNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 13,
  },
  modalName: { 
    fontWeight: 'bold', 
    fontSize: 15,
    color: 'black',
  },
  vip: {
    backgroundColor: '#1FAF38', 
    color: 'white', 
    paddingHorizontal: 10, 
    paddingVertical: 4,
    borderRadius: 10, 
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold',
  },
  closeBtn: {
    backgroundColor: '#ff4444', 
    borderRadius: 20, 
    padding: 5,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 18,
    maxHeight: 550,
  },
  detailRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 5,
    borderBottomWidth: 1, 
    borderColor: '#f0f0f0',
  },
  label: { 
    fontWeight: '600',
    color: '#306A9F',
    fontSize: 16,
  },
  value: {
    fontWeight: '500',
    color: '#333',
    fontSize: 16,
  },
  totalAmount: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  descriptionContainer: {
    marginTop: 5,
    padding: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  descriptionText: {
    marginTop: 8,
    color: '#333',
    lineHeight: 22,
    fontSize: 16,
    fontWeight: 'bold',
  },

});