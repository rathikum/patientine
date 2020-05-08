import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Button
} from "react-native";
import { Divider, Badge } from "react-native-elements";
import { Card } from "react-native-elements";
import Tags from "react-native-tags";
import moment from "moment";
import HTMLView from "react-native-htmlview";
const pDetails = {};
import { baseURL } from "../Utils/properties";
export default class VisitNoteDetails extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Diagnosis",
    headerStyle: {
      height: 50,
      backgroundColor: "#1E90FF"
    },
    headerTitleStyle: {
      fontSize: 20,
      marginLeft: 80,
      alignSelf: "center"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      visitId: this.props.navigation.state.params.visitId,
      diagnosisData: []
    };
  }
  componentWillMount() {
    this.updateRecords();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.updateRecords();
    }
  }
  updateRecords = () => {
    console.log("visitId", this.state.visitId);
    var diagnosisData = [];
    var url =
      baseURL +
      "/api/TreatmentData/getTreatmentInfoByVisitId?visitId=" +
      this.state.visitId;
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        if (
          resultData.previousTreatmentInfo &&
          resultData.previousTreatmentInfo.length > 0
        ) {
          diagnosisData = resultData.previousTreatmentInfo[0];
          this.setState({ diagnosisData: diagnosisData });
        } else {
          console.log("else");
          this.setState({ diagnosisData: {} });
        }
      });
  };
  render() {
    console.log("dd", this.state.diagnosisData);
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          flex: 1
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 18,
                color: "#9E9E9E",
                fontWeight: "500",
                marginLeft: 15,
                marginTop: 7.5,
                marginBottom: 7.5
              }}
            >
              {Object.keys(this.state.diagnosisData).length > 0 &&
              this.state.diagnosisData !== undefined
                ? moment(this.state.diagnosisData.treatmentDate).format(
                    "MMMM YYYY"
                  )
                : ""}
            </Text>
            <Card
              title="Diagnosis Attributes"
              titleStyle={{
                fontSize: 18
              }}
            >
              <View>
                {Object.keys(this.state.diagnosisData).length > 0 &&
                this.state.diagnosisData.diagnosisAttribute !== [] &&
                this.state.diagnosisData.diagnosisAttribute !== undefined ? (
                  this.state.diagnosisData.diagnosisAttribute.map(
                    (data, index) => {
                      return (
                        <View key={index}>
                          <Badge
                            containerStyle={{
                              backgroundColor: "#DCDCDC",
                              marginTop: 5
                            }}
                          >
                            <Text style={{ fontSize: 18, margin: 3 }}>
                              {data}
                            </Text>
                          </Badge>
                        </View>
                      );
                    }
                  )
                ) : (
                  <Text>No diagnosisData</Text>
                )}
              </View>
            </Card>
            <Card
              title="Diagnosis Notes"
              titleStyle={{
                fontSize: 18
              }}
            >
              <View>
                {Object.keys(this.state.diagnosisData).length > 0 &&
                this.state.diagnosisData.diagnosisNotes !== "" &&
                this.state.diagnosisData.diagnosisNotes !== undefined ? (
                  <View style={{ marginTop: 20 }}>
                    <Badge
                      containerStyle={{
                        backgroundColor: "#DCDCDC"
                      }}
                    >
                      <Text style={{ fontSize: 18, margin: 3 }}>
                        {this.state.diagnosisData.diagnosisNotes}
                      </Text>
                    </Badge>
                  </View>
                ) : (
                  <Text>No diagnosisData</Text>
                )}
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textComponent: {
    fontFamily: "monospace"
  },
  h4: {
    color: "#125EAA"
  },
  h3: {
    color: "#125EAA"
  },
  h2: {
    color: "#125EAA"
  },
  h1: {
    color: "#125EAA"
  },
  h5: {
    color: "#125EAA"
  },
  h6: {
    color: "#125EAA"
  },
  p: {
    fontSize: 18,
    color: "#000",
    fontWeight: "400"
  },
  container: {
    flex: 1
  },
  submit: {
    height: 50,
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: "#71B2F4",
    borderRadius: 20,
    borderWidth: 1
  },
  submitText: {
    fontSize: 18,
    color: "#fff",
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  },
  title: {
    fontSize: 18,
    backgroundColor: "transparent"
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center"
  }
});
