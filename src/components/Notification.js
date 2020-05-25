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
import { WebView } from 'react-native-webview';
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
import { scaledHeight, scaledWidth } from "../Utils/Resolution";
import StyledConstants from "../constants/styleConstants";

export default class Notification extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Notifications",
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor:StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontSize: scaledHeight(20),
        marginLeft: 10,
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
      offSet: 0,
      webviewState : false,
      doctorName : '',
      doctorId : ''
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

  handleResponse = data => {
    if (data.title === "success") {
        this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
        this.setState({ showModal: false, status: "Cancelled" });
    } else {
        return;
    }
};

  render() {
    const url =  this.getVideoURL(this.state.doctorName, this.state.doctorId);
    console.log("------",url);

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: StyledConstants.colors.BACKGROUND_GRAY }}>

{this.state.webviewState ? 
  <WebView
  style= {{marginTop: 50,width:'100%',height:700}}
  source={{uri : url}}
  javaScriptEnabled
                   
                />
  :      
        <View
          style={{
            marginHorizontal:'4%',
            marginVertical:scaledHeight(20),
            backgroundColor: StyledConstants.colors.BACKGROUND_GRAY
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
                          marginTop: scaledHeight(30),
                        //  marginLeft: 4,
                        //  marginRight: 4,
                        //  width: "98%",
                         // paddingBottom: 0,
                        //  paddingLeft: 5,
                          borderColor: StyledConstants.colors.primaryColor,
                          borderRadius: 6,
                          borderWidth: 1,
                        }}
                      >
                        <CollapseHeader
                          style={{
                            paddingTop: scaledHeight(20),
                            paddingBottom: scaledHeight(20),
                            paddingLeft:scaledHeight(10)
                          }}
                        >
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                marginHorizontal:"4%",
                                width: "50%"
                              }}
                            >
                              <View>
                                <FontAwesome
                                  style={{
                                    fontSize: scaledHeight(20),
                                    color:StyledConstants.colors.GREEN,
                                  //  paddingTop: 5
                                    //  backgroundColor: "red"
                                  }}
                                >
                                  {Icons.videoCamera}
                                </FontAwesome>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: "6%"
                                }}
                              >
                                <Text
                                  style={{
                                    alignSelf: "flex-start",
                                    fontSize: scaledHeight(18),
                                    color: StyledConstants.colors.primaryColor,
                                  }}
                                >
                                  Dr.{n.doctorName}
                                </Text>
                                <Text
                                  style={{
                                    color: StyledConstants.colors.primaryColor,
                                    marginLeft: "45%",
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
                                  fontSize: scaledHeight(14),
                                  padding: 1,
                                  marginLeft: "4%",
                                  marginTop: scaledHeight(20),
                                  color:StyledConstants.colors.FONT_COLOR

                                }}
                              >
                                {n.notificationText.substring(0, 45) + "...."}
                              </Text>
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View>
                            <Text
                              style={{
                                fontSize: scaledHeight(18),
                                justifyContent: "center",
                                textAlign: "center",
                                color: StyledConstants.colors.primaryColor,
                                marginTop: scaledHeight(10),
                                marginHorizontal: "4%",
                              }}
                            >
                              {n.notificationText}
                            </Text>
                            <TouchableOpacity
                              style={styles.secButtonSkip}
                              onPress={() => 
                               Linking.openURL("https://demo.patientine.com/client/?id=100001&&Fid=Video-Call-Robert-15"
                                 // this.getVideoURL(n.doctorName, n.doctorId)
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
  }
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  secTextRegister: {
    fontSize: scaledHeight(18),
    color: StyledConstants.colors.WHITE_COLOR,
    paddingTop: scaledHeight(5),
    paddingBottom: scaledHeight(5),
    textAlign: "center",
    justifyContent:'center'
  },
  secButtonSkip: {
    height: scaledHeight(40),
    width: "50%",
    marginVertical: scaledHeight(15),
    // marginLeft: "40%",
    alignContent:'center',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: StyledConstants.colors.primaryColor,
    borderRadius: 5
  }
});
