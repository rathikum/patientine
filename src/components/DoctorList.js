import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Card } from "react-native-elements";
import moment from "moment";
import { baseURL } from "../Utils/properties";
var listOfDetails = [];
var currentDate = moment().format();
import PatientId from "./PatientId";
var patId = new PatientId();
let curDate = moment().format("YYYY-MM-DD HH-MM");

export default class DoctorList extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Doctor Details",
    headerStyle: {
      height: 50,
      backgroundColor: "#1E90FF"
    },
    headerTitleStyle: {
      fontWeight: "500",
      fontSize: 18,
      marginRight: 50,
      alignSelf: "center"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      doctorName: "",
      date: "",
      purpose: "",
      doctorId: [],
      visitDetailValues: []
    };
  }
  componentWillMount = () => {
    this.patientId = patId.putPatientId();
    this.setState({
      doctorId: this.props.navigation.state.params.listofDoctors
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        doctorId: this.props.navigation.state.params.listofDoctors
      });
    }
  }
  purpos = text => {
    this.setState({ purpose: text });
  };

  videoCall = () => {
    console.log("cur", currentDate);

    const { navigate } = this.props.navigation;
    var url = baseURL + "/api/AppointmentsData/bookAppointment";
    const { doctorId, departmentId } = this.state.doctorId;
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patientId: this.patientId,
        departmentId: departmentId,
        doctorId: doctorId,
        appointmentDateTime: currentDate,
        appointmentNotes: this.state.purpose,
        isWalkIn: 1,
        isVideoCall: 1,
        appointmentType: 2
      })
    })
      .then(Response => Response.json())
      .then(result => {
        console.log("res", result);
        if (
          result.appointmentResponse &&
          result.appointmentResponse !== undefined
        ) {
          navigate("Profile");
        }
      })
      .catch(err => console.log(err));
  };
  doctorDetails = () => {
    return (
      <View>
        <Card>
          <View style={styles.cardContentMainView}>
            <Image
              style={{
                marginTop: 10,
                width: 100,
                height: 100,
                marginRight: 30,
                marginLeft: 10,
                borderRadius: 100,
                borderWidth: 1,
                display:
                  this.state.doctorId.picture !== null &&
                  this.state.doctorId.picture !== ""
                    ? "flex"
                    : "none",
                borderColor: "#1B81E5",
                alignSelf: "center"
              }}
              source={{
                uri: this.state.doctorId.picture
              }}
            />
            <View
              style={{
                width: 100,
                height: 100,
                marginRight: 30,
                marginLeft: 10,
                borderRadius: 100,
                borderWidth: 2,
                display: this.state.doctorId.picture === null ? "flex" : "none",
                backgroundColor: "#71b2f4",
                borderColor: "#fff",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ color: "white", fontSize: 59, textAlign: "center" }}
              >
                {this.state.doctorId.doctorName.charAt(0)}
              </Text>
            </View>
            <View style={styles.contentMain}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.doctorName}
                adjustsFontSizeToFit={true}
              >
                Dr.{this.state.doctorId.doctorName}
              </Text>
              <Text style={styles.checkInDate}>
                {this.state.doctorId.departmentName}
              </Text>
              <View style={styles.feeContainer}>
                <Text style={styles.fee} adjustsFontSizeToFit={true}>
                  Fees :
                </Text>
                <Text style={styles.feeValues}>Rs.200</Text>
              </View>
            </View>
          </View>
        </Card>
        <View>
          <Text style={styles.label}>Purpose</Text>
          <KeyboardAvoidingView style={styles.purpose}>
            <TextInput
              style={styles.purposetext}
              multiline={true}
              textAlignVertical={"top"}
              numberOfLines={5}
              underlineColorAndroid="transparent"
              onChangeText={this.purpos.bind(this)}
              value={this.state.purpose}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.secButtonViewSkip}>
          <TouchableOpacity
            style={styles.secButtonSkip}
            onPress={this.videoCall.bind(this)}
            underlayColor="#fff"
          >
            <Text style={styles.secTextRegister}>Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  render() {
    console.log("doctorId:", this.state.doctorId);
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View>{this.doctorDetails()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: { backgroundColor: "#FFF" },
  visitDate: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#32333192",
    fontWeight: "500",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10
  },
  secButtonViewSkip: {
    width: "44%",
    paddingTop: 20,
    alignSelf: "center"
  },
  secButtonSkip: {
    marginTop: 5,
    height: 40,
    backgroundColor: "#1B81E5",
    borderRadius: 5
  },
  secureTextSkip: {
    padding: 5,
    fontSize: 18,
    color: "#fff",
    textAlign: "center"
  },
  secButtonViewRegister: {
    width: "44%",
    paddingTop: 5,
    alignSelf: "center"
  },
  secButtonRegister: {
    height: 40,
    backgroundColor: "#1B81E5",
    borderRadius: 5
  },
  secTextRegister: {
    padding: 5,
    fontSize: 18,
    color: "#fff",
    textAlign: "center"
  },
  cardContentMainView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  },

  contentMain: {
    marginTop: 5,
    width: 150
  },
  doctorName: {
    color: "#2dc1b3",
    fontSize: 18
  },
  checkInDate: {
    fontSize: 18,
    color: "#32333192",
    fontWeight: "500",
    paddingTop: 12
  },
  purposetext: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#e1e8ee"
  },
  purpose: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 120,
    borderWidth: 1,
    borderColor: "#e1e8ee",
    backgroundColor: "#FFFFFF"
  },
  feeContainer: { flexDirection: "row" },
  fee: {
    fontSize: 18,
    paddingTop: 12,
    color: "#00000099"
  },
  feeValues: {
    fontSize: 18,
    paddingTop: 12,
    color: "#32333192",
    fontWeight: "500"
  },
  label: {
    marginLeft: 30,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "300",
    color: "#125EAA",
    marginRight: 30
  }
});
