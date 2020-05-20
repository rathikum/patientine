import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
export default class Payment extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome..</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#27ae60'
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10
  }
})
