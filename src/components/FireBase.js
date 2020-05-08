import React, { Component } from "react";
import { View } from "react-native";
//import Spinner from "react-native-loading-spinner-overlay";
export default class Firebase extends Component {
  static navigationOptions = { title: "" };
  componentWillMount() {
    alert("test");
    const { navigate } = this.props.navigation;
    firebase.initializeApp({
      apiKey: "AIzaSyDGnCo4xzQ0tmmD70F9bGtq7IXHCi9F0FU",
      authDomain: "patientine-676bf.firebaseapp.com",
      databaseURL: "https://patientine-676bf.firebaseio.com",
      projectId: "patientine-676bf",
      storageBucket: "patientine-676bf.appspot.com",
      messagingSenderId: "53239811826"
    });
    navigate("Login");
  }
  render() {
    return <View />;
  }
}
