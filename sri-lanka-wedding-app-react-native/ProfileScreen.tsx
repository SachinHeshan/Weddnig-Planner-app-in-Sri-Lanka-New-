import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  Dimensions,
  Image,
  StatusBar,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import app, { auth } from './firebaseConfig';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import theme from './theme';

interface ProfileScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [coupleName, setCoupleName] = useState('John & Jane');
  const [weddingDate, setWeddingDate] = useState('2026-06-15');
  const [venue, setVenue] = useState('Grand Ballroom, Colombo');
  const [guestCount, setGuestCount] = useState('150');
  const [budget, setBudget] = useState('2,500,000');
  const [activeTab, setActiveTab] = useState('Profile');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUsername(user.displayName || '');
        setProfileImage(user.photoURL);
      } else {
        setCurrentUser(null);
      }
    });
    
    return unsubscribe;
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setShowImagePicker(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setShowImagePicker(false);
    }
  };

  const saveProfile = async () => {
    try {
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: username,
          photoURL: profileImage || currentUser.photoURL
        });
      }
      
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      let errorMessage = 'Failed to save profile. Please try again.';
      
      // Handle specific Firebase errors
      if (error.code) {
        switch (error.code) {
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection.';
            break;
          case 'auth/internal-error':
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = 'Failed to save profile. Please try again.';
        }
      }
      
      Alert.alert('Error', errorMessage);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getDaysUntilWedding = () => {
    const wedding = new Date(weddingDate);
    const today = new Date();
    const diffTime = wedding.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const ProfileSection = ({ icon, title, value, onPress }: any) => (
    <TouchableOpacity style={styles.profileSection} onPress={onPress}>
      <View style={styles.sectionLeft}>
        <MaterialIcons name={icon} size={24} color={theme.primary} />
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionValue}>{value}</Text>
        </View>
      </View>
      {onPress && <MaterialIcons name="chevron-right" size={24} color={theme.gray400} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account details</Text>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <TouchableOpacity 
              style={styles.imageContainer}
              onPress={() => isEditing && setShowImagePicker(true)}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <MaterialIcons name="photo-camera" size={32} color={theme.gray400} />
                </View>
              )}
              {isEditing && (
                <View style={styles.editImageOverlay}>
                  <MaterialIcons name="edit" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>
            
            <View style={styles.profileInfo}>
              <Text style={styles.coupleName}>{coupleName}</Text>
              <Text style={styles.weddingCountdown}>
                {getDaysUntilWedding()} days until wedding
              </Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="diamond" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>Premium Plan</Text>
              </View>
            </View>
          </View>

          {/* Wedding Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{guestCount}</Text>
              <Text style={styles.statLabel}>Guests</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>LKR {budget}</Text>
              <Text style={styles.statLabel}>Budget</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatDate(weddingDate).split(' ')[0]}</Text>
              <Text style={styles.statLabel}>Wedding Month</Text>
            </View>
          </View>
        </View>

        {/* Profile Sections */}
        <View style={styles.sectionsContainer}>
          <ProfileSection
            icon="person"
            title="Username"
            value={username || "Not set"}
            onPress={isEditing ? () => {} : null}
          />
          
          {isEditing ? (
            <View style={styles.editForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Couple Names</Text>
                <TextInput
                  style={styles.input}
                  value={coupleName}
                  onChangeText={setCoupleName}
                  placeholder="Enter both names"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Wedding Date</Text>
                <TextInput
                  style={styles.input}
                  value={weddingDate}
                  onChangeText={setWeddingDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Venue</Text>
                <TextInput
                  style={styles.input}
                  value={venue}
                  onChangeText={setVenue}
                  placeholder="Wedding venue"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Expected Guests</Text>
                <TextInput
                  style={styles.input}
                  value={guestCount}
                  onChangeText={setGuestCount}
                  placeholder="Number of guests"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Budget (LKR)</Text>
                <TextInput
                  style={styles.input}
                  value={budget}
                  onChangeText={setBudget}
                  placeholder="Total budget"
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ProfileSection
                icon="event"
                title="Wedding Date"
                value={formatDate(weddingDate)}
              />
              
              <ProfileSection
                icon="location-on"
                title="Venue"
                value={venue}
              />
              
              <ProfileSection
                icon="people"
                title="Guest Count"
                value={`${guestCount} guests`}
              />
              
              <ProfileSection
                icon="account-balance-wallet"
                title="Total Budget"
                value={`LKR ${budget}`}
              />
            </>
          )}
        </View>

        {/* Quick Actions */}
        {!isEditing && (
          <View style={styles.actionsContainer}>
            <Text style={styles.actionsTitle}>Quick Actions</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('WeddingPackage')}
              >
                <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                  <MaterialIcons name="inventory" size={24} color={theme.primary} />
                </View>
                <Text style={styles.actionText}>My Package</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('BudgetTracker')}
              >
                <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                  <MaterialIcons name="analytics" size={24} color="#4CAF50" />
                </View>
                <Text style={styles.actionText}>Budget</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('Checklist')}
              >
                <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialIcons name="checklist" size={24} color="#FF9800" />
                </View>
                <Text style={styles.actionText}>Checklist</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => navigation.navigate('VendorDirectory')}
              >
                <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                  <MaterialIcons name="store" size={24} color="#9C27B0" />
                </View>
                <Text style={styles.actionText}>Vendors</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        visible={showImagePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImagePicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowImagePicker(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.imagePickerModal}>
                <Text style={styles.modalTitle}>Choose Profile Photo</Text>
                <TouchableOpacity style={styles.modalOption} onPress={takePhoto}>
                  <MaterialIcons name="photo-camera" size={24} color={theme.primary} />
                  <Text style={styles.modalOptionText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={pickImage}>
                  <MaterialIcons name="photo-library" size={24} color={theme.primary} />
                  <Text style={styles.modalOptionText}>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalCancel} 
                  onPress={() => setShowImagePicker(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.gray600,
    fontWeight: '400',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.primary,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.gray200,
    borderStyle: 'dashed',
  },
  editImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  coupleName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 4,
  },
  weddingCountdown: {
    fontSize: 14,
    color: theme.gray600,
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFA000',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.gray600,
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.gray300,
    marginHorizontal: 8,
  },
  sectionsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionContent: {
    marginLeft: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 14,
    color: theme.gray600,
    marginBottom: 2,
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.primary,
  },
  editForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.gray300,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    color: theme.primary,
  },
  saveButton: {
    backgroundColor: theme.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  actionsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.primary,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 12,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.primary,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePickerModal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionText: {
    fontSize: 16,
    color: theme.primary,
    marginLeft: 12,
  },
  modalCancel: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: theme.gray600,
    fontWeight: '500',
  },
});

export default ProfileScreen;