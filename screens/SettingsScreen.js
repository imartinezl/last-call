import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  StyleSheet,
  View,
} from 'react-native';

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
   return (
    <View style={styles.container}>

    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
