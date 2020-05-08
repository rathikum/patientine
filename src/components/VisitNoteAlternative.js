import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Card, CardContent } from "react-native-card-view";
import moment from "moment";
import { baseURL } from "../Utils/properties";
var listOfDetails = [];
import PatientId from "./PatientId";
var patId = new PatientId();
export default class VisitNote extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Visit Note",
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
      doctorName: "",
      date: "",
      purpose: "",
      visitDetailValues: []
    };
  }
  componentWillMount = () => {
    this.patientId = patId.putPatientId();
    (getMonths = []), (listOfMonthInfo = []);
    var listOfVisitDetails = [];
    var url =
      baseURL +
      "/api/PatientRegistrationData/getPatientSummary?patientId=" +
      this.patientId;
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        if (
          resultData.patientSummary != null &&
          resultData.patientSummary.visitInfo.length > 0
        ) {
          var visitInfo = resultData.patientSummary.visitInfo;
          for (var c = 0; c < visitInfo.length; c++) {
            var getMonth = {};
            if (
              c != visitInfo.length - 1 &&
              moment(visitInfo[c].checkIn)
                .format("MMMMYYYY")
                .toString() ===
                moment(visitInfo[c + 1].checkIn)
                  .format("MMMMYYYY")
                  .toString()
            ) {
              getMonth = visitInfo[c];
              getMonths.push(getMonth);
            } else {
              var list = {};
              getMonth = visitInfo[c];
              getMonths.push(getMonth);
              list[
                moment(getMonths[0].checkIn)
                  .format("MMMM YYYY")
                  .toString()
              ] = getMonths;
              listOfMonthInfo.push(list);
              getMonths = [];
            }
          }
          for (var i = 0; i < listOfMonthInfo.length; i++) {
            listOfVisitDetails.push(listOfMonthInfo[i]);
          }
          this.setState({ visitDetailValues: listOfVisitDetails });
        }
      });
  };
  visitSummary = () => {
    var listOfLabel = [],
      i;
    for (i = 0; i < this.state.visitDetailValues.length; i++) {
      listOfLabel.push(
        <View key={this.state.visitDetailValues[i]}>
          <View>
            <Text style={styles.visitDate}>
              {Object.keys(this.state.visitDetailValues[i])}
            </Text>
          </View>
          <View>
            {this.visitSummaryDetails(this.state.visitDetailValues[i])}
          </View>
        </View>
      );
    }
    return listOfLabel;
  };
  visitSummaryDetails = values => {
    const { navigate } = this.props.navigation;
    if (this.state.visitDetailValues !== []) {
      var visitValues = Object.keys(values);
      listOfDetails = [];
      values[visitValues].forEach(function(data) {
        listOfDetails.push(
          <View key={data}>
            <Card
              styles={{
                card: {
                  width: 350,
                  alignSelf: "center",
                  height: 150,
                  borderRadius: 8
                }
              }}
            >
              <CardContent>
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
                      display: "none",
                      borderColor: "#1B81E5",
                      alignSelf: "center"
                    }}
                    source={{
                      uri:
                        "https://www.millionairedatingsites.com/wp-content/uploads/2018/03/doctor-dating-sites.jpg"
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
                      display: "flex",
                      backgroundColor: "#71b2f4",
                      borderColor: "#fff",
                      alignSelf: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 59,
                        textAlign: "center"
                      }}
                    >
                      {data.doctorName.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.contentMain}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.doctorName}
                      adjustsFontSizeToFit={true}
                    >
                      Dr.{data.doctorName}
                    </Text>
                    <Text style={styles.checkInDate}>
                      {moment(data.checkIn).format("DD - MM - YYYY")}
                    </Text>
                    <View style={styles.purposeContainer}>
                      <Text style={styles.purpose} adjustsFontSizeToFit={true}>
                        Purpose :
                      </Text>
                      <Text style={styles.purposeValues}>Fever</Text>
                    </View>
                  </View>
                  <View style={styles.siderIconMain}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate("VisitNoteDetails", { visitId: data.visitId })
                      }
                    >
                      <FontAwesome style={styles.siderIcon}>
                        {Icons.angleRight}
                      </FontAwesome>
                    </TouchableOpacity>
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        );
      });
      return listOfDetails;
    } else {
      <View>
        <Text>No Data to Display</Text>
      </View>;
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View>{this.visitSummary()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: { backgroundColor: "#F5F5F5" },
  visitDate: {
    alignSelf: "flex-start",
    fontSize: 18,
    color: "#32333192",
    fontWeight: "500",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10
  },
  cardContentMainView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
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
  purposeContainer: { flexDirection: "row" },
  purpose: {
    fontSize: 18,
    paddingTop: 12,
    color: "#00000099"
  },
  purposeValues: {
    fontSize: 18,
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
  }
});
