import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Picker,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "react-native-elements";
import { AppointmentStatus } from "../Utils/commonConstants";
import { Avatar, List, ListItem, Divider, Badge } from "react-native-elements";
import { baseURL } from "../Utils/properties";
import PureChart from "react-native-pure-chart";
import IconBadge from "react-native-icon-badge";
import Modal from "react-native-modal";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import PatientId from "./PatientId";
var patId = new PatientId(),
  color = "#90CAF9";
let noOfDoc = 0;
var count = 0;
var notificationsDetailsList = [];
import { Dropdown } from "react-native-material-dropdown";
import FontAwesome, { Icons, signOutAlt } from "react-native-fontawesome";
export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Dashboard",
      headerStyle: {
        height: 50,
        backgroundColor: "#1E90FF"
      },
      headerTitleStyle: {
        fontWeight: "500",
        fontSize: 20,
        marginRight: 50,
        alignSelf: "center"
      },
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <IconBadge
                MainElement={
                  <FontAwesome
                    style={{
                      fontSize: 26,
                      color: "white",
                      marginRight: 14,
                      marginLeft: 11,
                      marginTop: 5
                    }}
                  >
                    {Icons.bell}
                  </FontAwesome>
                }
                BadgeElement={
                  <Text style={{ color: "#FFF" }}>
                    {count <= 9 ? count : "9+"}
                  </Text>
                }
                IconBadgeStyle={{
                  width: 8,
                  height: 17,
                  backgroundColor: "#aedd13"
                }}
                Hidden={count == 0}
              />
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PatientProfile")}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                marginRight: 20,
                display: "flex"
              }}
              source={require("../images/user.png")}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <FontAwesome style={styles.iconPowerOff}>
                {Icons.powerOff}
              </FontAwesome>
            </TouchableOpacity>
          </View>
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      patInfo: [],
      basicAppointmentDetails: {},
      notifications: [],
      sampleData: [],
      profile: [],
      visibleModal: null,
      vitalName: "",
      docNumber: 0,
      docAvailData: [],
      filterVisibility: false,
      docData: [],
      flag: 0,
      offSet: 0
    };
    this.units = [];
    this.appointmentStatus = "";
    this.quickData = [];
    this.homeFlag = 0;
  }
  charts = id => {
    const self = this;
    let arr = [];
    const url =
      baseURL +
      "/api/vitalValue/getVitalDefinitions?patientId=" +
      this.patientId +
      "&vitalDefinitionId=" +
      id;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        arr =
          response.responseData != null && response.responseData.length > 0
            ? response.responseData.vitalValues
            : [
                { createdDate: new Date(), vitalValue: 0 },
                { createdDate: new Date(), vitalValue: 1 }
              ];
        // arr =
        //   arr == undefined ? [{ createdDate: new Date(), vitalValue: 0 }] : arr;
        let sampleData = [];
        if (arr && arr.length > 0) {
          chartVal = arr.forEach(function(entry) {
            let obj = {};
            obj["x"] = moment(entry.createdDate).format("DD-MMM-YY");
            obj["y"] = parseInt(entry.vitalValue);
            sampleData.push(obj);
            return obj;
          });
          this.setState({ sampleData: sampleData });
        }
      })
      .catch(err => console.log(err));
  };

  unitsFetch = () => {
    const self = this;
    const url = baseURL + "/api/vitalValue/getVitalList";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.units = response.vitalList;
      })
      .catch(err => console.log(err));
  };
  onAccessory = () => {
    this.setState({ visibleModal: null });
  };
  renderModalContent = () => {
    const { notifications } = this.state;
    return (
      <View style={{ flex: 0.5, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "flex-end" }}>
          <MaterialIcon
            size={24}
            name="close"
            color="#8E2323"
            onPress={this.onAccessory}
          />
        </View>
        <View>
          {notifications != null &&
            notifications.map(n => (
              <View key={n}>
                <Card title="Notifications">
                  <View>
                    <View>
                      <Text style={{ color: "#000", fontSize: 20 }}>
                        {n.notificationText}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: n.paymentRequired === 0 ? "flex" : "none"
                    }}
                  >
                    <View style={styles.secButtonViewSkip}>
                      <TouchableOpacity
                        style={styles.secButtonSkip}
                        onPress={() =>
                          Linking.openURL(
                            "https://yaalplayground.com/client/?id=100001&&Fid=Video-Call-Austin-3"
                          )
                        }
                        underlayColor="#fff"
                      >
                        <Text style={styles.secTextRegister}>Video Call</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      display: n.paymentRequired !== 0 ? "flex" : "none"
                    }}
                  >
                    <View style={styles.secButtonViewSkip}>
                      <TouchableOpacity
                        style={styles.secButtonSkip}
                        onPress={this.payment.bind(this)}
                        underlayColor="#fff"
                      >
                        <Text style={styles.secTextRegister}>Payment</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              </View>
            ))}
        </View>
      </View>
    );
  };

  payment = () => {
    this.setState({ visibleModal: null });
    const { navigate } = this.props.navigation;
    navigate("Billing");
  };
  videoUrl = () => {
    this.setState({ visibleModal: null });
    const { navigate } = this.props.navigation;
    navigate("VideoCall");
  };

  basicFetch = () => {
    const url =
      baseURL +
      "/api/PatientSummary/getPatientSummary?patientId=" +
      this.patientId;
    const self = this;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (
          response.patientSummary &&
          response.patientSummary != null &&
          response.patientSummary.appointmentInfo != null
        ) {
          let appointmentStatus = "";
          const scheduledAppointments = response.patientSummary.appointmentInfo.filter(
            appointmentInfo => {
              appointmentStatus = appointmentInfo.appointmentStatus.enumValue;
              return (
                appointmentStatus === AppointmentStatus.SCHEDULED &&
                Date.parse(appointmentInfo.appointmentDateTime) -
                  new Date().getTime() >=
                  0
              );
            }
          );
          const mostRecentScheduledAppointment =
            scheduledAppointments.length > 0
              ? scheduledAppointments[scheduledAppointments.length - 1]
              : {};
          this.setState({
            basicAppointmentDetails: mostRecentScheduledAppointment,
            profile: response.patientSummary.profilePictureInfo.picture
          });
        }
      })
      .catch(err => console.log(err));
  };
  docAvailabilityFetch = () => {
    const url =
      baseURL +
      "/api/DoctorAvailability/getDoctorAvailability?offset=" +
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
              docAvailData: docAvailData
            },
            () => {}
          );
        } else if (checkResponse.includes("errorResponse")) {
          this.setState({ flag: 1 });
        } else {
          this.setState({ flag: 1 });
        }
      })
      .catch(err => console.log(err));
  };
  componentWillMount() {
    this.patientId = patId.putPatientId();
  }

  componentDidMount() {
    this.docAvailabilityFetch();
    this.unitsFetch();
    this.charts(1);
    this.basicFetch();
    this.notifications();
  }

  componentWillUnMount() {
    this.setState({ filterVisibility: false });
  }
  notifications = () => {
    const url =
      baseURL +
      "/api/Patient/getNotificationByPatientId?patientId=" +
      this.patientId;
    const self = this;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (
          response.notificationResponse &&
          response.notificationResponse.length > 0
        ) {
          this.setState({ notifications: response.notificationResponse });
          count = this.state.notifications.length;
        }
      })
      .catch(err => console.log(err));
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
  renderDocAvailability = () => {
    const state = this.state.offSet;
    if (this.state.docAvailData.length !== 0 && this.state.flag === 0) {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginRight: "auto"
              }}
            >
              <View
                style={{
                  display: this.state.offSet === 0 ? "none" : "flex"
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
                  <FontAwesome
                    style={{
                      fontSize: 40,
                      color: "#71b2f4"
                    }}
                  >
                    {Icons.angleLeft}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                {this.avatarRendering()}
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.doctorStyle}>
                    Dr.{this.state.docAvailData[0].doctorName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
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
                </View>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.availabilityContentStyle}>
                    Waiting Time :{" "}
                    {this.state.docAvailData[0].availableAfterHrs +
                      ":" +
                      this.state.docAvailData[0].availableAfterMin}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.availabilityContentStyle}>
                    &nbsp;&nbsp;&nbsp;&nbsp;Patients in Queue :{" "}
                    {this.state.docAvailData[0].patientInQueue}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                marginLeft: "auto"
              }}
            >
              <View
                style={{
                  display: this.state.offSet == noOfDoc - 1 ? "none" : "flex"
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
                  <FontAwesome
                    style={{
                      fontSize: 40,
                      color: "#71b2f4"
                    }}
                  >
                    {Icons.angleRight}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return <Text>Nothing to Display</Text>;
    }
  };
  avatarRendering = () => {
    if (this.state.docAvailData.length !== 0) {
      if (
        this.state.docAvailData[0].profilePicture !== "" &&
        this.state.docAvailData[0].profilePicture !== null
      ) {
        return (
          <Image
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              marginRight: 20
            }}
            source={{
              uri: this.state.docAvailData[0].profilePicture
            }}
          />
        );
      } else {
        return (
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              backgroundColor: "#71b2f4",
              marginRight: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
              {this.state.docAvailData[0].doctorName.charAt(0)}
            </Text>
          </View>
        );
      }
    }
  };
  onPresslogout = () => {
    this.setState({ visibleModal: 1 });
  };
  render() {
    const appointmentStatus =
      Object.keys(this.state.basicAppointmentDetails).length === 0
        ? ""
        : this.state.basicAppointmentDetails.appointmentStatus.enumValue;
    let appointmentStatusColor = "#69F0AE";
    if (appointmentStatus === "Scheduled" || appointmentStatus === "Arrived") {
      appointmentStatusColor = "#90CAF9";
    } else if (
      appointmentStatus === "Missed" ||
      appointmentStatus === "Cancel"
    ) {
      appointmentStatusColor = "#E57373";
    }
    const docDepartmentName =
      Object.keys(this.state.basicAppointmentDetails).length > 0 &&
      Object.keys(this.state.basicAppointmentDetails.doctor).length > 0 &&
      Object.keys(this.state.basicAppointmentDetails.doctor.department).length >
        0
        ? this.state.basicAppointmentDetails.doctor.department.department
        : "";
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View>
          <View>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 16,
                color: "#0066ff",
                fontWeight: "400",
                marginLeft: 15,
                marginTop: 7.5,
                marginBottom: 7.5
              }}
            >
              Doctor Availability
            </Text>
          </View>

          <Card
            titleStyle={{
              fontSize: 14,
              color: "#9E9E9E",
              margin: 0,
              padding: 0
            }}
            containerStyle={{
              marginLeft: 15,
              marginRight: 15,
              height: 120,
              margin: 0,
              borderRadius: 5
            }}
          >
            {this.renderDocAvailability()}
          </Card>

          <View>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 16,
                color: "#0066ff",
                fontWeight: "400",
                marginLeft: 15,
                marginTop: 7.5,
                marginBottom: 7.5
              }}
            >
              UpComing Appointment
            </Text>
          </View>
          {this.state.basicAppointmentDetails != null &&
            Object.keys(this.state.basicAppointmentDetails).length == 0 && (
              <Card
                containerStyle={{
                  marginTop: 0,
                  borderRadius: 5,
                  borderLeftWidth: 11,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#efa41b",
                  marginLeft: 15,
                  marginBottom: 15,
                  padding: 5,
                  justifyContent: "center",
                  height: 70
                }}
              >
                <View style={{ flexDirection: "row", marginLeft: 3 }}>
                  <Text style={{ color: "#0066ff", fontSize: 18 }}>
                    No Appointment Scheduled
                  </Text>
                </View>
              </Card>
            )}

          {this.state.basicAppointmentDetails != null &&
            Object.keys(this.state.basicAppointmentDetails).length > 0 && (
              <Card
                containerStyle={{
                  marginTop: 0,
                  borderRadius: 5,
                  borderLeftWidth: 11,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#efa41b",
                  marginLeft: 15,
                  marginBottom: 15,
                  padding: 5,
                  justifyContent: "center",
                  height: 70
                }}
              >
                <View style={{ flexDirection: "row", marginLeft: 3 }}>
                  <Text style={{ color: "#0066ff", fontSize: 18 }}>
                    Dr.
                    {this.state.basicAppointmentDetails.doctor.firstName ||
                      " " ||
                      this.state.basicAppointmentDetails.doctor.lastName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      paddingTop: 3,
                      marginLeft: "auto",
                      marginRight: 1
                    }}
                  >
                    {this.state.basicAppointmentDetails !== null
                      ? moment(
                          this.state.basicAppointmentDetails.appointmentDateTime
                        ).format("ll")
                      : ""}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text style={{ fontSize: 14, marginLeft: 3 }}>
                      {docDepartmentName}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignSelf: "flex-end",
                      marginLeft: "auto",
                      marginTop: 5
                    }}
                  >
                    <Badge
                      containerStyle={{
                        backgroundColor: appointmentStatusColor
                      }}
                    >
                      <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                        {appointmentStatus}
                      </Text>
                    </Badge>
                  </View>
                </View>
              </Card>
            )}
          <View>
            <View style={styles.slot}>
              <TouchableOpacity>
                <Picker
                  selectedValue={this.state.vitalName}
                  onValueChange={vitalName =>
                    this.setState({ vitalName }, () => {
                      this.charts(this.state.vitalDefinitionId);
                    })
                  }
                  mode="dropdown"
                >
                  {this.units != null &&
                    this.units.map((i, index) => (
                      <Picker.Item
                        key={index}
                        label={i.vitalName}
                        value={i.vitalDefinitionId}
                      />
                    ))}
                </Picker>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.sampleData != null && this.state.sampleData.length > 0 && (
            <View
              style={{
                padding: 10
              }}
            >
              <View
                style={{
                  borderWidth: 0.5,
                  marginLeft: 8,
                  marginRight: 8
                }}
              >
                <PureChart
                  showEvenNumberXaxisLabel={true}
                  height={140}
                  data={this.state.sampleData}
                  type="line"
                />
              </View>
            </View>
          )}

          {this.state.sampleData.length == 0 && (
            <View>
              <Card
                titleStyle={{
                  fontSize: 14,
                  color: "#9E9E9E",
                  margin: 0,
                  padding: 0
                }}
                containerStyle={{
                  marginLeft: 15,
                  marginRight: 15,
                  height: 120,
                  margin: 0,
                  borderRadius: 5
                }}
              >
                <Text>you are a good person with good health</Text>
              </Card>
            </View>
          )}

          <View>
            <TouchableWithoutFeedback onPress={() => this.onAccessory()}>
              <Modal
                isVisible={this.state.visibleModal === 1}
                animationIn={"slideInLeft"}
                animationOut={"slideOutRight"}
              >
                {this.renderModalContent()}
              </Modal>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  slot: {
    backgroundColor: "#fff",
    marginLeft: 15,
    height: 40,
    borderRadius: 4,
    marginRight: 15,
    borderWidth: 0.5,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb"
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#00000099",
    width: 200
  },
  iconPower: { fontSize: 16, color: "red", marginRight: 20 },
  iconPowerOff: {
    fontSize: 26,
    marginTop: 3,
    color: "#fff",
    marginLeft: 20,
    marginRight: 20
  },
  headerText: {
    fontSize: 16,
    fontFamily: "segoe UI",
    textAlign: "center",
    marginBottom: 13
  },
  doctorStyle: {
    color: "#0066ff",
    fontSize: 18,
    textAlign: "left"
  },
  appointmentDateStyle: {
    fontSize: 40,
    textAlign: "center",
    color: "#1E90FF"
  },

  appointmentDateStyle1: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 3
  },
  availabilityContentStyle: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 3
  },
  pendingAmountValue: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 4,
    color: "#1E90FF"
  },
  wrap: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  modaltext: {
    fontSize: 20,
    alignSelf: "center"
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalButton: {
    marginLeft: 120,
    marginRight: 120,
    backgroundColor: "lightblue",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  secButtonViewSkip: {
    width: "80%",
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
    fontSize: 20,
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

  contentImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginRight: 30,
    marginLeft: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#1B81E5",
    alignSelf: "center"
  },
  doctorName: {
    color: "#2dc1b3",
    fontSize: 22
  },
  checkInDate: {
    fontSize: 16,
    color: "#32333192",
    fontWeight: "500",
    paddingTop: 12
  },
  purposeContainer: { flexDirection: "row" },
  purpose: {
    fontSize: 16,
    paddingTop: 12,
    color: "#00000099"
  },
  purposeValues: {
    fontSize: 16,
    paddingTop: 12,
    color: "#32333192",
    fontWeight: "500"
  },
  siderIconMain: {
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 15
  },
  siderIcon: {
    fontSize: 30,
    color: "#00000099",
    alignItems: "flex-end"
  },
  secTextRegister: {
    padding: 5,
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  }
});
