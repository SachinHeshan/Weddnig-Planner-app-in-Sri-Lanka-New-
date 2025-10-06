import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  StatusBar,
  Image,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface InvitationCard {
  id: string;
  name: string;
  fileUri: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
}

interface InvitationScreenProps {
  navigation: any;
}

const InvitationScreen: React.FC<InvitationScreenProps> = ({ navigation }) => {
  const [invitationCards, setInvitationCards] = useState<InvitationCard[]>([
    {
      id: '1',
      name: 'Wedding Invitation',
      fileUri: '',
      fileName: 'wedding_invitation.pdf',
      fileSize: 2.5,
      uploadDate: '2024-01-15'
    }
  ]);
  const [selectedCard, setSelectedCard] = useState<InvitationCard | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileInfo = await FileSystem.getInfoAsync(asset.uri);
        const fileSizeInMB = fileInfo.exists ? fileInfo.size / (1024 * 1024) : 0;

        const newCard: InvitationCard = {
          id: Date.now().toString(),
          name: `Invitation Card ${invitationCards.length + 1}`,
          fileUri: asset.uri,
          fileName: asset.name || 'invitation.pdf',
          fileSize: parseFloat(fileSizeInMB.toFixed(2)),
          uploadDate: new Date().toISOString().split('T')[0]
        };

        setInvitationCards(prev => [newCard, ...prev]);
        setSelectedCard(newCard);
        Alert.alert('Success', 'Invitation card uploaded successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload invitation card');
      console.error('Document picker error:', error);
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to read PDF files',
            buttonPositive: 'OK'
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Permission error:', error);
        return false;
      }
    }
    return true;
  };

  const shareViaEmail = async (card: InvitationCard) => {
    try {
      const subject = encodeURIComponent('Wedding Invitation');
      const body = encodeURIComponent(`You're invited to our wedding!\n\nPlease find the invitation card attached.\n\nWe can't wait to celebrate with you!`);
      const emailUrl = `mailto:?subject=${subject}&body=${body}`;
      
      // For actual email with attachment, you would use a library like expo-mail-composer
      Alert.alert(
        'Share via Email',
        'The invitation card is ready to be shared via email. In a real app, this would attach the PDF file.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to open email');
    }
  };

  const shareViaWhatsApp = async (card: InvitationCard) => {
    try {
      const message = encodeURIComponent('You\'re invited to our wedding! 🎉\n\nPlease check the invitation card. We can\'t wait to celebrate with you!');
      const whatsappUrl = `whatsapp://send?text=${message}`;
      
      // For actual WhatsApp sharing with file, you would need additional setup
      Alert.alert(
        'Share via WhatsApp',
        'The invitation card is ready to be shared via WhatsApp. In a real app, this would send the PDF file.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to open WhatsApp');
    }
  };

  const shareViaOther = async (card: InvitationCard) => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(card.fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Wedding Invitation',
        });
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share invitation card');
    }
  };

  const viewInvitation = (card: InvitationCard) => {
    Alert.alert(
      'View Invitation',
      'Would you like to open the invitation card?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open', 
          onPress: () => {
            // In a real app, you would use a PDF viewer
            Alert.alert('PDF Viewer', 'This would open a PDF viewer in a real app');
          }
        }
      ]
    );
  };

  const deleteInvitation = (card: InvitationCard) => {
    Alert.alert(
      'Delete Invitation',
      'Are you sure you want to delete this invitation card?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setInvitationCards(prev => prev.filter(c => c.id !== card.id));
            if (selectedCard?.id === card.id) {
              setSelectedCard(null);
            }
            Alert.alert('Success', 'Invitation card deleted successfully');
          }
        }
      ]
    );
  };

  const formatFileSize = (size: number) => {
    return `${size} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Invitation Cards</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={pickDocument}
          >
            <MaterialIcons name="upload" size={20} color="#FFFFFF" />
            <Text style={styles.uploadButtonText}>Upload PDF</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Upload and share your wedding invitation cards</Text>
      </View>

      {/* Upload Section */}
      {invitationCards.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="picture-as-pdf" size={80} color="#E5E5E5" />
          <Text style={styles.emptyStateTitle}>No Invitation Cards</Text>
          <Text style={styles.emptyStateText}>
            Upload your wedding invitation card PDF to start sharing with guests
          </Text>
          <TouchableOpacity 
            style={styles.uploadEmptyButton}
            onPress={pickDocument}
          >
            <MaterialIcons name="upload" size={20} color="#FFFFFF" />
            <Text style={styles.uploadEmptyButtonText}>Upload Your First Card</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Selected Card Preview */}
          {selectedCard && (
            <View style={styles.selectedCard}>
              <Text style={styles.selectedCardTitle}>Selected Card</Text>
              <View style={styles.cardPreview}>
                <MaterialIcons name="picture-as-pdf" size={40} color="#000000" />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{selectedCard.name}</Text>
                  <Text style={styles.cardDetails}>
                    {formatFileSize(selectedCard.fileSize)} • {formatDate(selectedCard.uploadDate)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => viewInvitation(selectedCard)}
                >
                  <MaterialIcons name="visibility" size={20} color="#000000" />
                </TouchableOpacity>
              </View>

              {/* Share Options */}
              <Text style={styles.shareTitle}>Share Invitation Card</Text>
              <View style={styles.shareOptions}>
                <TouchableOpacity 
                  style={styles.shareOption}
                  onPress={() => shareViaEmail(selectedCard)}
                >
                  <MaterialIcons name="email" size={24} color="#000000" />
                  <Text style={styles.shareOptionText}>Email</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.shareOption}
                  onPress={() => shareViaWhatsApp(selectedCard)}
                >
                  <MaterialIcons name="chat" size={24} color="#000000" />
                  <Text style={styles.shareOptionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.shareOption}
                  onPress={() => shareViaOther(selectedCard)}
                >
                  <MaterialIcons name="share" size={24} color="#000000" />
                  <Text style={styles.shareOptionText}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* All Invitation Cards List */}
          <View style={styles.cardsList}>
            <Text style={styles.cardsListTitle}>Your Invitation Cards</Text>
            {invitationCards.map(card => (
              <TouchableOpacity 
                key={card.id}
                style={[
                  styles.cardItem,
                  selectedCard?.id === card.id && styles.cardItemSelected
                ]}
                onPress={() => setSelectedCard(card)}
                onLongPress={() => deleteInvitation(card)}
              >
                <View style={styles.cardItemLeft}>
                  <MaterialIcons name="picture-as-pdf" size={24} color="#000000" />
                  <View style={styles.cardItemInfo}>
                    <Text style={styles.cardItemName}>{card.name}</Text>
                    <Text style={styles.cardItemDetails}>
                      {formatFileSize(card.fileSize)} • {formatDate(card.uploadDate)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.cardItemActions}>
                  {selectedCard?.id === card.id && (
                    <MaterialIcons name="check-circle" size={20} color="#000000" />
                  )}
                  <TouchableOpacity 
                    style={styles.cardActionButton}
                    onPress={() => deleteInvitation(card)}
                  >
                    <MaterialIcons name="delete-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>How to Use</Text>
            <View style={styles.instructionItem}>
              <MaterialIcons name="upload" size={20} color="#000000" />
              <Text style={styles.instructionText}>Upload your invitation card PDF</Text>
            </View>
            <View style={styles.instructionItem}>
              <MaterialIcons name="select-all" size={20} color="#000000" />
              <Text style={styles.instructionText}>Select a card to share</Text>
            </View>
            <View style={styles.instructionItem}>
              <MaterialIcons name="share" size={20} color="#000000" />
              <Text style={styles.instructionText}>Share via email, WhatsApp, or other apps</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  uploadEmptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadEmptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  selectedCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  cardPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666666',
  },
  viewButton: {
    padding: 8,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareOption: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minWidth: 80,
  },
  shareOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
  },
  cardsList: {
    marginBottom: 24,
  },
  cardsListTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardItemSelected: {
    borderColor: '#000000',
    borderWidth: 2,
  },
  cardItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardItemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  cardItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cardItemDetails: {
    fontSize: 14,
    color: '#666666',
  },
  cardItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionButton: {
    padding: 4,
    marginLeft: 8,
  },
  instructions: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
    flex: 1,
  },
});

export default InvitationScreen;