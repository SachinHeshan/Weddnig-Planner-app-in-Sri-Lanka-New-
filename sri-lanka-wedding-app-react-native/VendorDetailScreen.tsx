import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme'; // Import the theme

interface Service {
  id: number;
  title: string;
  provider: string;
  rating: number;
  price: string;
  discount?: string;
  image: string;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  priceRange: string;
  image: string;
  description: string;
  contact: string;
}

interface VendorDetailScreenProps {
  navigation: any;
  route: any;
}

const { width, height } = Dimensions.get('window');

const VendorDetailScreen: React.FC<VendorDetailScreenProps> = ({ navigation, route }) => {
  // Get the vendor data from either HomeScreen (service) or VendorDirectory (vendor)
  const vendorData = route.params?.service || route.params?.vendor;
  
  // Sample additional photos for the gallery
  const [additionalPhotos] = useState([
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1529753253655-470be9a42781?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  ]);

  // Sample past work/projects
  const [pastWork] = useState([
    {
      id: 1,
      title: 'Beach Wedding Ceremony',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      date: 'June 2023',
      location: 'Malibu, CA'
    },
    {
      id: 2,
      title: 'Garden Wedding Reception',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      date: 'April 2023',
      location: 'Santa Barbara, CA'
    },
    {
      id: 3,
      title: 'Destination Wedding',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      date: 'February 2023',
      location: 'Hawaii'
    }
  ]);

  // Sample recommendations
  const [recommendations] = useState([
    {
      id: 1,
      name: 'Elegant Venues',
      category: 'Venue',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Capture Moments',
      category: 'Photography',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Sweet Celebrations',
      category: 'Catering',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons 
          key={i} 
          name={i <= rating ? 'star' : 'star-border'} 
          size={16} 
          color={i <= rating ? theme.primary : theme.gray400} 
        />
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  const contactVendor = () => {
    Alert.alert(
      'Contact Vendor',
      `Would you like to contact ${vendorData?.title || vendorData?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: () => console.log('Email vendor') },
        { text: 'Call', onPress: () => console.log('Call vendor') }
      ]
    );
  };

  const addToPackage = () => {
    Alert.alert(
      'Add to Package',
      `Add ${vendorData?.title || vendorData?.name} to your wedding package?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: () => {
            Alert.alert('Success', `${vendorData?.title || vendorData?.name} has been added to your wedding package!`);
          }
        }
      ]
    );
  };

  if (!vendorData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Vendor information not available</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          <Image 
            source={{ uri: vendorData.image }} 
            style={styles.headerImage}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={theme.secondary} />
          </TouchableOpacity>
        </View>

        {/* Vendor Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.vendorName}>{vendorData.title || vendorData.name}</Text>
              <Text style={styles.vendorProvider}>{vendorData.provider || vendorData.category}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{vendorData.price || vendorData.priceRange}</Text>
              {vendorData.discount && (
                <Text style={styles.discount}>{vendorData.discount}</Text>
              )}
            </View>
          </View>

          <View style={styles.ratingAndLocation}>
            <View style={styles.ratingContainer}>
              {renderRating(vendorData.rating)}
              <Text style={styles.ratingText}>{vendorData.rating}</Text>
              {vendorData.reviews && <Text style={styles.reviewCount}>({vendorData.reviews} reviews)</Text>}
            </View>
            {vendorData.location && (
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color={theme.gray600} />
                <Text style={styles.locationText}>{vendorData.location}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {vendorData.description || 'No description available for this vendor.'}
          </Text>
        </View>

        {/* Photo Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
            {[vendorData.image, ...additionalPhotos].map((photo, index) => (
              <Image 
                key={index} 
                source={{ uri: photo }} 
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        </View>

        {/* Past Work */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Work</Text>
          <View style={styles.pastWorkContainer}>
            {pastWork.map(work => (
              <View key={work.id} style={styles.workItem}>
                <Image source={{ uri: work.image }} style={styles.workImage} />
                <View style={styles.workInfo}>
                  <Text style={styles.workTitle}>{work.title}</Text>
                  <View style={styles.workDetails}>
                    <MaterialIcons name="calendar-today" size={14} color={theme.gray600} />
                    <Text style={styles.workDetailText}>{work.date}</Text>
                  </View>
                  <View style={styles.workDetails}>
                    <MaterialIcons name="location-on" size={14} color={theme.gray600} />
                    <Text style={styles.workDetailText}>{work.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Vendors</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationsScroll}>
            {recommendations.map(rec => (
              <TouchableOpacity 
                key={rec.id} 
                style={styles.recommendationCard}
                onPress={() => console.log('View recommended vendor')}
              >
                <Image source={{ uri: rec.image }} style={styles.recommendationImage} />
                <Text style={styles.recommendationName} numberOfLines={1}>{rec.name}</Text>
                <Text style={styles.recommendationCategory}>{rec.category}</Text>
                <View style={styles.recommendationRating}>
                  {renderRating(rec.rating)}
                  <Text style={styles.recommendationRatingText}>{rec.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.contactButton} onPress={contactVendor}>
          <MaterialIcons name="email" size={20} color={theme.buttonText} />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={addToPackage}>
          <MaterialIcons name="add-shopping-cart" size={20} color={theme.buttonText} />
          <Text style={styles.addButtonText}>Add to Package</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerImageContainer: {
    height: height * 0.3,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
  },
  vendorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 5,
  },
  vendorProvider: {
    fontSize: 16,
    color: theme.gray600,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
  discount: {
    fontSize: 14,
    color: theme.primary,
    marginTop: 3,
  },
  ratingAndLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: theme.gray600,
    marginLeft: 5,
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: theme.gray600,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: theme.gray600,
    marginLeft: 3,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: theme.textSecondary,
    lineHeight: 24,
  },
  galleryScroll: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  pastWorkContainer: {
    gap: 15,
  },
  workItem: {
    flexDirection: 'row',
    backgroundColor: theme.gray100,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  workImage: {
    width: 100,
    height: 100,
  },
  workInfo: {
    flex: 1,
    padding: 10,
  },
  workTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 5,
  },
  workDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  workDetailText: {
    fontSize: 12,
    color: theme.gray600,
    marginLeft: 5,
  },
  recommendationsScroll: {
    flexDirection: 'row',
  },
  recommendationCard: {
    width: 150,
    backgroundColor: theme.gray100,
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  recommendationImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  recommendationName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 3,
  },
  recommendationCategory: {
    fontSize: 12,
    color: theme.gray600,
    marginBottom: 5,
  },
  recommendationRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationRatingText: {
    fontSize: 12,
    color: theme.gray600,
    marginLeft: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: theme.background,
    borderTopWidth: 1,
    borderTopColor: theme.borderLight,
  },
  contactButton: {
    flex: 1,
    backgroundColor: theme.primary,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contactButtonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  addButton: {
    flex: 1,
    backgroundColor: theme.primary,
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  errorText: {
    fontSize: 18,
    color: theme.primary,
    textAlign: 'center',
    marginTop: 50,
  },
  backButtonText: {
    color: theme.primary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default VendorDetailScreen;