import React, { Component } from "react";
import {
  Text,
  Image,
  TextInput,
  NativeModules,
  TouchableOpacity,
  KeyboardAvoidingView,
  View
} from "react-native";
import styles from "./Style";
import { TextField } from "react-native-material-textfield";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Card } from "react-native-elements";
var { DevMenu } = NativeModules;
export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Forget Password",
    headerStyle: {
      height: 50,
      backgroundColor: "#1B81E5"
    },
    headerTitleStyle: {
      fontWeight: "500",
      fontSize: 18,
      marginRight: 50,
      alignSelf: "center"
    }
  };
  onForgetPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(function() {
        alert("Please Check your Email..");
      })
      .catch(function(error) {
        alert(error);
      });
  }
  password = () => {
    return <MaterialIcon size={24} name="lock" color="#00000099" />;
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          backgroundColor: "#F5F5F5",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Card>
          <View
            style={{
              backgroundColor: "#2089DC",
              padding: 10,
              borderRadius: 3,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Forget Password
            </Text>
          </View>
          <View>
            <TextField
              style={styles.input}
              label="Username or Email"
              keyboardType="email-address"
              value={this.state.email}
              renderAccessory={this.password}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={styles.secButtonViewSkip}>
            <TouchableOpacity
              style={styles.secButtonSkip}
              onPress={this.onForgetPassword.bind(this)}
              underlayColor="#fff"
            >
              <Text style={styles.secTextRegister}> Submit </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}
