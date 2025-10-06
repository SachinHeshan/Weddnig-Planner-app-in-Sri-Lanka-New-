import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import theme from './theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [currentBanner, setCurrentBanner] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons 
          key={i} 
          name={i <= rating ? 'star' : 'star-border'} 
          size={14} 
          color={i <= rating ? '#FFD700' : theme.gray400} 
        />
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  // Banner Data
  const banners = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      title: 'Summer Wedding Special',
      subtitle: 'Get 20% off on all photography packages'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Venue of the Month',
      subtitle: 'Book our premium venues with exclusive deals'
    }
  ];

  // Featured Services Data
  const featuredServices = [
    { id: 1, title: 'Professional Photography', provider: 'Capture Moments', rating: 4.8, price: '$800', discount: '15% off', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Live Band Entertainment', provider: 'The Wedding Band', rating: 4.7, price: '$1200', discount: '20% off', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Bridal Flowers', provider: 'Blooming Beauties', rating: 4.6, price: '$300', discount: '5% off', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ];

  // Hotel Venues Data
  const hotelVenues = [
    { id: 1, title: 'Grand Ballroom Hotel', provider: 'Luxury Venues', rating: 4.9, price: '$2500', capacity: '300 guests', location: 'Downtown', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Oceanview Resort', provider: 'Beachside Weddings', rating: 4.8, price: '$3200', capacity: '250 guests', location: 'Beachfront', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Garden Palace', provider: 'Nature Events', rating: 4.7, price: '$1800', capacity: '200 guests', location: 'City Park', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ];

  const categories = [
    { id: 1, title: 'Venue', icon: 'location-on', color: '#E91E63' },
    { id: 2, title: 'Photography', icon: 'photo-camera', color: '#2196F3' },
    { id: 3, title: 'Beauty', icon: 'spa', color: '#FF9800' },
    { id: 4, title: 'Catering', icon: 'restaurant', color: '#4CAF50' },
    { id: 5, title: 'Music', icon: 'music-note', color: '#9C27B0' },
    { id: 6, title: 'Flowers', icon: 'local-florist', color: '#FF5722' },
    { id: 7, title: 'Invitations', icon: 'mail-outline', color: '#607D8B' },
    { id: 8, title: 'Transport', icon: 'directions-car', color: '#795548' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />
      
      {/* Enhanced Header */}
      <LinearGradient
        colors={['#303030', '#303030']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }} 
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userText}>
              <Text style={styles.welcomeText}>Good Morning</Text>
              <Text style={styles.userName}>Sarah & Michael</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={24} color={theme.textLight} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Hero Banner */}
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.heroOverlay}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Your Dream Wedding Awaits</Text>
              <Text style={styles.heroSubtitle}>Plan perfectly with our expert vendors</Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Start Planning</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('Checklist')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="checklist" size={24} color="#1976D2" />
              </View>
              <Text style={styles.quickActionText}>Checklist</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('VendorDirectory')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#F3E5F5' }]}>
                <MaterialIcons name="search" size={24} color="#7B1FA2" />
              </View>
              <Text style={styles.quickActionText}>Vendors</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('BudgetTracker')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E8' }]}>
                <MaterialIcons name="account-balance-wallet" size={24} color="#388E3C" />
              </View>
              <Text style={styles.quickActionText}>Budget</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FFEBEE' }]}>
                <MaterialIcons name="favorite" size={24} color="#E91E63" />
              </View>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wedding Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => {
                  if (category.title === 'Invitations') {
                    navigation.navigate('Invitation');
                  }
                  // Add navigation for other categories as needed
                }}
              >
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
                  <MaterialIcons name={category.icon as any} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryText}>{category.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredServices.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Image source={{ uri: service.image }} style={styles.serviceImage} />
                <View style={styles.serviceContent}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>{service.discount}</Text>
                    </View>
                  </View>
                  <Text style={styles.serviceProvider}>{service.provider}</Text>
                  <View style={styles.serviceFooter}>
                    <View style={styles.rating}>
                      {renderRating(service.rating)}
                      <Text style={styles.ratingText}>{service.rating}</Text>
                    </View>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Premium Venues */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Premium Venues</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {hotelVenues.map((hotel) => (
            <TouchableOpacity key={hotel.id} style={styles.venueCard}>
              <Image source={{ uri: hotel.image }} style={styles.venueImage} />
              <View style={styles.venueContent}>
                <Text style={styles.venueTitle}>{hotel.title}</Text>
                <View style={styles.venueDetails}>
                  <MaterialIcons name="location-on" size={14} color="#666" />
                  <Text style={styles.venueDetailText}>{hotel.location}</Text>
                  <MaterialIcons name="people" size={14} color="#666" style={styles.detailIcon} />
                  <Text style={styles.venueDetailText}>{hotel.capacity}</Text>
                </View>
                <View style={styles.venueFooter}>
                  <View style={styles.venueRating}>
                    {renderRating(hotel.rating)}
                    <Text style={styles.ratingText}>({hotel.rating})</Text>
                  </View>
                  <Text style={styles.venuePrice}>{hotel.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Wedding Packages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Wedding Packages</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.packagesContainer}>
            <TouchableOpacity style={styles.packageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }} 
                style={styles.packageImage} 
              />
              <View style={styles.packageContent}>
                <Text style={styles.packageTitle}>Premium Wedding Package</Text>
                <Text style={styles.packageDescription}>Complete wedding planning with all essentials</Text>
                <View style={styles.packageFooter}>
                  <Text style={styles.packagePrice}>$2,500</Text>
                  <TouchableOpacity style={styles.packageButton}>
                    <Text style={styles.packageButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.packageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80' }} 
                style={styles.packageImage} 
              />
              <View style={styles.packageContent}>
                <Text style={styles.packageTitle}>Deluxe Photography Package</Text>
                <Text style={styles.packageDescription}>Professional photography and videography services</Text>
                <View style={styles.packageFooter}>
                  <Text style={styles.packagePrice}>$1,200</Text>
                  <TouchableOpacity style={styles.packageButton}>
                    <Text style={styles.packageButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Planning Progress */}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userText: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF4757',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    height: 200,
    position: 'relative',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  heroButtonText: {
    color: theme.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  seeAllText: {
    color: theme.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  quickActionCard: {
    alignItems: 'center',
    width: '25%',
    marginVertical: 10,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  serviceCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 140,
  },
  serviceContent: {
    padding: 12,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  discountTag: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  serviceProvider: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  venueCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  venueImage: {
    width: 100,
    height: 100,
  },
  venueContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  venueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  venueDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueDetailText: {
    fontSize: 12,
    color: '#64748B',
    marginRight: 12,
  },
  detailIcon: {
    marginLeft: 12,
  },
  venueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  venueRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venuePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  progressButton: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  progressButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  packagesContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  packageImage: {
    width: '100%',
    height: 140,
  },
  packageContent: {
    padding: 16,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  packageDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  packageButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  packageButtonText: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;