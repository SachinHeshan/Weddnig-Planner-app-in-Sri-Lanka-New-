import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from './theme'; // Import the theme

const WeddingIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ringContainer}>
        <View style={styles.ring}>
          <View style={styles.innerRing} />
        </View>
        <View style={styles.heart} />
      </View>
      <View style={styles.couple}>
        <View style={styles.person} />
        <View style={styles.person} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  ring: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  heart: {
    position: 'absolute',
    top: 15,
    width: 15,
    height: 15,
    backgroundColor: theme.primary,
    transform: [{ rotate: '45deg' }],
  },
  couple: {
    flexDirection: 'row',
    marginTop: 5,
  },
  person: {
    width: 15,
    height: 25,
    backgroundColor: theme.primary,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default WeddingIcon;