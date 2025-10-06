import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme'; // Import the theme

interface Guest {
  id: string;
  name: string;
  email: string;
  side: 'Bride' | 'Groom';
  rsvp: 'Pending' | 'Confirmed' | 'Declined';
}

interface GuestListScreenProps {
  navigation: any;
}

const GuestListScreen: React.FC<GuestListScreenProps> = ({ navigation }) => {
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', side: 'Bride', rsvp: 'Confirmed' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', side: 'Groom', rsvp: 'Pending' },
    { id: '3', name: 'Carol Williams', email: 'carol@example.com', side: 'Bride', rsvp: 'Confirmed' },
    { id: '4', name: 'David Brown', email: 'david@example.com', side: 'Groom', rsvp: 'Declined' },
  ]);
  
  const [newGuest, setNewGuest] = useState({ name: '', email: '', side: 'Bride' as 'Bride' | 'Groom' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Guests');

  const addGuest = () => {
    if (!newGuest.name.trim()) {
      Alert.alert('Error', 'Please enter a guest name');
      return;
    }
    
    const guest: Guest = {
      id: Date.now().toString(),
      name: newGuest.name,
      email: newGuest.email,
      side: newGuest.side,
      rsvp: 'Pending'
    };
    
    setGuests([...guests, guest]);
    setNewGuest({ name: '', email: '', side: 'Bride' });
  };

  const updateRSVP = (id: string, rsvp: 'Confirmed' | 'Declined') => {
    setGuests(guests.map(guest => 
      guest.id === id ? { ...guest, rsvp } : guest
    ));
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRSVPStats = () => {
    const confirmed = guests.filter(g => g.rsvp === 'Confirmed').length;
    const declined = guests.filter(g => g.rsvp === 'Declined').length;
    const pending = guests.filter(g => g.rsvp === 'Pending').length;
    return { confirmed, declined, pending };
  };

  const stats = getRSVPStats();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guest List</Text>
        <Text style={styles.subtitle}>Manage your wedding guests</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search guests..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.addGuestContainer}>
        <Text style={styles.sectionTitle}>Add New Guest</Text>
        <TextInput
          style={styles.input}
          placeholder="Guest name"
          value={newGuest.name}
          onChangeText={(text) => setNewGuest({...newGuest, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Email (optional)"
          value={newGuest.email}
          onChangeText={(text) => setNewGuest({...newGuest, email: text})}
          keyboardType="email-address"
        />
        <View style={styles.sideSelector}>
          <TouchableOpacity 
            style={[styles.sideButton, newGuest.side === 'Bride' && styles.selectedSideButton]}
            onPress={() => setNewGuest({...newGuest, side: 'Bride'})}
          >
            <Text style={[styles.sideButtonText, newGuest.side === 'Bride' && styles.selectedSideButtonText]}>
              Bride's Side
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sideButton, newGuest.side === 'Groom' && styles.selectedSideButton]}
            onPress={() => setNewGuest({...newGuest, side: 'Groom'})}
          >
            <Text style={[styles.sideButtonText, newGuest.side === 'Groom' && styles.selectedSideButtonText]}>
              Groom's Side
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addGuest}>
          <Text style={styles.buttonText}>Add Guest</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{guests.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.confirmed}</Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.declined}</Text>
          <Text style={styles.statLabel}>Declined</Text>
        </View>
      </View>
      
      <ScrollView style={styles.guestList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Guest List ({filteredGuests.length})</Text>
        {filteredGuests.map(guest => (
          <View key={guest.id} style={styles.guestItem}>
            <View style={styles.guestInfo}>
              <Text style={styles.guestName}>{guest.name}</Text>
              <Text style={styles.guestEmail}>{guest.email || 'No email'}</Text>
              <Text style={styles.guestSide}>{guest.side}'s Side</Text>
            </View>
            <View style={styles.rsvpContainer}>
              <Text style={[
                styles.rsvpStatus, 
                guest.rsvp === 'Confirmed' && styles.confirmed,
                guest.rsvp === 'Declined' && styles.declined
              ]}>
                {guest.rsvp}
              </Text>
              {guest.rsvp === 'Pending' && (
                <View style={styles.rsvpActions}>
                  <TouchableOpacity 
                    style={[styles.rsvpButton, styles.confirmButton]}
                    onPress={() => updateRSVP(guest.id, 'Confirmed')}
                  >
                    <Text style={styles.rsvpButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.rsvpButton, styles.declineButton]}
                    onPress={() => updateRSVP(guest.id, 'Declined')}
                  >
                    <Text style={styles.rsvpButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: theme.gray100,
    color: theme.primary,
  },
  addGuestContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: theme.gray100,
    marginBottom: 10,
    color: theme.primary,
  },
  sideSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sideButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedSideButton: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  sideButtonText: {
    color: theme.gray600,
    fontWeight: '500',
  },
  selectedSideButtonText: {
    color: theme.buttonText,
  },
  addButton: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.buttonText,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.borderLight,
    backgroundColor: theme.gray100,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.gray600,
    marginTop: 3,
  },
  guestList: {
    flex: 1,
    padding: 20,
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
  },
  guestEmail: {
    fontSize: 14,
    color: theme.gray600,
    marginTop: 3,
  },
  guestSide: {
    fontSize: 12,
    color: theme.gray600,
    marginTop: 3,
  },
  rsvpContainer: {
    alignItems: 'flex-end',
  },
  rsvpStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.gray600,
  },
  confirmed: {
    color: theme.primary,
  },
  declined: {
    color: theme.primary,
  },
  rsvpActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  rsvpButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 5,
  },
  confirmButton: {
    backgroundColor: theme.primary,
  },
  declineButton: {
    backgroundColor: theme.primary,
  },
  rsvpButtonText: {
    color: theme.buttonText,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default GuestListScreen;