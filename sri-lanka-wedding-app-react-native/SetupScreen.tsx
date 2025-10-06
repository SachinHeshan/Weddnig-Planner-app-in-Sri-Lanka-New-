import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import app, { auth } from './firebaseConfig';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import theme from './theme'; // Import the theme

interface SetupScreenProps {
  navigation: any;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [budget, setBudget] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{username?: string; location?: string; budget?: string}>({});
  const [activeTab, setActiveTab] = useState('Settings');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUsername(user.displayName || '');
      } else {
        setCurrentUser(null);
      }
    });
    
    return unsubscribe;
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors: {username?: string; location?: string; budget?: string} = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }
    
    if (!location.trim()) {
      newErrors.location = 'Location is required';
      valid = false;
    }
    
    if (!budget) {
      newErrors.budget = 'Budget is required';
      valid = false;
    } else if (isNaN(Number(budget)) || Number(budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;
    
    try {
      // Update the user's profile with their username
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: username
        });
      }
      
      // In a real app, you would save this data to a database
      // For now, we'll just navigate to the home screen
      Alert.alert(
        'Setup Complete!',
        'Your wedding details have been saved.',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('MainTabs'),
          },
        ]
      );
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

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setWeddingDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wedding Details</Text>
        <Text style={styles.subtitle}>Tell us about your special day</Text>
      </View>
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) {
                setErrors({...errors, username: undefined});
              }
            }}
            placeholder="Enter your username"
          />
          {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wedding Location</Text>
          <TextInput
            style={[styles.input, errors.location && styles.inputError]}
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              if (errors.location) {
                setErrors({...errors, location: undefined});
              }
            }}
            placeholder="City, Country"
          />
          {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wedding Date</Text>
          <TouchableOpacity 
            style={styles.dateButton} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(weddingDate)}</Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={weddingDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Wedding Budget (RS)</Text>
          <TextInput
            style={[styles.input, errors.budget && styles.inputError]}
            value={budget}
            onChangeText={(text) => {
              setBudget(text);
              if (errors.budget) {
                setErrors({...errors, budget: undefined});
              }
            }}
            placeholder="Enter your budget"
            keyboardType="numeric"
          />
          {errors.budget ? <Text style={styles.errorText}>{errors.budget}</Text> : null}
        </View>
        
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue to App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: theme.gray100,
    color: theme.primary,
  },
  inputError: {
    borderColor: theme.primary,
    borderWidth: 2,
  },
  errorText: {
    color: theme.primary,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  dateButton: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    backgroundColor: theme.gray100,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: theme.primary,
  },
  continueButton: {
    backgroundColor: theme.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.buttonText,
  },
});

export default SetupScreen;