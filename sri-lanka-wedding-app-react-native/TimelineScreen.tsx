import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme'; // Import the theme

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
}

interface TimelineScreenProps {
  navigation: any;
}

const TimelineScreen: React.FC<TimelineScreenProps> = ({ navigation }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([
    { id: '1', time: '10:00 AM', title: 'Hair & Makeup', description: 'Bride and bridesmaids getting ready' },
    { id: '2', time: '12:00 PM', title: 'Lunch Break', description: 'Meal for wedding party' },
    { id: '3', time: '2:00 PM', title: 'Ceremony', description: 'Wedding ceremony at the garden' },
    { id: '4', time: '3:30 PM', title: 'Cocktail Hour', description: 'Drinks and appetizers' },
    { id: '5', time: '4:30 PM', title: 'Reception', description: 'Dinner and dancing' },
  ]);
  
  const [newEvent, setNewEvent] = useState({ time: '12:00 PM', title: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Timeline');

  const addOrUpdateEvent = () => {
    if (!newEvent.title.trim()) {
      Alert.alert('Error', 'Please enter an event title');
      return;
    }

    if (editingId) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingId 
          ? { ...event, ...newEvent } 
          : event
      ));
      setEditingId(null);
    } else {
      // Add new event
      const newEventWithId: TimelineEvent = {
        id: Date.now().toString(),
        ...newEvent
      };
      setEvents([...events, newEventWithId]);
    }
    
    setNewEvent({ time: '12:00 PM', title: '', description: '' });
  };

  const editEvent = (event: TimelineEvent) => {
    setNewEvent({
      time: event.time,
      title: event.title,
      description: event.description
    });
    setEditingId(event.id);
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNewEvent({ time: '12:00 PM', title: '', description: '' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewEvent({ time: '12:00 PM', title: '', description: '' });
  };

  const showTimePicker = () => {
    // Simple time input for now - in a real app you might want to use a time picker library
    Alert.prompt(
      'Enter Time',
      'Please enter the time (e.g., 2:30 PM)',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (time: string | undefined) => {
            if (time) {
              setNewEvent({ ...newEvent, time });
            }
          },
        },
      ],
      'plain-text',
      newEvent.time
    );
  };

  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => {
    const timeA = a.time.split(' ')[0].split(':');
    const timeB = b.time.split(' ')[0].split(':');
    const hourA = parseInt(timeA[0]) + (a.time.includes('PM') && timeA[0] !== '12' ? 12 : 0);
    const hourB = parseInt(timeB[0]) + (b.time.includes('PM') && timeB[0] !== '12' ? 12 : 0);
    return hourA - hourB;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wedding Timeline</Text>
        <Text style={styles.subtitle}>Plan your special day schedule</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>{editingId ? 'Edit' : 'Add'} Event</Text>
        <TouchableOpacity style={styles.timePicker} onPress={showTimePicker}>
          <Text style={styles.timeText}>{newEvent.time}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Event title"
          value={newEvent.title}
          onChangeText={(text) => setNewEvent({...newEvent, title: text})}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description (optional)"
          value={newEvent.description}
          onChangeText={(text) => setNewEvent({...newEvent, description: text})}
          multiline
          numberOfLines={3}
        />
        <View style={styles.buttonRow}>
          {editingId ? (
            <>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateButton} onPress={addOrUpdateEvent}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={addOrUpdateEvent}>
              <Text style={styles.buttonText}>Add Event</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView style={styles.eventsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Timeline Events ({sortedEvents.length})</Text>
        {sortedEvents.map((event, index) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.timelineIndicator}>
              <View style={styles.timelineDot} />
              {index < sortedEvents.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <View>
                  <Text style={styles.eventTime}>{event.time}</Text>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
                <View style={styles.eventActions}>
                  <TouchableOpacity onPress={() => editEvent(event)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteEvent(event.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {event.description ? (
                <Text style={styles.eventDescription}>{event.description}</Text>
              ) : null}
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
  formContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 15,
  },
  timePicker: {
    padding: 15,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    backgroundColor: theme.gray100,
    marginBottom: 15,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: theme.primary,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: theme.gray100,
    marginBottom: 15,
    color: theme.primary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  updateButton: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: theme.secondary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  cancelButtonText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  buttonText: {
    color: theme.buttonText,
    fontWeight: 'bold',
  },
  eventsContainer: {
    flex: 1,
    padding: 20,
  },
  eventCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.primary,
  },
  timelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: theme.primary,
  },
  eventContent: {
    flex: 1,
    backgroundColor: theme.gray100,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  eventTime: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginTop: 3,
  },
  eventActions: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
  },
  editButtonText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  deleteButton: {
  },
  deleteButtonText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: theme.gray600,
  },
});

export default TimelineScreen;