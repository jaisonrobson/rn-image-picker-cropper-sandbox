import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Main from './app/Main'

export default function App() {
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Main />

        <StatusBar style="auto" />
      </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
