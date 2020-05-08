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
  Platform,
  Button
} from "react-native";
import { CustomTabs } from "react-native-custom-tabs";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "react-native-elements";
import { Avatar, List, ListItem, Divider, Badge } from "react-native-elements";
import { baseURL, videoServer } from "../Utils/properties";
import PureChart from "react-native-pure-chart";
import Modal from "react-native-modal";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import PatientId from "./PatientId";
var patId = new PatientId(),
  color = "#90CAF9";
let noOfDoc = 0;
var notificationsDetailsList = [];
let curDate = moment().format("YYYY-MM-DD");

import { Dropdown } from "react-native-material-dropdown";
import FontAwesome, { Icons, signOutAlt } from "react-native-fontawesome";
export default class Notification extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Notifications",
      headerStyle: {
        height: 50,
        backgroundColor: "#1E90FF"
      },
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: 60,
        alignSelf: "center"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      collapsed: [false],
      iscollapsed: true,
      visibleModal: null,
      filterVisibility: false,
      docData: [],
      flag: 0,
      offSet: 0
    };
  }

  componentWillMount() {
    this.patientId = patId.putPatientId();
    this.notifications();
  }

  getVideoURL = (doctorName, doctorId) => {
    const docName =
      doctorName != null && doctorName.length > 0
        ? doctorName.split(" ")[0]
        : "";
    return (
      videoServer +
      "/client/?id=100001&&Fid=Video-Call-" +
      docName +
      "-" +
      doctorId
    );
  };

  notifications = () => {
    var url =
      baseURL +
      "/api/Patient/getNotificationByPatientId?patientId=" +
      this.patientId;
    const self = this;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.notificationResponse.length > 0) {
          this.setState({ notifications: response.notificationResponse });
        }
        console.log("noti", this.state.notifications);
      });
  };
  onAccessory = () => {
    this.setState({ visibleModal: null });
  };
  renderModalContent = () => {};
  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "#FFF" }}>
        <View
          style={{
            paddingTop: 5,
            backgroundColor: "#FFF"
          }}
        >
          {this.state.notifications.length > 0 && (
            <View>
              {this.state.notifications.map((n, i) => (
                <View key={i}>
                  <View>
                    {//n.notificationType === 1 && n.paymentRequired === 0 && (
                    // TODO Changed paymentRequired to 1 for testing.
                    n.notificationType === 1 && n.paymentRequired === 1 && (
                      <Collapse
                        isCollapsed={this.state.collapsed[n.id]}
                        onToggle={isCollapsed => {
                          let collapsed = this.state.collapsed;
                          collapsed[n.id] = isCollapsed;
                          this.setState({ collapsed });
                        }}
                        style={{
                          marginTop: 10,
                          marginLeft: 4,
                          marginRight: 4,
                          width: "98%",
                          paddingBottom: 0,
                          paddingLeft: 5,
                          borderColor: "#DCDCDC",
                          borderRadius: 6,
                          borderWidth: 1
                        }}
                      >
                        <CollapseHeader
                          style={{
                            paddingTop: 10
                          }}
                        >
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                marginLeft: 3,
                                width: "50%"
                              }}
                            >
                              <View>
                                <FontAwesome
                                  style={{
                                    fontSize: 18,
                                    color: "green",
                                    paddingTop: 5
                                    //  backgroundColor: "red"
                                  }}
                                >
                                  {Icons.videoCamera}
                                </FontAwesome>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 15
                                }}
                              >
                                <Text
                                  style={{
                                    alignSelf: "flex-start",
                                    fontSize: 18,
                                    color: "#0066ff"
                                  }}
                                >
                                  Dr.{n.doctorName}
                                </Text>
                                <Text
                                  style={{
                                    color: "#0066ff",
                                    marginLeft: 85,
                                    alignSelf: "flex-end"
                                  }}
                                >
                                  {curDate ==
                                  moment(n.date).format("YYYY-MM-DD")
                                    ? moment(n.date).format("hh:mm")
                                    : moment(n.date).format("YYYY-MM-DD")}
                                </Text>
                              </View>
                            </View>
                            <View
                              display={
                                this.state.collapsed[n.id] == true
                                  ? "none"
                                  : "flex"
                              }
                            >
                              <Text
                                style={{
                                  fontSize: 14,
                                  padding: 1,
                                  marginLeft: 35,
                                  marginBottom: 10
                                }}
                              >
                                {n.notificationText.substring(0, 35) + "...."}
                              </Text>
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View>
                            <Text
                              style={{
                                fontSize: 18,
                                justifyContent: "center",
                                textAlign: "center",
                                color: "#0066ff",
                                marginTop: 10
                              }}
                            >
                              {n.notificationText}
                            </Text>
                            <TouchableOpacity
                              style={styles.secButtonSkip}
                              onPress={() =>
                                Linking.openURL(
                                  this.getVideoURL(n.doctorName, n.doctorId)
                                )
                              }
                              underlayColor="#fff"
                            >
                              <Text style={styles.secTextRegister}>
                                Video Call
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </CollapseBody>
                      </Collapse>
                    )}
                    {n.notificationType === 2 && (
                      <Collapse
                        style={{
                          marginBottom: 10,
                          marginLeft: 20,
                          width: "92%",
                          paddingBottom: 10,
                          paddingLeft: 10,
                          borderColor: "#999",
                          borderRadius: 6,
                          borderWidth: 1
                        }}
                      >
                        <CollapseHeader
                          style={{
                            paddingTop: 10
                          }}
                        >
                          <View>
                            <View>
                              <FontAwesome
                                style={{
                                  fontSize: 18,
                                  color: "green"
                                }}
                              >
                                {{ name: "assignment" }}
                              </FontAwesome>
                            </View>
                            <View>
                              <Text
                                style={{
                                  textAlign: "center",
                                  justifyContent: "center",
                                  fontSize: 18,
                                  color: "black",
                                  paddingBottom: 10
                                }}
                              >
                                {n.doctorName}
                              </Text>
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody style={{ backgroundColor: "white" }}>
                          <View>
                            <TouchableOpacity
                              style={styles.secButtonSkip}
                              onPress={() =>
                                Linking.openURL(
                                  this.getVideoURL(n.doctorName, n.doctorId)
                                )
                              }
                              underlayColor="#fff"
                            >
                              <Text style={styles.secTextRegister}>
                                Video Call
                              </Text>
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 18,
                                textAlign: "center",
                                color: "black"
                              }}
                            >
                              {n.notificationText}
                            </Text>
                          </View>
                        </CollapseBody>
                      </Collapse>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {this.state.notifications.length == 0 && (
            <View>
              <Text style={{ textAlign: "center" }}>No Data to Display</Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  secTextRegister: {
    fontSize: 20,
    color: "#FFF",
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center"
  },
  secButtonSkip: {
    height: 40,
    width: "50%",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 100,
    backgroundColor: "#0066ff",
    borderRadius: 5
  }
});
