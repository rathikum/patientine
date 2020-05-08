import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Card, CardContent } from "react-native-card-view";
import moment from "moment";
import { baseURL } from "../Utils/properties";
import PatientId from "./PatientId";
var patId = new PatientId();
export default class VideoAppoi extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Doctor List",
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
      headerRight: (
        <TouchableOpacity onPress={params.availability}>
          <FontAwesome style={styles.iconPowerOff}>{Icons.userMd}</FontAwesome>
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      doctorName: "",
      date: "",
      purpose: "",
      doctorDetailsValues: []
    };
  }
  onPressAvailability = () => {
    const { navigate } = this.props.navigation;
    navigate("DoctorAvailability");
  };
  componentWillMount = () => {
    this.props.navigation.setParams({ availability: this.onPressAvailability });
    this.patientId = patId.putPatientId();
    var doctorList = [];
    var url = baseURL + "/api/Staffs/getDoctorListWithDepartment";
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        if (resultData.doctorList.length > 0) {
          doctorList = resultData.doctorList;
          this.setState({ doctorDetailsValues: doctorList });
        }
      });
  };
  doctorSummary = () => {
    const { navigate } = this.props.navigation;
    var listOfDetails = [];
    if (
      this.state.doctorDetailsValues !== [] &&
      this.state.doctorDetailsValues !== undefined
    ) {
      this.state.doctorDetailsValues.forEach(function(data) {
        var listofDoctors = [];

        listofDoctors = data;
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
                      display: data.picture !== null ? "flex" : "none",
                      borderColor: "#1B81E5",
                      alignSelf: "center"
                    }}
                    source={{
                      uri: data.picture
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
                      display: data.picture === null ? "flex" : "none",
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
                    <View style={styles.purposeContainer}>
                      <Text style={styles.purpose} adjustsFontSizeToFit={true}>
                        Specialist :
                      </Text>
                      <Text style={styles.purposeValues}>
                        {data.departmentName}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.siderIconMain}>
                    <TouchableOpacity
                      onPress={() => navigate("DoctorList", { listofDoctors })}
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
        <View>{this.doctorSummary()}</View>
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
  iconPowerOff: { fontSize: 24, color: "#fff", marginRight: 20 },
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
