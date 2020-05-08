import React, { Component } from "react";
import { Text, Image, ScrollView, TouchableOpacity, View } from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Card, CardContent } from "react-native-card-view";
import moment from "moment";
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
      medication: []
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
                  height: 130,
                  marginBottom: 20,
                  marginLeft: 30,
                  paddingLeft: 30,
                  borderRadius: 10
                }
              }}
            >
              <CardContent>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                      marginBottom: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "500",
                        width: 155
                      }}
                      adjustsFontSizeToFit={true}
                    >
                      {this.state.medication[i].medicament}
                    </Text>
                    <Text style={{ fontSize: 18, width: 195, paddingLeft: 60 }}>
                      {this.state.medication[i].doctorId}
                    </Text>
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
                      {this.state.medication[i].dose +
                        this.state.medication[i].doseUnit}
                    </Text>

                    <Text style={{ fontSize: 18, width: 195, paddingLeft: 60 }}>
                      {moment(this.state.medication[i].expiryDate)
                        .format("LL")
                        .toString()}
                    </Text>
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
