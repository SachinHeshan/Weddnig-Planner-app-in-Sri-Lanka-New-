import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import ChecklistScreen from './ChecklistScreen';
import GuestListScreen from './GuestListScreen';
import BudgetTrackerScreen from './BudgetTrackerScreen';
import TimelineScreen from './TimelineScreen';
import PhotoGalleryScreen from './PhotoGalleryScreen';
import VendorDirectoryScreen from './VendorDirectoryScreen';
import SetupScreen from './SetupScreen';
import WeddingPackageScreen from './WeddingPackageScreen';
import VendorDetailScreen from './VendorDetailScreen';
import InvitationScreen from './InvitationScreen';
import theme from './theme';
import { MaterialIcons } from '@expo/vector-icons';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator with bottom navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingVertical: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={VendorDirectoryScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Packages" 
        component={WeddingPackageScreen}
        options={{
          tabBarLabel: 'Packages',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Planning" 
        component={ChecklistScreen}
        options={{
          tabBarLabel: 'Planning',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="event-note" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.headerBackground,
          },
          headerTintColor: theme.textLight,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.textLight,
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="GuestList" component={GuestListScreen} />
        <Stack.Screen name="BudgetTracker" component={BudgetTrackerScreen} />
        <Stack.Screen name="Timeline" component={TimelineScreen} />
        <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
        <Stack.Screen name="VendorDetail" component={VendorDetailScreen} 
          options={{ 
            title: 'Vendor Details',
            headerShown: false,
          }} 
        />
        <Stack.Screen name="Invitation" component={InvitationScreen} 
          options={{ 
            title: 'Wedding Invitation',
            headerShown: false,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}