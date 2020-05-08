import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  CheckBox
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Card, CardContent } from "react-native-card-view";
import moment from "moment";
import { Divider } from "react-native-elements";
import { baseURL } from "../Utils/properties";

var prescriptionData = [];
export default class ActiveMedications extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: " ACTIVE MEDICATIONS",
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
  constructor(props) {
    super(props);
    this.state = {
      medication: [],
      checkedNight: false,
      checkedMorning: false,
      checkedNight: false
    };
  }
  componentWillMount = () => {
    var patientId = "PAT1",
      medications = [],
      prescribeData = {};
    var url =
      baseURL +
      "/api/prescriptions/getPreviousPrescription?patientId=" +
      patientId;
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        resultData.previousPrescription.forEach(function(prescriptionData) {
          prescriptionData.prescriptionSubData.forEach(function(Data) {
            if (Data.status == "Active") {
              prescribeData = Object.assign(
                { doctorId: prescriptionData.createdBy },
                Data
              );
              medications.push(prescribeData);
            }
          });
        });
        this.setState({ medication: medications });
      });
  };

  prescriptionInfo = () => {
    var listOfData = [],
      i;
    for (i = 0; i < this.state.medication.length; i++) {
      listOfData.push(
        <View key={this.state.medication[i]}>
          <View>
            <Card
              styles={{
                card: {
                  marginRight: 30,
                  height: 160,
                  marginBottom: 20,
                  marginLeft: 30,
                  paddingLeft: 30,
                  borderRadius: 10
                }
              }}
            >
              <CardContent>
                <View style={{ marginRight: 5 }}>
                  <View
                    style={{
                      marginTop: 5,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "500"
                      }}
                      adjustsFontSizeToFit={true}
                    >
                      {this.state.medication[i].medicament}(
                      {this.state.medication[i].dose +
                        this.state.medication[i].doseUnit}
                      )
                    </Text>
                    <Divider style={{ backgroundColor: "blue" }} />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        width: 155
                      }}
                    >
                      {this.state.medication[i].doctorId}
                    </Text>
                    <Text style={{ fontSize: 18, width: 195, paddingLeft: 30 }}>
                      {moment(this.state.medication[i].expiryDate)
                        .format("LL")
                        .toString()}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", marginRight: 5 }}>
                      <Text style={{ marginTop: 5, fontWeight: "500" }}>
                        Morning
                      </Text>

                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: "500",
                          marginLeft: 5
                        }}
                      >
                        Afternoon
                      </Text>

                      <Text
                        style={{
                          marginTop: 5,
                          fontWeight: "500",
                          marginLeft: 5
                        }}
                      >
                        Night
                      </Text>
                    </View>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        </View>
      );
    }
    return listOfData;
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View>{this.prescriptionInfo()}</View>
      </ScrollView>
    );
  }
}
