import React, { Component } from "react";
import FontAwesome, { Icons } from "react-native-fontawesome";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Picker
} from "react-native";
import { baseURL } from "../Utils/properties";
import moment from "moment";
let noOfDoc = 0;
export default class DoctorAvailability extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "",
    headerStyle: {
      height: 50,
      backgroundColor: "#1E90FF"
    },
    headerTitleStyle: {
      fontWeight: "500",
      fontSize: 20,
      marginRight: 50,
      alignSelf: "center"
    }
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      collapsed: false,
      collapse: false,
      docNumber: 0,
      docAvailData: [],
      filterVisibility: false,
      docData: [],
      offSet: 0
    };
    this.appointmentStatus = "";
    this.quickData = [];
    this.homeFlag = 0;
  }
  componentWillMount() {
    this.docAvailabilityFetch();
  }
  docAvailabilityFetch = () => {
    let url =
      baseURL +
      "/api/DoctorAvailability/DoctorAvailability_getDoctorAvailability" +
      this.state.offSet;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let checkResponse = Object.keys(response.doctorAvailabilityResponse);
        if (checkResponse.includes("responseData")) {
          let docAvailData = [];
          docAvailData.push(response.doctorAvailabilityResponse.responseData);
          noOfDoc =
            response.doctorAvailabilityResponse.responseData.noOfDoctors;
          this.setState(
            {
              docAvailData: docAvailData,
              filterVisibility: false
            },
            () => {}
          );
        }
      });
  };
  avatarRendering = () => {
    if (this.state.docAvailData.length !== 0) {
      if (
        this.state.docAvailData[0].profilePicture !== "" &&
        this.state.docAvailData[0].profilePicture !== null
      ) {
        return (
          <Image
            style={styles.avatar}
            source={{
              uri: this.state.docAvailData[0].profilePicture
            }}
          />
        );
      } else {
        return (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 2,
              backgroundColor: "#71b2f4",
              borderColor: "#fff",
              alignSelf: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 59, textAlign: "center" }}>
              {this.state.docAvailData[0].doctorName.charAt(0)}
            </Text>
          </View>
        );
      }
    }
  };
  filterVisibility = () => {
    this.setState({ filterVisibility: true });
  };
  cancelFilter = () => {
    this.setState(
      {
        offSet: 0
      },
      () => {
        this.docAvailabilityFetch();
      }
    );
  };
  docavail = () => {
    const state = this.state.offSet;
    if (this.state.docAvailData.length !== 0) {
      return (
        <View style={styles.container}>
          <View
            style={{
              paddingTop: 10,
              height: 70
            }}
          >
            <View style={{ paddingTop: 10, paddingRight: 10 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 18,
                  alignSelf: "flex-start"
                }}
              >
                Doctor Availability
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#000"
              }}
            />
          </View>
          <View style={styles.flexcontainer}>
            <View
              style={{
                marginTop: 40,
                paddingLeft: 20,
                paddingRight: 15,
                display:
                  this.state.filterVisibility === true
                    ? "none"
                    : this.state.offSet === 0
                    ? "none"
                    : "flex"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (this.state.offSet > 0) {
                    this.setState({ offSet: state - 1 }, () => {
                      this.docAvailabilityFetch();
                    });
                  }
                }}
              >
                <FontAwesome style={styles.siderIcon}>
                  {Icons.angleLeft}
                </FontAwesome>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", paddingRight: 15 }}>
              <View>
                {this.avatarRendering()}
                <Text style={styles.text}>
                  {this.state.docAvailData[0].doctorName}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#000",
                    alignSelf: "center"
                  }}
                >
                  {moment(
                    this.state.docAvailData[0].doctorShiftTimeFrom,
                    "HH:mm:ss"
                  ).format("LT") +
                    " - " +
                    moment(
                      this.state.docAvailData[0].doctorShiftTimeTo,
                      "HH:mm:ss"
                    ).format("LT")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#125EAA",
                        alignSelf: "center"
                      }}
                    >
                      Waiting Time
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000",
                        alignSelf: "center"
                      }}
                    >
                      {this.state.docAvailData[0].availableAfterHrs +
                        ":" +
                        this.state.docAvailData[0].availableAfterMin}
                    </Text>
                  </View>
                  <View />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#125EAA",
                        paddingLeft: 10,
                        alignSelf: "center"
                      }}
                    >
                      Patient In Queue
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000",
                        alignSelf: "center"
                      }}
                    >
                      {this.state.docAvailData[0].patientInQueue}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                paddingLeft: 20,
                paddingRight: 15,
                display:
                  this.state.filterVisibility === true
                    ? "none"
                    : this.state.offSet === noOfDoc - 1
                    ? "none"
                    : "flex"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (this.state.offSet < noOfDoc) {
                    this.setState({ offSet: state + 1 }, () => {
                      this.docAvailabilityFetch();
                    });
                  }
                }}
              >
                <FontAwesome style={styles.siderIcon}>
                  {Icons.angleRight}
                </FontAwesome>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#000"
              }}
            />
          </View>
        </View>
      );
    } else {
      <Text>No data</Text>;
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return <View>{this.docavail()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 520,
    height: 280,
    position: "absolute",
    backgroundColor: "#F5F5F5"
  },
  slide2: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  slide3: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },

  siderIcon: {
    fontSize: 50,
    color: "#000099",
    alignItems: "flex-end"
  },
  secButtonViewSkip: {
    width: "44%",
    paddingTop: 5,
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
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    flex: 1,
    position: "absolute"
  },
  flexcontainer: {
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    paddingLeft: 20
  },
  avatar: {
    marginTop: 40,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: "#F5F5F5",
    borderColor: "#fff",
    alignSelf: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "300",
    color: "#000",
    alignSelf: "center"
  },
  primaryText: {
    fontSize: 18,
    width: 150
  },

  expireDate: { marginLeft: 4, width: 185 },
  textStyle: {
    fontSize: 18,
    color: "#808080",
    paddingLeft: 15,
    width: 150
  },
  colonStyle: { fontSize: 18, width: 5, fontWeight: "500" },
  valueStyle: { fontSize: 18, width: 195, paddingLeft: 60 },
  contentMainView: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10
  },
  headerStyle: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 5
  }
});
