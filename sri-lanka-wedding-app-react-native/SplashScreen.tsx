import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  StatusBar 
} from 'react-native';
import app, { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface SplashScreenProps {
  navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('MainTabs');
      }
    });
    
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ImageBackground 
        source={require('./assets/images/splasherbackground.jpeg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Wedding Planner Text */}
          <View style={styles.titleContainer}>
            <Text style={styles.weddingText}>WEDDING</Text>
            <Text style={styles.plannerText}>PLANNER</Text>
          </View>

          {/* Get Started Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.getStartedButton}
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.9}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Text */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Made with 💖 for your special day</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  weddingText: {
    top: 170,
    fontSize: 42,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 8,
    marginBottom: 5,
    fontFamily: 'serif',
  },
  plannerText: {
    top: 170,
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 4,
    fontFamily: 'serif',
  },
  buttonContainer: {
    top: 160,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0,
    shadowRadius: 12,
    elevation: 8,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  footer: {
    marginBottom: 40,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '300',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
});

export default SplashScreen;