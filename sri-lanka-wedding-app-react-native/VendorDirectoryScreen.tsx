import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Alert, 
  Dimensions,
  StatusBar 
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import theme from './theme';

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
  city: string;
  province: string;
}

interface VendorDirectoryScreenProps {
  navigation: any;
  route: any;
}

const { width } = Dimensions.get('window');

// Define proper TypeScript types for the icons
type MaterialIconName = 
  | 'apps'
  | 'business'
  | 'hotel'
  | 'restaurant'
  | 'cake'
  | 'camera-alt'
  | 'videocam'
  | 'local-florist'
  | 'palette'
  | 'checkroom'
  | 'spa'
  | 'music-note'
  | 'celebration'
  | 'directions-car'
  | 'description'
  | 'lightbulb'
  | 'flight'
  | 'filter'
  | 'search'
  | 'shopping-cart'
  | 'event-note'
  | 'person'
  | 'home'
  | 'verified'
  | 'location-on';

type IoniconName = 
  | 'star'
  | 'heart'
  | 'heart-outline'
  | 'location-outline'
  | 'chatbubble-outline'
  | 'add-circle-outline'
  | 'close-circle'
  | 'filter'
  | 'list'
  | 'grid'
  | 'chevron-down';

const VendorDirectoryScreen: React.FC<VendorDirectoryScreenProps> = ({ navigation, route }) => {
  const [vendors, setVendors] = useState<Vendor[]>([
    // Sri Lankan Wedding Vendors
    {
      id: '1',
      name: 'Colombo Grand Hotel',
      category: 'Venue',
      rating: 4.8,
      reviews: 124,
      location: 'Colombo 07',
      priceRange: '$$$$',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Luxury wedding venue with beautiful ballrooms and exceptional service in the heart of Colombo',
      contact: 'info@colombogrand.com',
      city: 'Colombo',
      province: 'Western'
    },
    {
      id: '2',
      name: 'Galle Face Hotel',
      category: 'Accommodation',
      rating: 4.6,
      reviews: 98,
      location: 'Galle Face, Colombo',
      priceRange: '$$$',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Historic beachfront hotel offering luxurious accommodation for wedding guests',
      contact: 'bookings@gallefacehotel.com',
      city: 'Colombo',
      province: 'Western'
    },
    {
      id: '3',
      name: 'Sri Lankan Catering',
      category: 'Catering',
      rating: 4.7,
      reviews: 156,
      location: 'Kandy',
      priceRange: '$$$',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Authentic Sri Lankan wedding catering with traditional and modern cuisine options',
      contact: 'orders@srilankancatering.com',
      city: 'Kandy',
      province: 'Central'
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [activeTab, setActiveTab] = useState('Search');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  useEffect(() => {
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
    
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params?.searchQuery, route.params?.category]);

  const categories: { name: string; icon: MaterialIconName }[] = [
    { name: 'All', icon: 'apps' },
    { name: 'Venue', icon: 'business' },
    { name: 'Accommodation', icon: 'hotel' },
    { name: 'Catering', icon: 'restaurant' },
    { name: 'Baker', icon: 'cake' },
    { name: 'Photography', icon: 'camera-alt' },
    { name: 'Videography', icon: 'videocam' },
    { name: 'Florist', icon: 'local-florist' },
    { name: 'Decor', icon: 'palette' },
    { name: 'Attire', icon: 'checkroom' },
    { name: 'Beauty', icon: 'spa' },
    { name: 'Music', icon: 'music-note' },
    { name: 'Entertainment', icon: 'celebration' },
    { name: 'Transport', icon: 'directions-car' },
    { name: 'Stationery', icon: 'description' },
    { name: 'Lighting', icon: 'lightbulb' },
    { name: 'Travel', icon: 'flight' },
  ];

  // Sri Lankan provinces and cities
  const provinces = ['All', 'Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa'];
  
  const citiesByProvince = {
    'Western': ['All', 'Colombo', 'Gampaha', 'Kalutara', 'Moratuwa', 'Negombo', 'Panadura'],
    'Central': ['All', 'Kandy', 'Matale', 'Nuwara Eliya', 'Gampola'],
    'Southern': ['All', 'Galle', 'Matara', 'Hambantota', 'Weligama'],
    'Northern': ['All', 'Jaffna', 'Vavuniya', 'Mannar'],
    'Eastern': ['All', 'Trincomalee', 'Batticaloa', 'Ampara'],
    'North Western': ['All', 'Kurunegala', 'Puttalam'],
    'North Central': ['All', 'Anuradhapura', 'Polonnaruwa'],
    'Uva': ['All', 'Badulla', 'Monaragala'],
    'Sabaragamuwa': ['All', 'Ratnapura', 'Kegalle']
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    const matchesProvince = selectedProvince === 'All' || vendor.province === selectedProvince;
    const matchesCity = selectedCity === 'All' || vendor.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesProvince && matchesCity;
  });

  const toggleFavorite = (vendorId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(vendorId)) {
      newFavorites.delete(vendorId);
    } else {
      newFavorites.add(vendorId);
    }
    setFavorites(newFavorites);
  };

  const contactVendor = (vendor: Vendor) => {
    Alert.alert(
      'Contact Vendor',
      `Would you like to contact ${vendor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email', onPress: () => console.log(`Emailing ${vendor.contact}`) },
        { text: 'Call', onPress: () => console.log(`Calling ${vendor.contact}`) }
      ]
    );
  };

  const addToPackage = (vendor: Vendor) => {
    Alert.alert(
      'Add to Package',
      `Add ${vendor.name} to your wedding package?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: () => {
            navigation.navigate('WeddingPackage', { newVendor: vendor });
            Alert.alert('Success', `${vendor.name} has been added to your wedding package!`);
          }
        }
      ]
    );
  };

  const renderRating = (rating: number, reviews: number) => {
    return (
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.reviewsText}>({reviews} reviews)</Text>
      </View>
    );
  };

  const renderPriceRange = (priceRange: string) => {
    return (
      <View style={styles.priceRangeContainer}>
        <Text style={styles.priceRangeText}>{priceRange}</Text>
      </View>
    );
  };

  const VendorCard = ({ vendor }: { vendor: Vendor }) => (
    <TouchableOpacity 
      style={styles.vendorCard}
      onPress={() => navigation.navigate('VendorDetail', { vendor })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
        <TouchableOpacity 
          style={[
            styles.favoriteButton,
            favorites.has(vendor.id) && styles.favoriteButtonActive
          ]}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(vendor.id);
          }}
        >
          <Ionicons 
            name={favorites.has(vendor.id) ? "heart" : "heart-outline"} 
            size={20} 
            color={favorites.has(vendor.id) ? "#FF6B6B" : "white"} 
          />
        </TouchableOpacity>
        {renderPriceRange(vendor.priceRange)}
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.vendorName} numberOfLines={1}>{vendor.name}</Text>
          <MaterialIcons name="verified" size={16} color={theme.primary} />
        </View>
        
        <Text style={styles.vendorCategory}>{vendor.category}</Text>
        
        {renderRating(vendor.rating, vendor.reviews)}
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={theme.gray600} />
          <Text style={styles.vendorLocation}>{vendor.location}, {vendor.city}</Text>
        </View>
        
        <Text style={styles.vendorDescription} numberOfLines={2}>
          {vendor.description}
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={(e) => {
              e.stopPropagation();
              contactVendor(vendor);
            }}
          >
            <Ionicons name="chatbubble-outline" size={16} color={theme.primary} />
            <Text style={styles.contactButtonText}>Contact</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.packageButton}
            onPress={(e) => {
              e.stopPropagation();
              addToPackage(vendor);
            }}
          >
            <Ionicons name="add-circle-outline" size={16} color="white" />
            <Text style={styles.packageButtonText}>Add to Package</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={theme.gray600} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors, categories, locations..."
            placeholderTextColor={theme.gray600}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.gray600} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Location Filter Button */}
        <TouchableOpacity 
          style={styles.locationFilterButton}
          onPress={() => setShowLocationFilter(!showLocationFilter)}
        >
          <MaterialIcons name="location-on" size={20} color={theme.primary} />
          <Text style={styles.locationFilterText}>Location</Text>
          <Ionicons 
            name="chevron-down" 
            size={16} 
            color={theme.primary} 
            style={{ transform: [{ rotate: showLocationFilter ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>
      </View>

      {/* Location Filter Dropdown */}
      {showLocationFilter && (
        <View style={styles.locationFilterContainer}>
          {/* Province Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Province</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              {provinces.map(province => (
                <TouchableOpacity
                  key={province}
                  style={[
                    styles.filterChip,
                    selectedProvince === province && styles.filterChipActive
                  ]}
                  onPress={() => {
                    setSelectedProvince(province);
                    setSelectedCity('All'); // Reset city when province changes
                  }}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedProvince === province && styles.filterChipTextActive
                  ]}>
                    {province}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* City Filter */}
          {selectedProvince !== 'All' && (
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>City - {selectedProvince}</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
              >
                {citiesByProvince[selectedProvince as keyof typeof citiesByProvince]?.map(city => (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.filterChip,
                      selectedCity === city && styles.filterChipActive
                    ]}
                    onPress={() => setSelectedCity(city)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      selectedCity === city && styles.filterChipTextActive
                    ]}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}
      
      {/* Categories */}
      <View style={styles.categoriesSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryItem,
                selectedCategory === category.name && styles.categoryItemActive
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <MaterialIcons 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.name ? 'white' : theme.primary} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.name && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredVendors.length} {filteredVendors.length === 1 ? 'Vendor' : 'Vendors'} Found
          {selectedProvince !== 'All' && ` in ${selectedProvince}`}
          {selectedCity !== 'All' && `, ${selectedCity}`}
        </Text>
      </View>
      
      {/* Vendors List */}
      <ScrollView 
        style={styles.vendorsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.vendorsContainer}
      >
        {filteredVendors.length > 0 ? (
          filteredVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <MaterialIcons name="search-off" size={64} color={theme.gray400} />
            <Text style={styles.noResultsText}>No vendors found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 30,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
     marginTop : -35,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
    marginTop: -2, // Move the icon up slightly
  },
  searchInput: {
   
    flex: 1,
    fontSize: 16,
    color: theme.primary,
  },
  locationFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  locationFilterText: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
    color: theme.primary,
  },
  locationFilterContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterSection: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
    marginBottom: 10,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  filterChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.primary,
  },
  filterChipTextActive: {
    color: 'white',
  },
  categoriesSection: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryItemActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: theme.primary,
  },
  categoryTextActive: {
    color: 'white',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.primary,
  },
  vendorsList: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  vendorsContainer: {
    padding: 20,
  },
  vendorCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  vendorImage: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    borderRadius: 20,
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  priceRangeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceRangeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.primary,
    flex: 1,
    marginRight: 8,
  },
  vendorCategory: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
    marginLeft: 4,
    marginRight: 6,
  },
  reviewsText: {
    fontSize: 12,
    color: theme.gray600,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorLocation: {
    fontSize: 14,
    color: theme.gray600,
    marginLeft: 4,
  },
  vendorDescription: {
    fontSize: 14,
    color: theme.gray700,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 8,
    gap: 6,
  },
  contactButtonText: {
    color: theme.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  packageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.primary,
    borderRadius: 8,
    gap: 6,
  },
  packageButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.gray600,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: theme.gray500,
    textAlign: 'center',
  },
});

export default VendorDirectoryScreen;