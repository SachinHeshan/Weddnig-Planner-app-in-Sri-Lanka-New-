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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{username?: string; email?: string; password?: string; confirmPassword?: string}>({});

  const validateForm = () => {
    let valid = true;
    const newErrors: {username?: string; email?: string; password?: string; confirmPassword?: string} = {};
    
    if (!username) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }
    
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
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their username
      await updateProfile(userCredential.user, {
        displayName: username
      });
      
      // Navigate to setup screen after successful sign up
      navigation.navigate('Setup');
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'auth/internal-error':
          errorMessage = 'Server error. Please try again later.';
          break;
      }
      
      Alert.alert('Sign Up Error', errorMessage);
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our wedding planning community</Text>
          </View>
          
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={[
                styles.inputWrapper,
                errors.username && styles.inputError
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    if (errors.username) {
                      setErrors({...errors, username: undefined});
                    }
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.username ? (
                <Text style={styles.errorText}>
                  {errors.username}
                </Text>
              ) : null}
            </View>
            
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
            
            <View style={styles.inputContainer}>
              <View style={[
                styles.inputWrapper,
                errors.confirmPassword && styles.inputError
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) {
                      setErrors({...errors, confirmPassword: undefined});
                    }
                  }}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>
                  {errors.confirmPassword}
                </Text>
              ) : null}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.signUpButton, 
                loading && styles.disabledButton
              ]} 
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>Sign In</Text>
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
    marginBottom: 40,
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
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
  signUpButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 10,
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
    marginTop: 30,
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

export default SignUpScreen;