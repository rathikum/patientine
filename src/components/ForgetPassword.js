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
import DropdownAlert from "react-native-dropdownalert";
import { TextField } from "react-native-material-textfield";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Card } from "react-native-elements";
import StyledConstants from "../constants/styleConstants";
import { scaledHeight } from "../Utils/Resolution";

var { DevMenu } = NativeModules;
export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      item: { type: "", title: "", message: "" }
    };
  }
  static navigationOptions = {
    headerTintColor: StyledConstants.colors.WHITE_COLOR,
    title: "Forgot Password",
    headerStyle: {
      height: scaledHeight(50),
      backgroundColor: StyledConstants.colors.primaryColor
    },
    headerTitleStyle: {
      fontWeight: "500",
      fontSize: scaledHeight(18),
      // marginRight: 50,
      alignSelf: "center"
    }
  };
  componentDidMount = () => {};
  onForgetPassword() {
    // firebase
    //   .auth()
    //   .sendPasswordResetEmail(this.state.email)
    //   .then(function() {
    //     alert("Please Check your Email..");
    //   })
    //   .catch(function(error) {
    //     alert(error);
    //   });
  }

  password = () => {
    return <MaterialIcon size={24} name="lock" color={StyledConstants.colors.primaryColor} />;
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          backgroundColor: StyledConstants.colors.BACKGROUND_GRAY,
          flex: 1
        }}
      >
        <Card
        containerStyle={{
          marginTop: scaledHeight(30),
          padding: scaledHeight(20),
          marginBottom: scaledHeight(10),
          borderRadius: 6,
          borderWidth: 2,
          borderColor: StyledConstants.colors.GREEN
        }}
        >
          <View
            style={{
             // backgroundColor: StyledConstants.colors.primaryColor,
             // padding: scaledHeight(10),
             // borderRadius: 3,
              alignItems: "center",
            //  marginBottom:scaledHeight(15)
            }}
          >
            <Text style={{ color: StyledConstants.colors.primaryColor, fontSize: scaledHeight(18)}}>
              Forgot Password
            </Text>
          </View>

          <View style={styles.headingLiner} />
          <View>
            <TextField
              tintColor = {StyledConstants.colors.primaryColor}
              textColor = {StyledConstants.colors.FONT_COLOR}
              baseColor = {StyledConstants.colors.BORDER_GRAY}
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
