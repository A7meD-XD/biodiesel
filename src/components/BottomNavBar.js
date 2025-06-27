import React, { useEffect, useMemo } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Animated,
  Dimensions,
  Platform
} from 'react-native';

const BottomNavBar = ({ state, descriptors, navigation }) => {
  const tabs = useMemo(() => [
    { name: 'Home', icon: require('../../assets/home.png') },
    { name: 'Orders', icon: require('../../assets/orders.png') },
    { name: 'Drivers', icon: require('../../assets/drivers.png') },
    { name: 'Profile', icon: require('../../assets/profile.png') },
  ], []);

  const animations = useMemo(() => 
    tabs.map(() => new Animated.Value(0))
  , [tabs]);

  // احتساب ارتفاع الشاشة لتحديد موضع النافبار
  const screenHeight = Dimensions.get('window').height;
  const navBarHeight = 45;
  const bottomPadding = Platform.OS === 'android' ? 20 : 0;
  const totalHeight = navBarHeight + bottomPadding;

  useEffect(() => {
    const currentIndex = state.index;
    
    animations.forEach(anim => {
      Animated.spring(anim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }).start();
    });
    
    Animated.spring(animations[currentIndex], {
      toValue: -40,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [state.index, animations]);

  return (
    <View style={[styles.container, { height: totalHeight }]}>
      <View style={styles.navBarContent} accessibilityRole="tablist">
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(tab.name);
            }
          };

          const onLongPress = () => {
            console.log(`Long pressed ${tab.name}`);
          };

          return (
            <TouchableOpacity
              key={tab.name}
              accessibilityRole="tab"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={descriptors[tab.name]?.options.tabBarAccessibilityLabel || tab.name}
              testID={descriptors[tab.name]?.options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Animated.View 
                style={[
                  styles.iconWrapper,
                  isFocused ? styles.activeTab : null,
                  { transform: [{ translateY: animations[index] }] },
                ]}
              >
                {isFocused && (
                  <>
                    <View style={styles.blackCircle} />
                    <View style={styles.whiteBorder} />
                  </>
                )}
                
                <Image
                  source={tab.icon}
                  style={[
                    styles.icon,
                    isFocused ? { tintColor: '#F5F5F5' } : { tintColor: '#F5F5F5' },
                  ]}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#38ab4c',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 }, // قللنا ارتفاع الظل
    shadowOpacity: 0.2,
    shadowRadius: 6, // قللنا انتشار الظل
    paddingBottom: Platform.OS === 'android' ? 15 : 0, // قللنا المساحة الإضافية
    height: 75, // قللنا الارتفاع الكلي من 100 إلى 75
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75, // قللنا ارتفاع المحتوى من 100 إلى 75
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // قللنا من 60 إلى 50
    height: 50, // قللنا من 60 إلى 50
    borderRadius: 25, // نصف القطر الجديد = نصف العرض/الارتفاع
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 }, // قللنا ارتفاع الظل
    shadowOpacity: 0.3,
    shadowRadius: 5, // قللنا انتشار الظل
    elevation: 8, // قللنا ارتفاع الظل للأندرويد
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  blackCircle: {
    position: 'absolute',
    width: 58, // قللنا من 72 إلى 58
    height: 58, // قللنا من 72 إلى 58
    borderRadius: 29, // نصف القطر الجديد
    backgroundColor: '#000000',
    zIndex: -1,
    top: -4, // عدلنا الموضع
    left: -4, // عدلنا الموضع
  },
  whiteBorder: {
    position: 'absolute',
    width: 70,
    height: 37,
    borderBottomStartRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#FFFFFF',
    zIndex: -2,
    top: 25,
    left: -10.5,
  },
  icon: {
    width: 22, // قللنا من 25 إلى 22
    height: 22, // قللنا من 25 إلى 22
  },
});

export default BottomNavBar;