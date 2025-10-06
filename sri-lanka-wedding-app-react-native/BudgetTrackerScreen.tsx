import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from './theme'; // Import the theme

interface BudgetItem {
  id: string;
  category: string;
  allocated: string;
  spent: string;
}

interface BudgetTrackerScreenProps {
  navigation: any;
}

const BudgetTrackerScreen: React.FC<BudgetTrackerScreenProps> = ({ navigation }) => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Venue', allocated: '5000', spent: '4500' },
    { id: '2', category: 'Catering', allocated: '3000', spent: '2800' },
    { id: '3', category: 'Photography', allocated: '2000', spent: '2000' },
    { id: '4', category: 'Attire', allocated: '1500', spent: '1200' },
  ]);
  
  const [newItem, setNewItem] = useState({ category: '', allocated: '', spent: '0' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Home');

  const calculateTotal = () => {
    const totalAllocated = budgetItems.reduce((sum, item) => sum + parseFloat(item.allocated || '0'), 0);
    const totalSpent = budgetItems.reduce((sum, item) => sum + parseFloat(item.spent || '0'), 0);
    return { totalAllocated, totalSpent, remaining: totalAllocated - totalSpent };
  };

  const totals = calculateTotal();

  const addOrUpdateItem = () => {
    if (!newItem.category.trim() || !newItem.allocated.trim()) {
      Alert.alert('Error', 'Please enter category and allocated amount');
      return;
    }

    if (editingId) {
      // Update existing item
      setBudgetItems(budgetItems.map(item => 
        item.id === editingId 
          ? { ...item, ...newItem } 
          : item
      ));
      setEditingId(null);
    } else {
      // Add new item
      const newItemWithId: BudgetItem = {
        id: Date.now().toString(),
        ...newItem
      };
      setBudgetItems([...budgetItems, newItemWithId]);
    }
    
    setNewItem({ category: '', allocated: '', spent: '0' });
  };

  const editItem = (item: BudgetItem) => {
    setNewItem({
      category: item.category,
      allocated: item.allocated,
      spent: item.spent
    });
    setEditingId(item.id);
  };

  const deleteItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNewItem({ category: '', allocated: '', spent: '0' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewItem({ category: '', allocated: '', spent: '0' });
  };

  const getProgressColor = (allocated: string, spent: string) => {
    const alloc = parseFloat(allocated || '0');
    const spend = parseFloat(spent || '0');
    const percentage = alloc > 0 ? (spend / alloc) * 100 : 0;
    
    if (percentage > 100) return theme.primary; // Black - over budget
    if (percentage > 90) return theme.gray700; // Dark gray - warning
    return theme.gray600; // Gray - on track
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget Tracker</Text>
        <Text style={styles.subtitle}>Manage your wedding expenses</Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Allocated</Text>
          <Text style={styles.summaryValue}>${totals.totalAllocated.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={styles.summaryValue}>${totals.totalSpent.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={[styles.summaryValue, totals.remaining < 0 && styles.negativeValue]}>
            ${totals.remaining.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>{editingId ? 'Edit' : 'Add'} Budget Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Category (e.g., Venue, Catering)"
          value={newItem.category}
          onChangeText={(text) => setNewItem({...newItem, category: text})}
        />
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>Allocated ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={newItem.allocated}
              onChangeText={(text) => setNewItem({...newItem, allocated: text})}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.inputLabel}>Spent ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={newItem.spent}
              onChangeText={(text) => setNewItem({...newItem, spent: text})}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.buttonRow}>
          {editingId ? (
            <>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateButton} onPress={addOrUpdateItem}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={addOrUpdateItem}>
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Budget Items</Text>
        {budgetItems.map((item) => {
          const allocated = parseFloat(item.allocated || '0');
          const spent = parseFloat(item.spent || '0');
          const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
          
          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => editItem(item)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Allocated: </Text>
                <Text style={styles.amountValue}>${allocated.toFixed(2)}</Text>
              </View>
              
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Spent: </Text>
                <Text style={styles.amountValue}>${spent.toFixed(2)}</Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: getProgressColor(item.allocated, item.spent)
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>{percentage.toFixed(1)}% of budget</Text>
                <Text style={styles.remainingText}>
                  ${Math.max(allocated - spent, 0).toFixed(2)} remaining
                </Text>
              </View>
            </View>
          );
        })}
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: theme.gray100,
  },
  summaryCard: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.gray600,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  negativeValue: {
    color: theme.primary,
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
  inputLabel: {
    fontSize: 14,
    color: theme.gray600,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
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
  itemsContainer: {
    flex: 1,
    padding: 20,
  },
  itemCard: {
    backgroundColor: theme.gray100,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  itemActions: {
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
  amountRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  amountLabel: {
    fontSize: 14,
    color: theme.gray600,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.primary,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: theme.gray300,
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.gray600,
    borderRadius: 5,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  progressText: {
    fontSize: 12,
    color: theme.gray600,
  },
  remainingText: {
    fontSize: 12,
    color: theme.gray600,
    fontWeight: 'bold',
  },
});

export default BudgetTrackerScreen;