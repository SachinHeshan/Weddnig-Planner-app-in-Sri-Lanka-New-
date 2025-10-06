import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Platform, TextInput, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme'; // Import the theme

interface Photo {
  id: string;
  uri: string;
  caption: string;
  date: string;
}

interface PhotoGalleryScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const PhotoGalleryScreen: React.FC<PhotoGalleryScreenProps> = ({ navigation }) => {
  const [photos, setPhotos] = useState<Photo[]>([
    { 
      id: '1', 
      uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', 
      caption: 'Engagement photoshoot', 
      date: '2024-05-15' 
    },
    { 
      id: '2', 
      uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', 
      caption: 'Wedding venue', 
      date: '2024-06-20' 
    },
    { 
      id: '3', 
      uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80', 
      caption: 'Dress fitting', 
      date: '2024-07-10' 
    },
  ]);
  
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeTab, setActiveTab] = useState('Gallery');

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry', 'We need camera roll permissions to make this work!');
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          caption: '',
          date: new Date().toISOString().split('T')[0]
        };
        setPhotos([newPhoto, ...photos]);
        setSelectedPhoto(newPhoto);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newPhoto: Photo = {
          id: Date.now().toString(),
          uri: result.assets[0].uri,
          caption: '',
          date: new Date().toISOString().split('T')[0]
        };
        setPhotos([newPhoto, ...photos]);
        setSelectedPhoto(newPhoto);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto(null);
    }
  };

  const updateCaption = (id: string, caption: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, caption } : photo
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Gallery</Text>
        <Text style={styles.subtitle}>Capture and cherish your wedding memories</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
          <Text style={styles.actionButtonText}>Choose Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={takePhoto}>
          <Text style={styles.actionButtonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      
      {selectedPhoto ? (
        <View style={styles.photoDetail}>
          <Image source={{ uri: selectedPhoto.uri }} style={styles.selectedImage} />
          <View style={styles.photoInfo}>
            <Text style={styles.photoDate}>{selectedPhoto.date}</Text>
            <TextInput
              style={styles.captionInput}
              placeholder="Add a caption..."
              value={selectedPhoto.caption}
              onChangeText={(text) => setSelectedPhoto({...selectedPhoto, caption: text})}
              multiline
            />
            <TouchableOpacity 
              style={styles.saveCaptionButton} 
              onPress={() => updateCaption(selectedPhoto.id, selectedPhoto.caption)}
            >
              <Text style={styles.saveCaptionButtonText}>Save Caption</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => deletePhoto(selectedPhoto.id)}
          >
            <Text style={styles.deleteButtonText}>Delete Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.gallery} contentContainerStyle={styles.galleryContent}>
          {photos.map(photo => (
            <TouchableOpacity 
              key={photo.id} 
              style={styles.photoItem}
              onPress={() => setSelectedPhoto(photo)}
            >
              <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
              {photo.caption ? (
                <Text style={styles.thumbnailCaption} numberOfLines={2}>
                  {photo.caption}
                </Text>
              ) : null}
              <Text style={styles.thumbnailDate}>{photo.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: theme.gray100,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: theme.gray600,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  actionButton: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: theme.secondary,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  actionButtonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
  },
  gallery: {
    flex: 1,
  },
  galleryContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  photoItem: {
    width: '48%',
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  thumbnailCaption: {
    fontSize: 12,
    color: theme.primary,
    marginTop: 5,
  },
  thumbnailDate: {
    fontSize: 10,
    color: theme.gray600,
    marginTop: 3,
  },
  photoDetail: {
    flex: 1,
    padding: 20,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  photoInfo: {
    marginVertical: 20,
  },
  photoDate: {
    fontSize: 14,
    color: theme.gray600,
    marginBottom: 10,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: theme.gray100,
    height: 80,
    textAlignVertical: 'top',
    color: theme.primary,
  },
  saveCaptionButton: {
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveCaptionButtonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: theme.gray600,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
  },
});

export default PhotoGalleryScreen;