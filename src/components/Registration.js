import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Picker,
  Button
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField } from "react-native-material-textfield";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import { baseURL } from "../Utils/properties";
import styles from "./Style";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome, { Icons } from "react-native-fontawesome";
import RadioForm from "react-native-simple-radio-button";
var radio_props = [{ label: "Male", value: 1 }, { label: "Female", value: 2 }];
export default class Registration extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Registration",
    headerStyle: {
      height: 50,
      backgroundColor: "#1B81E5"
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
    this.onAccessory = this.onAccessory.bind(this);
    this.renderPassword = this.renderPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.state = {
      name: "",
      lName: "",
      age: "",
      gender: 1,
      mobile: "",
      email: "",
      ssn: "",
      dob: "",
      password: "",
      confirmPassword: "",
      res: "",
      error: "",
      loading: false,
      response: [],
      secureTextEntry: true,
      secureText: true,
      appointmentSubTypeId: 1,
      idProofValue: "",
      idProofData: []
    };
  }
  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry
    }));
  }
  componentWillMount() {
    this.fetchIdProofType();
  }
  fetchIdProofType = () => {
    let url =
      baseURL +
      "/api/AppointmentsData/getAppointmentSubType?fieldType=IdProofType";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (
          response.appointmentSubTypeResponse.responseData &&
          response.appointmentSubTypeResponse.responseData.length > 0
        ) {
          this.setState({
            idProofData: response.appointmentSubTypeResponse.responseData
          });
        }
      });
  };
  onAccessory() {
    this.setState(({ secureText }) => ({
      secureText: !secureText
    }));
  }
  renderPassword() {
    let { secureText } = this.state;
    let name = secureText ? "visibility" : "visibility-off";
    return (
      <MaterialIcon
        size={24}
        name={name}
        color="#0066ff"
        onPress={this.onAccessory}
      />
    );
  }
  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;
    let name = secureTextEntry ? "visibility" : "visibility-off";
    return (
      <MaterialIcon
        size={24}
        name={name}
        color="#0066ff"
        onPress={this.onAccessoryPress}
      />
    );
  }
  mobileNumber = () => {
    return <MaterialIcon size={24} name="smartphone" color="#0066ff" />;
  };
  eMail = () => {
    return <MaterialIcon size={24} name="mail" color="#0066ff" />;
  };
  sSn = () => {
    return <MaterialIcon size={24} name="local-library" color="#0066ff" />;
  };
  proName = () => {
    return <MaterialIcon size={24} name="person" color="#0066ff" />;
  };

  registerPatientInfo = () => {
    const { navigate } = this.props.navigation;
    console.log("cc", this.state.dob);

    var personalDetails = {
      name: this.state.name,
      lName: this.state.lName,
      age: this.state.age,
      gender: this.state.gender,
      mobile: this.state.mobile,
      email: this.state.email,
      idProofType: this.state.appointmentSubTypeId,
      dob: this.state.dob,
      idProofValue: this.state.idProofValue
    };
    navigate("PreRegAppointment", { personalDetails: personalDetails });
  };

  render() {
    let { secureTextEntry, secureText } = this.state;
    return (
      <KeyboardAwareScrollView
        behaviour="padding"
        style={styles.registercontainer}
      >
        <View style={styles.border}>
          <TextField
            style={styles.input}
            label="First Name"
            value={this.state.name}
            renderAccessory={this.proName}
            onChangeText={text => this.setState({ name: text })}
          />
          <TextField
            style={styles.input}
            label="Last Name"
            value={this.state.lName}
            renderAccessory={this.proName}
            onChangeText={text => this.setState({ lName: text })}
          />
          <View style={styles.rowgender}>
            <Text style={styles.inputstyle}>Gender</Text>
            <RadioForm
              style={styles.inputrow}
              labelStyle={styles.genderlabel}
              radio_props={radio_props}
              initial={0}
              buttonSize={12}
              formHorizontal={true}
              onPress={value => {
                this.setState({ gender: value });
              }}
              value={this.state.gender}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.date}>Date of Birth </Text>
            <DatePicker
              style={styles.datepicker}
              date={this.state.dob}
              androidMode="spinner"
              showIcon={true}
              customStyles={{
                dateInput: {
                  borderWidth: 0
                },
                dateIcon: {
                  width: 25,
                  paddingLeft: 7,
                  tintColor: "#0066ff",
                  height: 25
                }
              }}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({ dob: date });
              }}
              value={this.state.dob}
            />
          </View>
          <TextField
            style={styles.input}
            label="Age"
            value={this.state.age}
            renderAccessory={this.age}
            onChangeText={text => this.setState({ age: text })}
          />
          <TextField
            label="Mobile number "
            style={styles.input}
            keyboardType={"phone-pad"}
            value={this.state.mobile}
            renderAccessory={this.mobileNumber}
            onChangeText={text => this.setState({ mobile: text })}
          />
          <TextField
            label="Email "
            style={styles.input}
            keyboardType={"email-address"}
            value={this.state.email}
            renderAccessory={this.eMail}
            onChangeText={text => this.setState({ email: text })}
          />
          <View style={styles.slot}>
            <View style={styles.datepickerWidth}>
              <Picker
                style={styles.input}
                selectedValue={this.state.appointmentSubTypeId}
                onValueChange={appointmentSubTypeId =>
                  this.setState({ appointmentSubTypeId })
                }
                mode="dropdown"
              >
                {this.state.idProofData.map((i, index) => (
                  <Picker.Item
                    key={index}
                    label={i.appointmentSubType}
                    value={i.appointmentSubTypeId}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <TextField
            label="Id Proof Number"
            style={styles.input}
            keyboardType={"email-address"}
            value={this.state.idProofValue}
            onChangeText={text => this.setState({ idProofValue: text })}
          />
          <View>
            <TouchableOpacity
              style={styles.submitButtonContainer}
              onPress={this.registerPatientInfo.bind(this)}
              underlayColor="#fff"
            >
              <Text style={styles.submitTextStyle}>Proceed</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>{"\n"}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
