import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Dimensions
} from "react-native";
import { FontAwesome, Icons } from "react-native-fontawesome";
import moment from "moment";
import { Avatar, List, ListItem, SearchBar, Card } from "react-native-elements";
import { baseURL } from "../Utils/properties";
import PatientId from "./PatientId";
var patId = new PatientId();
export default class VideoAppointment extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
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
  };
  constructor(props) {
    super(props);
    this.state = {
      doctorName: "",
      date: "",
      purpose: "",
      doctorDetailsValues: []
    };
    this.arrayholder = [];
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
        console.log("resultData", resultData);
        if (resultData.doctorList.length > 0) {
          doctorList = resultData.doctorList;
          this.arrayholder = doctorList;
          this.setState({ doctorDetailsValues: doctorList });
        }
      });
  };
  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.doctorName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ doctorDetailsValues: newData, text: text });
  };
  doctorSummary = ({ item }) => {
    const { navigate } = this.props.navigation;
    var listofDoctors = [];
    listofDoctors = item;
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigate("DoctorList", { listofDoctors })}
        >
          <Card containerStyle={{ marginTop: 6, padding: 6, borderRadius: 6 }}>
            <View key={item} style={styles.listStyles}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 10,
                  marginRight: 15,
                  display: "flex",
                  borderRadius: 100
                }}
                source={{
                  uri: item.picture
                }}
              />

              <Text style={{ marginLeft: 30, fontSize: 18 }}>
                Dr.{item.doctorName}
              </Text>
            </View>
            <View>
              <Text style={{ marginLeft: 120, marginTop: -15, fontSize: 16 }}>
                {item.departmentName}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.searchBarStyle}>
          <SearchBar
            containerStyle={{
              padding: 0,
              borderRadius: 40,
              backgroundColor: "#FFFFFF",
              borderWidth: 0.5
            }}
            //inputContainerStyle={{backgroundColor:"#FFF"}}
            inputStyle={{ backgroundColor: "white" }}
            inputContainerStyle={{
              backgroundColor: "#FFF",
              borderRadius: 50,
              height: 20
            }}
            placeholder="Search Doctor"
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
          />
          <FlatList
            data={this.state.doctorDetailsValues}
            renderItem={this.doctorSummary}
            keyExtractor={(item, index) => item.doctorName}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollViewStyle: { backgroundColor: "#FFF" },
  doctorName: {
    color: "#2dc1b3",
    fontSize: 18
  },
  listStyles: {
    marginLeft: 10,
    flexDirection: "row"
  },
  searchBarStyle: {
    marginLeft: 10,
    flex: 0,
    marginRight: 10,
    padding: 0,
    marginTop: 20
  }
});
