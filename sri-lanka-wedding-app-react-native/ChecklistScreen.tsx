import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  StatusBar,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

interface ChecklistScreenProps {
  navigation: any;
}

const ChecklistScreen: React.FC<ChecklistScreenProps> = ({ navigation }) => {
  // Default checklist items
  const defaultChecklistItems: ChecklistItem[] = [
    // Planning Category
    { id: '1', title: 'Choose a wedding date', completed: true, category: 'Planning' },
    { id: '2', title: 'Determine budget', completed: false, category: 'Planning' },
    { id: '3', title: 'Create guest list', completed: false, category: 'Planning' },
    { id: '4', title: 'Choose wedding party', completed: false, category: 'Planning' },
    
    // Venue Category
    { id: '5', title: 'Book ceremony venue', completed: false, category: 'Venue' },
    { id: '6', title: 'Book reception venue', completed: false, category: 'Venue' },
    { id: '7', title: 'Visit and finalize venues', completed: false, category: 'Venue' },
    
    // Vendors Category
    { id: '8', title: 'Hire photographer', completed: false, category: 'Vendors' },
    { id: '9', title: 'Hire videographer', completed: false, category: 'Vendors' },
    { id: '10', title: 'Book florist', completed: false, category: 'Vendors' },
    { id: '11', title: 'Hire DJ/band', completed: false, category: 'Vendors' },
    { id: '12', title: 'Book officiant', completed: false, category: 'Vendors' },
    
    // Attire Category
    { id: '13', title: 'Choose wedding dress', completed: false, category: 'Attire' },
    { id: '14', title: 'Select groom\'s attire', completed: false, category: 'Attire' },
    { id: '15', title: 'Choose bridesmaid dresses', completed: false, category: 'Attire' },
    { id: '16', title: 'Select groomsmen attire', completed: false, category: 'Attire' },
    
    // Food & Drink Category
    { id: '17', title: 'Choose catering menu', completed: false, category: 'Food & Drink' },
    { id: '18', title: 'Select wedding cake', completed: false, category: 'Food & Drink' },
    { id: '19', title: 'Plan bar menu', completed: false, category: 'Food & Drink' },
    
    // Communication Category
    { id: '20', title: 'Design invitations', completed: false, category: 'Communication' },
    { id: '21', title: 'Send save-the-dates', completed: false, category: 'Communication' },
    { id: '22', title: 'Mail invitations', completed: false, category: 'Communication' },
    { id: '23', title: 'Create wedding website', completed: false, category: 'Communication' },
    
    // Travel & Honeymoon Category
    { id: '24', title: 'Plan honeymoon', completed: false, category: 'Travel & Honeymoon' },
    { id: '25', title: 'Book flights and hotels', completed: false, category: 'Travel & Honeymoon' },
    { id: '26', title: 'Arrange transportation', completed: false, category: 'Travel & Honeymoon' },
    
    // Beauty & Health Category
    { id: '27', title: 'Schedule hair and makeup trial', completed: false, category: 'Beauty & Health' },
    { id: '28', title: 'Book final hair and makeup', completed: false, category: 'Beauty & Health' },
    { id: '29', title: 'Start skincare routine', completed: false, category: 'Beauty & Health' },
    
    // Legal & Financial Category
    { id: '30', title: 'Get marriage license', completed: false, category: 'Legal & Financial' },
    { id: '31', title: 'Purchase wedding rings', completed: false, category: 'Legal & Financial' },
    { id: '32', title: 'Set up gift registry', completed: false, category: 'Legal & Financial' },
  ];

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklistItems);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Planning');
  const [addModalVisible, setAddModalVisible] = useState(false);

  const toggleItem = (id: string) => {
    setChecklistItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEditing = (item: ChecklistItem) => {
    setEditingItem(item);
    setNewItemText(item.title);
    setSelectedCategory(item.category);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (newItemText.trim() && editingItem) {
      setChecklistItems(prevItems =>
        prevItems.map(item =>
          item.id === editingItem.id
            ? { ...item, title: newItemText.trim(), category: selectedCategory }
            : item
        )
      );
      setEditModalVisible(false);
      setEditingItem(null);
      setNewItemText('');
    }
  };

  const addNewItem = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setNewItemText('');
    setAddModalVisible(true);
  };

  const saveNewItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now().toString(),
        title: newItemText.trim(),
        completed: false,
        category: selectedCategory
      };
      setChecklistItems(prevItems => [...prevItems, newItem]);
      setAddModalVisible(false);
      setNewItemText('');
      setSelectedCategory('Planning');
    }
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setChecklistItems(prevItems => prevItems.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const resetChecklist = () => {
    Alert.alert(
      'Reset Checklist',
      'This will reset all items to default and clear your progress. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => setChecklistItems(defaultChecklistItems.map(item => ({ ...item, completed: false })))
        }
      ]
    );
  };

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const EditModal = () => (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Checklist Item</Text>
          
          <TextInput
            style={styles.textInput}
            value={newItemText}
            onChangeText={setNewItemText}
            placeholder="Enter item description"
            placeholderTextColor="#999"
          />
          
          <Text style={styles.categoryLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={saveEdit}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  const AddModal = () => (
    <Modal
      visible={addModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setAddModalVisible(false)}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Add New Item {selectedCategory !== 'Planning' ? `to ${selectedCategory}` : ''}
          </Text>
          
          <TextInput
            style={styles.textInput}
            value={newItemText}
            onChangeText={setNewItemText}
            placeholder="Enter new checklist item"
            placeholderTextColor="#999"
            autoFocus={true}
          />
          
          <Text style={styles.categoryLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextSelected
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setAddModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={saveNewItem}
            >
              <Text style={styles.saveButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Wedding Checklist</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={resetChecklist}
            >
              <MaterialIcons name="refresh" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => addNewItem()}
            >
              <MaterialIcons name="add" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitle}>Track your planning progress</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{progressPercentage}% Complete</Text>
        </View>
      </View>
      
      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalCount - completedCount}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Checklist Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <View key={category} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLeft}>
                <TouchableOpacity 
                  style={styles.addCategoryButton}
                  onPress={() => addNewItem(category)}
                >
                  <MaterialIcons name="add" size={20} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.categoryTitle}>{category}</Text>
              </View>
              <Text style={styles.categoryCount}>
                {checklistItems.filter(item => item.category === category && item.completed).length}/
                {checklistItems.filter(item => item.category === category).length}
              </Text>
            </View>
            
            {checklistItems
              .filter(item => item.category === category)
              .map(item => (
                <TouchableOpacity 
                  key={item.id} 
                  style={[
                    styles.checklistItem,
                    item.completed && styles.checklistItemCompleted
                  ]}
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.7}
                  onLongPress={() => startEditing(item)}
                >
                  <View style={styles.itemLeft}>
                    <View style={[
                      styles.checkbox, 
                      item.completed && styles.checkboxCompleted
                    ]}>
                      {item.completed && (
                        <MaterialIcons name="check" size={16} color="#FFFFFF" />
                      )}
                    </View>
                    <Text style={[
                      styles.itemText, 
                      item.completed && styles.itemTextCompleted
                    ]}>
                      {item.title}
                    </Text>
                  </View>
                  
                  <View style={styles.itemRight}>
                    {item.completed && (
                      <MaterialIcons name="check-circle" size={20} color="#000000" />
                    )}
                    <TouchableOpacity 
                      style={styles.editButton}
                      onPress={() => startEditing(item)}
                    >
                      <MaterialIcons name="edit" size={18} color="#666666" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => deleteItem(item.id)}
                    >
                      <MaterialIcons name="delete-outline" size={18} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        ))}
      </ScrollView>

      <EditModal />
      <AddModal />
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
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCategoryButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  checklistItem: {
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
  checklistItemCompleted: {
    backgroundColor: '#F8F8F8',
    borderColor: '#E8E8E8',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  checkboxCompleted: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    flex: 1,
  },
  itemTextCompleted: {
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 4,
    marginLeft: 8,
  },
  deleteButton: {
    padding: 4,
    marginLeft: 4,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#000000',
    marginBottom: 20,
    fontWeight: '500',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryChipSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#000000',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ChecklistScreen;