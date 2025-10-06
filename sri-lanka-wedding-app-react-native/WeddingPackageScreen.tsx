import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, Ionicons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface PackageItem {
  id: string;
  name: string;
  category: string;
  price: string;
  vendor: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  description: string;
}

interface WeddingPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  itemsIncluded: string[];
  popular: boolean;
  image: string;
  savings?: string;
  features: string[];
  icon: string;
  color: string;
  rating: number;
  reviews: number;
  location: string;
}

interface WeddingPackageScreenProps {
  navigation: any;
  route: any;
}

const { width, height } = Dimensions.get('window');

const WeddingPackageScreen: React.FC<WeddingPackageScreenProps> = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Packages');
  const [selectedPackageType, setSelectedPackageType] = useState<'custom' | 'essential' | 'premium' | 'luxury'>('essential');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [packageItems, setPackageItems] = useState<PackageItem[]>([
    {
      id: '1',
      name: 'Colombo Grand Hotel',
      category: 'Venue',
      price: 'LKR 450,000',
      vendor: 'Grand Ballroom',
      image: 'https://www.orchidhotel.com/static/website/img/hotels/panchgani/homepage_slider/homepage_slider.webp',
      rating: 4.8,
      reviews: 124,
      location: 'Colombo 07, Colombo',
      description: 'Luxury wedding venue with beautiful ballrooms and exceptional service in the heart of Colombo.',
    },
    {
      id: '2',
      name: 'Sri Lankan Photography',
      category: 'Photography',
      price: 'LKR 120,000',
      vendor: 'Professional Team',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      reviews: 89,
      location: 'Colombo',
      description: 'Professional wedding photography team capturing your special moments with creativity and passion.',
    },
  ]);

  const [weddingPackages, setWeddingPackages] = useState<WeddingPackage[]>([
    // Essential Packages
    {
      id: '1',
      name: 'Essential Classic',
      description: 'Perfect for intimate celebrations with close family and friends',
      price: 'LKR 750,000',
      originalPrice: 'LKR 900,000',
      itemsIncluded: ['Premium Venue', 'Professional Photography', 'Catering for 50', 'Basic Decor', 'Wedding Cake'],
      popular: false,
      image: 'https://www.orchidhotel.com/static/website/img/hotels/panchgani/homepage_slider/homepage_slider.webp',
      savings: 'LKR 150,000',
      features: ['50 Guests', 'Basic Decor', 'Standard Photography', 'Wedding Cake'],
      icon: '💫',
      color: '#8B5CF6',
      rating: 4.5,
      reviews: 67,
      location: 'Multiple Locations',
    },
    {
      id: '2',
      name: 'Essential Elegance',
      description: 'A cozy wedding package with essential services for small gatherings',
      price: 'LKR 800,000',
      originalPrice: 'LKR 950,000',
      itemsIncluded: ['Mid-tier Venue', 'Photography', 'Catering for 60', 'Simple Decor', 'DJ Service'],
      popular: true,
      image: 'https://www.orchidhotel.com/static/website/img/hotels/panchgani/homepage_slider/homepage_slider.webp',
      savings: 'LKR 150,000',
      features: ['60 Guests', 'Simple Decor', 'Photography', 'DJ Service'],
      icon: '💫',
      color: '#8B5CF6',
      rating: 4.6,
      reviews: 85,
      location: 'Colombo & Suburbs',
    },
    {
      id: '3',
      name: 'Essential Bliss',
      description: 'Affordable package for a memorable small-scale wedding',
      price: 'LKR 700,000',
      originalPrice: 'LKR 850,000',
      itemsIncluded: ['Standard Venue', 'Basic Photography', 'Catering for 40', 'Minimal Decor', 'Wedding Cake'],
      popular: false,
      image: 'https://www.orchidhotel.com/static/website/img/hotels/panchgani/homepage_slider/homepage_slider.webp',
      savings: 'LKR 150,000',
      features: ['40 Guests', 'Minimal Decor', 'Basic Photography', 'Wedding Cake'],
      icon: '💫',
      color: '#8B5CF6',
      rating: 4.4,
      reviews: 50,
      location: 'Multiple Locations',
    },
    {
      id: '4',
      name: 'Essential Charm',
      description: 'A budget-friendly package for intimate weddings with style',
      price: 'LKR 780,000',
      originalPrice: 'LKR 920,000',
      itemsIncluded: ['Cozy Venue', 'Photography', 'Catering for 50', 'Basic Decor', 'Live Music'],
      popular: false,
      image: 'https://www.orchidhotel.com/static/website/img/hotels/panchgani/homepage_slider/homepage_slider.webp',
      savings: 'LKR 140,000',
      features: ['50 Guests', 'Basic Decor', 'Photography', 'Live Music'],
      icon: '💫',
      color: '#8B5CF6',
      rating: 4.5,
      reviews: 72,
      location: 'Colombo',
    },
    // Premium Packages
    {
      id: '5',
      name: 'Premium Signature',
      description: 'Our most popular package for a modern wedding experience',
      price: 'LKR 1,200,000',
      originalPrice: 'LKR 1,500,000',
      itemsIncluded: [
        'Luxury Venue',
        'Professional Photography & Videography',
        'Catering for 100',
        'Premium Decor',
        'Entertainment',
        'Wedding Planner',
      ],
      popular: true,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      savings: 'LKR 300,000',
      features: ['100 Guests', 'Premium Decor', 'Photography + Videography', 'Wedding Planner', 'Entertainment'],
      icon: '🌟',
      color: '#F59E0B',
      rating: 4.8,
      reviews: 124,
      location: 'Premium Locations',
    },
    {
      id: '6',
      name: 'Premium Royale',
      description: 'An upscale package for a sophisticated wedding celebration',
      price: 'LKR 1,350,000',
      originalPrice: 'LKR 1,700,000',
      itemsIncluded: [
        'Luxury Venue',
        'Professional Photography & Videography',
        'Catering for 120',
        'Premium Decor',
        'Live Band',
        'Wedding Planner',
      ],
      popular: false,
     image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      savings: 'LKR 350,000',
      features: ['120 Guests', 'Premium Decor', 'Photography + Videography', 'Live Band', 'Wedding Planner'],
      icon: '🌟',
      color: '#F59E0B',
      rating: 4.7,
      reviews: 98,
      location: 'Colombo & Kandy',
    },
    {
      id: '7',
      name: 'Premium Splendor',
      description: 'A grand package for a memorable modern wedding',
      price: 'LKR 1,300,000',
      originalPrice: 'LKR 1,600,000',
      itemsIncluded: [
        'Luxury Venue',
        'Photography & Videography',
        'Catering for 100',
        'Themed Decor',
        'DJ & Entertainment',
        'Wedding Planner',
      ],
      popular: false,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      savings: 'LKR 300,000',
      features: ['100 Guests', 'Themed Decor', 'Photography + Videography', 'DJ & Entertainment', 'Wedding Planner'],
      icon: '🌟',
      color: '#F59E0B',
      rating: 4.8,
      reviews: 110,
      location: 'Premium Locations',
    },
    {
      id: '8',
      name: 'Premium Extravaganza',
      description: 'A vibrant package for a lively wedding celebration',
      price: 'LKR 1,400,000',
      originalPrice: 'LKR 1,750,000',
      itemsIncluded: [
        'Luxury Venue',
        'Professional Photography & Videography',
        'Catering for 110',
        'Premium Decor',
        'Live Entertainment',
        'Wedding Planner',
      ],
      popular: false,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      savings: 'LKR 350,000',
      features: ['110 Guests', 'Premium Decor', 'Photography + Videography', 'Live Entertainment', 'Wedding Planner'],
      icon: '🌟',
      color: '#F59E0B',
      rating: 4.7,
      reviews: 105,
      location: 'Colombo',
    },
    // Luxury Packages
    {
      id: '9',
      name: 'Luxury Diamond',
      description: 'The ultimate luxury experience for your dream wedding',
      price: 'LKR 2,500,000',
      originalPrice: 'LKR 3,000,000',
      itemsIncluded: [
        '5-Star Venue',
        'Top Photography & Videography',
        'Gourmet Catering',
        'Luxury Decor',
        'Live Entertainment',
        'Dedicated Planner',
        'Bridal Suite',
        'Luxury Car',
      ],
      popular: false,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=',
      savings: 'LKR 500,000',
      features: ['200+ Guests', 'Luxury Decor', 'Premium Photography', 'Live Entertainment', 'Bridal Suite', 'Luxury Car'],
      icon: '💎',
      color: '#10B981',
      rating: 4.9,
      reviews: 56,
      location: 'Luxury Venues',
    },
    {
      id: '10',
      name: 'Luxury Opulence',
      description: 'An extravagant package for an unforgettable wedding',
      price: 'LKR 2,800,000',
      originalPrice: 'LKR 3,400,000',
      itemsIncluded: [
        '5-Star Venue',
        'Elite Photography & Videography',
        'Gourmet Catering',
        'Luxury Decor',
        'Orchestra',
        'Dedicated Planner',
        'Bridal Suite',
        'Luxury Car',
      ],
      popular: true,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=',
      savings: 'LKR 600,000',
      features: ['250+ Guests', 'Luxury Decor', 'Elite Photography', 'Orchestra', 'Bridal Suite', 'Luxury Car'],
      icon: '💎',
      color: '#10B981',
      rating: 4.9,
      reviews: 62,
      location: 'Luxury Venues',
    },
    {
      id: '11',
      name: 'Luxury Majesty',
      description: 'A regal package for a grand wedding celebration',
      price: 'LKR 2,600,000',
      originalPrice: 'LKR 3,200,000',
      itemsIncluded: [
        '5-Star Venue',
        'Top Photography & Videography',
        'Gourmet Catering',
        'Luxury Decor',
        'Live Band',
        'Dedicated Planner',
        'Bridal Suite',
        'Luxury Car',
      ],
      popular: false,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=',
      savings: 'LKR 600,000',
      features: ['200+ Guests', 'Luxury Decor', 'Top Photography', 'Live Band', 'Bridal Suite', 'Luxury Car'],
      icon: '💎',
      color: '#10B981',
      rating: 4.8,
      reviews: 48,
      location: 'Luxury Venues',
    },
    {
      id: '12',
      name: 'Luxury Grandeur',
      description: 'A spectacular package for an iconic wedding experience',
      price: 'LKR 2,900,000',
      originalPrice: 'LKR 3,500,000',
      itemsIncluded: [
        '5-Star Venue',
        'Elite Photography & Videography',
        'Gourmet Catering',
        'Luxury Decor',
        'Live Entertainment',
        'Dedicated Planner',
        'Bridal Suite',
        'Luxury Car',
      ],
      popular: false,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=',
      savings: 'LKR 600,000',
      features: ['250+ Guests', 'Luxury Decor', 'Elite Photography', 'Live Entertainment', 'Bridal Suite', 'Luxury Car'],
      icon: '💎',
      color: '#10B981',
      rating: 4.9,
      reviews: 70,
      location: 'Luxury Venues',
    },
  ]);

  // Filter packages based on selectedPackageType
  const filteredPackages = weddingPackages.filter((pkg) =>
    pkg.name.toLowerCase().startsWith(selectedPackageType)
  );

  // Handle adding new vendors from the route parameters
  useEffect(() => {
    if (route.params?.newVendor) {
      const newVendor = route.params.newVendor;
      const newItem: PackageItem = {
        id: newVendor.id,
        name: newVendor.name,
        category: newVendor.category,
        price: convertPriceRangeToLKR(newVendor.priceRange),
        vendor: newVendor.name,
        image: newVendor.image,
        rating: newVendor.rating,
        reviews: newVendor.reviews || 0,
        location: newVendor.location,
        description: newVendor.description || 'Professional wedding service provider.',
      };

      if (!packageItems.some((item) => item.id === newItem.id)) {
        setPackageItems((prevItems) => [...prevItems, newItem]);
        Alert.alert('Success', `${newVendor.name} has been added to your wedding package!`);
      }

      navigation.setParams({ newVendor: null });
    }
  }, [route.params?.newVendor]);

  const convertPriceRangeToLKR = (priceRange: string) => {
    const ranges = {
      '$': 'LKR 50,000 - 100,000',
      '$$': 'LKR 100,000 - 250,000',
      '$$$': 'LKR 250,000 - 500,000',
      '$$$$': 'LKR 500,000+',
    };
    return ranges[priceRange as keyof typeof ranges] || 'LKR 100,000 - 250,000';
  };

  const renderPackageCard = ({ item }: { item: WeddingPackage; index: number }) => (
    <View style={styles.packageCard}>
      {/* Package Image */}
      <Image source={{ uri: item.image }} style={styles.packageImage} />

      {/* Package Content */}
      <View style={styles.packageContent}>
        {/* Header Section */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.packageName}>{item.name}</Text>
            <Text style={styles.packageCategory}>WEDDING PACKAGE</Text>
          </View>
          {item.popular && (
            <View style={styles.popularBadge}>
              <Ionicons name="star" size={12} color="#FFFFFF" />
              <Text style={styles.popularBadgeText}>POPULAR</Text>
            </View>
          )}
        </View>

        {/* Rating and Reviews */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#666666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        {/* Description */}
        <Text style={styles.packageDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            )}
            <Text style={styles.currentPrice}>{item.price}</Text>
            {item.savings && (
              <Text style={styles.savingsText}>Save {item.savings}</Text>
            )}
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          {item.features.slice(0, 4).map((feature, idx) => (
            <View key={idx} style={styles.featureChip}>
              <Ionicons name="checkmark" size={12} color="#10B981" />
              <Text style={styles.featureChipText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactVendor(item)}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addPackageButton}
            onPress={() => handlePackageSelect(item)}
          >
            <Text style={styles.addPackageButtonText}>Add to Package</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleContactVendor = (packageItem: WeddingPackage) => {
    Alert.alert(
      'Contact Vendor',
      `Would you like to contact us about the ${packageItem.name} Package?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Contact',
          onPress: () => {
            Alert.alert('Success', 'Our team will contact you shortly!');
          },
        },
      ]
    );
  };

  const handleContactVendorItem = (packageItem: PackageItem) => {
    Alert.alert(
      'Contact Vendor',
      `Would you like to contact ${packageItem.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Contact',
          onPress: () => {
            Alert.alert('Success', 'Vendor will contact you shortly!');
          },
        },
      ]
    );
  };

  const handlePackageSelect = (packageItem: WeddingPackage) => {
    Alert.alert(
      'Add to Package',
      `Add ${packageItem.name} Package to your wedding plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add to Package',
          onPress: () => {
            setSelectedPackageType(packageItem.name.split(' ')[0].toLowerCase() as any);
            Alert.alert('Success', `${packageItem.name} Package has been added!`);
          },
        },
      ]
    );
  };

  const renderCustomPackageItem = ({ item }: { item: PackageItem }) => (
    <View style={styles.vendorCard}>
      {/* Vendor Image */}
      <Image source={{ uri: item.image }} style={styles.vendorImage} />

      {/* Vendor Content */}
      <View style={styles.vendorContent}>
        {/* Header Section */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.vendorName}>{item.name}</Text>
            <Text style={styles.vendorCategory}>{item.category.toUpperCase()}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeItemButton}
            onPress={(e) => {
              e.stopPropagation();
              removeFromPackage(item.id, item.name);
            }}
          >
            <Ionicons name="close" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Rating and Reviews */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#666666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        {/* Description */}
        <Text style={styles.vendorDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.vendorPrice}>{item.price}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => handleContactVendorItem(item)}
          >
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('VendorDetail', { vendor: item })}
          >
            <Text style={styles.viewDetailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const removeFromPackage = (id: string, name: string) => {
    Alert.alert(
      'Remove Item',
      `Remove ${name} from your package?`,
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPackageItems(packageItems.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const getTotalPrice = () => {
    return packageItems.reduce((total, item) => {
      if (item.price.includes('50,000 - 100,000')) return total + 75000;
      if (item.price.includes('100,000 - 250,000')) return total + 175000;
      if (item.price.includes('250,000 - 500,000')) return total + 375000;
      if (item.price.includes('500,000+')) return total + 600000;
      return total + 175000;
    }, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header with notification icon and package type selector */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wedding Packages</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      {/* Package Type Selector in header section */}
      <View style={styles.selectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectorScroll}
        >
          {[
            { key: 'essential', label: 'Essential', icon: 'sparkles-outline' },
            { key: 'premium', label: 'Premium', icon: 'diamond-outline' },
            { key: 'luxury', label: 'Luxury', icon: 'trophy-outline' },
            { key: 'custom', label: 'Custom Plan', icon: 'build-outline' },
          ].map((type) => (
            <TouchableOpacity
              key={type.key}
              style={[
                styles.selectorButton,
                selectedPackageType === type.key && styles.selectorButtonActive,
              ]}
              onPress={() => setSelectedPackageType(type.key as any)}
            >
              <Ionicons
                name={type.icon as any}
                size={20}
                color={selectedPackageType === type.key ? '#FFFFFF' : '#000000'}
              />
              <Text
                style={[
                  styles.selectorLabel,
                  selectedPackageType === type.key && styles.selectorLabelActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Content Area */}
        <View style={styles.contentContainer}>
          {selectedPackageType === 'custom' ? (
            <>
              {/* Custom Package Header */}
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Your Custom Package</Text>
                  <Text style={styles.sectionSubtitle}>
                    Build your unique wedding experience by adding vendors
                  </Text>
                </View>
                {packageItems.length > 0 && (
                  <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={() => navigation.navigate('VendorDirectory')}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                    <Text style={styles.addItemText}>Add Vendor</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Custom Items List */}
              {packageItems.length > 0 ? (
                <FlatList
                  data={packageItems}
                  renderItem={renderCustomPackageItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.customItemsList}
                />
              ) : (
                <View style={styles.emptyState}>
                  <View style={styles.emptyIcon}>
                    <Ionicons name="heart-outline" size={64} color="#CCCCCC" />
                  </View>
                  <Text style={styles.emptyTitle}>Start Building Your Package</Text>
                  <Text style={styles.emptyMessage}>
                    Add vendors and services to create your perfect wedding package
                  </Text>
                  <TouchableOpacity
                    style={styles.exploreButton}
                    onPress={() => navigation.navigate('VendorDirectory')}
                  >
                    <Text style={styles.exploreButtonText}>Explore Vendors</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            /* Pre-defined Packages */
            <View style={styles.packagesContainer}>
              <View style={styles.packagesHeader}>
                <Text style={styles.packagesTitle}>
                  {selectedPackageType.charAt(0).toUpperCase() + selectedPackageType.slice(1)} Packages
                </Text>
                <Text style={styles.packagesSubtitle}>
                  Curated packages for your perfect wedding day
                </Text>
              </View>

              <FlatList
                data={filteredPackages}
                renderItem={renderPackageCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.packagesList}
              />
            </View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  headerButton: {
    padding: 8,
  },
  selectorContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectorScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    gap: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectorButtonActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  selectorLabelActive: {
    color: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  packagesContainer: {
    flex: 1,
  },
  packagesHeader: {
    marginBottom: 24,
  },
  packagesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  packagesSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  packagesList: {
    gap: 16,
  },
  customItemsList: {
    gap: 16,
  },
  packageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  vendorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  packageImage: {
    width: '100%',
    height: 200,
  },
  vendorImage: {
    width: '100%',
    height: 200,
  },
  packageContent: {
    padding: 16,
  },
  vendorContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  packageName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  vendorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 2,
  },
  packageCategory: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  vendorCategory: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ratingContainer: {
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
  packageDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 12,
  },
  vendorDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 12,
  },
  priceSection: {
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  vendorPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  savingsText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  featureChipText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000000',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  addPackageButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addPackageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  removeItemButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 80,
  },
});

export default WeddingPackageScreen;