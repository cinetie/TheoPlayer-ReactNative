/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import TheoPlayerViewScreen from './src/TheoPlayerViewScreen'

export default class App extends React.Component<Props> {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TheoPlayerViewScreen />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
