import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  AppRegistry
} from "react-native";
import Video from "react-native-video";
import Spinner from "react-native-loading-spinner-overlay";
import AppLink from "react-native-app-link";
export default class VideoCall extends Component<Props> {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <WebView
        source={{ uri: "http://13.232.225.135:9000/?id=e&&Fid=Video-Call-g" }}
      />
    );
  }
}

AppRegistry.registerComponent("Video", () => App);
