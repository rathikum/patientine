import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField } from "react-native-material-textfield";
import DatePicker from "react-native-datepicker";
import { baseURL } from "../Utils/properties";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import styles from "./Style";
export default class Insurance extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "UPDATE PATIENT PROFILE ",
    headerStyle: {
      height: 60,
      backgroundColor: "#71B2F4"
    },
    headerTitleStyle: {
      fontWeight: "500",
      fontSize: 20,
      marginRight: 50,
      alignSelf: "center"
    }

  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      disabled: false,
      mobile: "",
      address: ""
    };
  }

  UpdatePrimaryInsuranceInfo = () => {
    var Details = [];
    const { navigate } = this.props.navigation;
    Details = [
      {
        email: this.state.email,
        mobile: this.state.mobile,
        address: this.state.address
      }
    ];
    navigate("UpdatePrimaryInsurance", { Details: Details });
  };
  skip = () => {
    this.setState({ disabled: true });
  };
  render() {
    return (
      <KeyboardAwareScrollView
        behaviour="padding"
        style={styles.registercontainer}
      >

          <TextField
            label="Email "
            disabled={this.state.disabled}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextField
            label="address"
            clearTextOnFocus={true}
            disabled={this.state.disabled}
            value={this.state.address}
            onChangeText={text => this.setState({ address: text })}
          />
          <View style={styles.row}>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  marginTop: 5,
                  paddingTop: 10,
                  paddingBottom: 20,
                  backgroundColor: "#71B2F4",
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#fff"
                }}
                onPress={this.skip.bind(this)}
                underlayColor="#fff"
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                    marginLeft: 20,
                    marginRight: 20,
                    textAlign: "center"
                  }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 65, paddingRight: 20 }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  marginTop: 5,
                  paddingTop: 10,
                  paddingBottom: 20,
                  backgroundColor: "#71B2F4",
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "#fff"
                }}
                onPress={this.UpdatePrimaryInsuranceInfo.bind(this)}
                underlayColor="#fff"
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                    marginLeft: 20,
                    marginRight: 20,
                    textAlign: "center"
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
50
