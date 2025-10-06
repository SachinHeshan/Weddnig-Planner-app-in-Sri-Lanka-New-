import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import app, { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import theme from './theme';

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    let valid = true;
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'auth/internal-error':
          errorMessage = 'Server error. Please try again later.';
          break;
      }
      
      Alert.alert('Sign In Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>
          
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={[
                styles.inputWrapper,
                errors.email && styles.inputError
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors({...errors, email: undefined});
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>
                  {errors.email}
                </Text>
              ) : null}
            </View>
            
            <View style={styles.inputContainer}>
              <View style={[
                styles.inputWrapper,
                errors.password && styles.inputError
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors({...errors, password: undefined});
                    }
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.password ? (
                <Text style={styles.errorText}>
                  {errors.password}
                </Text>
              ) : null}
            </View>
            
            <TouchableOpacity 
              style={styles.forgotPassword} 
              onPress={() => {}}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.signInButton, 
                loading && styles.disabledButton
              ]} 
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  input: {
    padding: 18,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#000000',
    fontWeight: '500',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginTop: 8,
    marginLeft: 8,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#666666',
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '400',
  },
  link: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;