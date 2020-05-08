import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField } from "react-native-material-textfield";
import DatePicker from "react-native-datepicker";
import styles from "./Style";
import { baseURL } from "../Utils/properties";
import RadioForm from "react-native-simple-radio-button";
export default class UpdateRegistration extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "REGISTRATION",
    headerStyle: {
      height: 50,
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
      name: "",
      gender: "",
      mobile: "",
      email: "",
      ssn: "",
      dob: "",
      password: "",
      confirmpassword: "",
      res: "",
      error: "",
      loading: false,
      response: []
    };
  }
  registerpatientinfo = () => {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(function() {});
      });
    var url = baseURL + "/api/PatientRegistrationData/createRegistrationData";
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gender: this.state.gender,
        maritalStatus: 1,
        address1: "dgarwg",
        address2: "rqe",
        city: "qwqe",
        state: "emaile",
        country: "wqw",
        zip: 4321,
        firstName: this.state.name,
        middleName: "d",
        lastName: "r",
        dob: this.state.dob,
        bloodGroup: 2,
        mobilePhoneNo: this.state.mobile,
        homePhoneNo: "425425",
        occupation: "fgsdfg",
        sSN: this.state.ssn,
        refferedBy: "etrwtr",
        emergencyContactName1: "fszdfgz",
        emergencyContactName2: "fesfe",
        emergencyContactName3: "atrwt",
        relationship1: "erear",
        relationship2: "erewr",
        emergencyContactNo1: "3454623",
        emergencyContactNo2: "2435454",
        emergencyContactNo3: "2324342",
        createdDate: "2017-12-29",
        createdBy: 1,
        email: this.state.email,
        designation: "gsfgdf",
        employerName: "ees",
        employerNumber: "324414134",
        employerAddress: "gfdhgsxg",
        medicalHistory: [{ questionId: 1, answer: "gszfgsg" }],
        insuranceData: [
          {
            carrier: "ds",
            payerId: 1,
            payerName: "fadf",
            policyId: 1,
            policyHolder: "aaaaaa",
            relationship: "bbbbbb",
            policyName: "vdzvc",
            insurancePayerTraceNumber: "eedfg",
            planName: "bxcb",
            groupName: "sxvd",
            groupId: 1,
            isInNetwork: 1,
            effectiveDate: "2018-01-17",
            expirationDate: "2018-01-17",
            isExpired: 1,
            insurancePhone: "45352141",
            insuranceFax: "3243254",
            nameOfInsured: "dfdzfv",
            insuredName: "vdzbgfx",
            insuredDob: "2018-01-17",
            insuredSsn: "adcdsafcd",
            insuranceType: 1,
            isEligible: 1
          },
          {
            carrier: "ds",
            payerId: 1,
            payerName: "fadf",
            policyId: 1,
            policyHolder: "aaaaaa",
            relationship: "bbbbbb",
            policyName: "vdzvc",
            insurancePayerTraceNumber: "eedfg",
            planName: "bxcb",
            groupName: "sxvd",
            groupId: 1,
            isInNetwork: 1,
            effectiveDate: "2018-01-17",
            expirationDate: "2018-01-17",
            isExpired: 1,
            insurancePhone: "45352141",
            insuranceFax: "3243254",
            nameOfInsured: "dfdzfv",
            insuredName: "vdzbgfx",
            insuredDob: "2018-01-17",
            insuredSsn: "adcdsafcd",
            insuranceType: 1,
            isEligible: 1
          }
        ],
        familyHistoryData: [
          {
            finding: "jjijio",
            relationship: "kokok",
            onSetAge: 23
          },
          {
            finding: "jjijio",
            relationship: "kokok",
            onSetAge: 25
          }
        ],
        socialHistoryData: [
          {
            socialHistoryType: 1,
            routine: "vghvg",
            substance: "vhhj",
            comment: "jbjk",
            status: 1
          },
          {
            socialHistoryType: 1,
            routine: "vghvg",
            substance: "vhhj",
            comment: "jbjk",
            status: 1
          }
        ],
        surgeryHistoryData: [
          {
            surgery: "aaaaa",
            surgeryHistoryType: 1,
            hospitalization: 1,
            fromDate: "2018-01-17",
            toDate: "2018-01-17",
            reason: "gggg",
            outcome: "hghguh"
          },
          {
            surgery: "aaaaa",
            surgeryHistoryType: 1,
            hospitalization: 1,
            fromDate: "2018-01-17",
            toDate: "2018-01-17",
            reason: "gggg",
            outcome: "hghguh"
          }
        ],
        medicalHistoryData: [
          {
            diagnosis: "dfhjk",
            startDate: "2018-01-17",
            endDate: "2018-01-17",
            comment: "ggggj",
            status: 1
          },
          {
            diagnosis: "dfhjk",
            startDate: "2018-01-17",
            endDate: "2018-01-17",
            comment: "ggggj",
            status: 1
          }
        ]
      })
    })
      .then(Response => Response.json())
      .then(result => {
        var pId = {};
        pId["xyz"] = result["registrationDataResponse"];
        navigate("Login");
        alert("Patient Successfully Registered and Email Verification Sent!");
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        behaviour="padding"
        style={styles.registercontainer}
      >
        <View style={styles.border}>
          <TextField
            style={styles.input}
            label="Name *"
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
          <View style={styles.row}>
            <Text style={styles.inputstyle}>Gender *</Text>
            <RadioForm
              style={styles.inputrow}
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              onPress={value => {
                this.setState({ gender: value });
              }}
              value={this.state.gender}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.date}>Date of Birth *</Text>
            <DatePicker
              style={{ width: 250, paddingHorizontal: 10 }}
              date={this.state.dob}
              mode="date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                this.setState({ dob: date });
              }}
              value={this.state.dob}
            />
          </View>
          <TextField
            label="Mobile number *"
            keyboardType={"phone-pad"}
            value={this.state.mobile}
            onChangeText={text => this.setState({ mobile: text })}
          />
          <TextField
            label="Email *"
            keyboardType={"email-address"}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextField
            label="Social Service Number*"
            value={this.state.ssn}
            onChangeText={text => this.setState({ ssn: text })}
          />
          <TextField
            label="Password*"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <TextField
            label="Confirm Password*"
            value={this.state.confirmPassword}
            onChangeText={text => this.setState({ confirmPassword: text })}
          />

          <View style={styles.submitcontainer}>
            <TouchableOpacity
              style={styles.submit}
              onPress={this.registerpatientinfo.bind(this)}
              underlayColor="#fff"
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
