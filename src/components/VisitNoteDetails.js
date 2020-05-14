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
import { scaledHeight } from "../Utils/Resolution";
import StyledConstants from "../constants/styleConstants";

export default class VisitNoteDetails extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Diagnosis",
    headerStyle: {
      height: scaledHeight(50),
      backgroundColor:StyledConstants.colors.primaryColor
    },
    headerTitleStyle: {
      fontSize: scaledHeight(20),
      marginLeft:  scaledHeight(50),
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
          backgroundColor: StyledConstants.colors.BACKGROUND_GRAY,
          flex: 1
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: scaledHeight(18),
                color: StyledConstants.colors.primaryColor,
                fontWeight: "800",
                marginLeft:scaledHeight(15),
                marginTop: scaledHeight(20),
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
                fontSize: scaledHeight(18),
                color:StyledConstants.colors.primaryColor
              }}
              containerStyle={{ borderRadius: 6 , borderWidth:2 ,borderColor:StyledConstants.colors.GREEN}}
              
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
                              marginTop: scaledHeight(5)
                            }}
                          >
                            <Text style={{ fontSize: scaledHeight(18), margin: scaledHeight(4),color:StyledConstants.colors.ORANGE }}>
                              {data}
                            </Text>
                          </Badge>
                        </View>
                      );
                    }
                  )
                ) : (
                  <Text style={{ fontSize: scaledHeight(18),color:StyledConstants.colors.FONT_COLOR }}>No diagnosisData</Text>
                )}
              </View>
            </Card>
            <Card
              title="Diagnosis Notes"
              titleStyle={{
                fontSize: scaledHeight(18),
                color:StyledConstants.colors.primaryColor
              }}
              containerStyle={{ borderRadius: 6 , borderWidth:2 ,borderColor:StyledConstants.colors.GREEN}}
            >
              <View>
                {Object.keys(this.state.diagnosisData).length > 0 &&
                this.state.diagnosisData.diagnosisNotes !== "" &&
                this.state.diagnosisData.diagnosisNotes !== undefined ? (
                  <View style={{ marginTop: scaledHeight(20) }}>
                    <Badge
                      containerStyle={{
                        backgroundColor: "#DCDCDC"
                      }}
                    >
                      <Text style={{ fontSize: scaledHeight(18), margin: scaledHeight(4),color:StyledConstants.colors.FONT_COLOR }}>
                        {this.state.diagnosisData.diagnosisNotes}
                      </Text>
                    </Badge>
                  </View>
                ) : (
                  <Text style={{ fontSize: scaledHeight(18),color:StyledConstants.colors.FONT_COLOR }}>No diagnosisData</Text>
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
    fontSize: scaledHeight(18),
    color: "#000",
    fontWeight: "400"
  },
  container: {
    flex: 1
  },
  submit: {
    height:scaledHeight(50),
    paddingTop: scaledHeight(5),
    paddingBottom: scaledHeight(20),
    backgroundColor: "#71B2F4",
    borderRadius: 20,
    borderWidth: 1
  },
  submitText: {
    fontSize: scaledHeight(18),
    color:StyledConstants.colors.WHITE_COLOR,
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  },
  title: {
    fontSize: scaledHeight(18),
    backgroundColor: "transparent"
  },
  text: {
    fontSize: scaledHeight(18),
    fontWeight: "500",
    alignSelf: "center"
  }
});
