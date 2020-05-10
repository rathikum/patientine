import React, { Component } from "react";
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Platform
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import {
  Avatar,
  List,
  Divider,
  ListItem,
  SearchBar,
  Badge,
  Card
} from "react-native-elements";
import { Alert } from "react-native";
import moment from "moment";
import PatientId from "./PatientId";
import { baseURL } from "../Utils/properties";
import DocumentPicker from 'react-native-document-picker';

var DetailsOfBilling = [];
var patId = new PatientId();
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
var color;

const maxFileLimit = 10;

export default class Billing extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Documents",
      headerStyle: {
        height: 50,
        backgroundColor: "#1E90FF"
      },
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: 90,
        alignSelf: "center"
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("Medications")}>
          <FontAwesome
            style={{
              fontSize: 20,
              color: "white",
              marginRight: 14,
              marginLeft: 15
            }}
          >
            {Icons.arrowLeft}
          </FontAwesome>
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      billInfo: [],
      billDetailInfo: [],
      billingDetails: [],
      color: ["#E53935", "#E53935", "#E53935"]
    };
  }

  componentWillMount() {
    this.patientId = patId.putPatientId();
    this.updateRecords(this.patientId);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.patientId = patId.putPatientId();
      this.updateRecords(this.patientId);
    }
  }
  updateRecords = id => {
    (getMonths = []), (visitMonths = []);
    var billingMonthDetails = [];
    var url =
      baseURL +
      "/api/Bills/getPreviousBillDetailByPatientId?patientId=" +
      this.patientId;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.billResponse && response.billResponse.length > 0) {
          this.setState({ billInfo: response.billResponse });

          for (var c = 0; c < this.state.billInfo.length; c++) {
            var getMonth = {};
            if (
              c != this.state.billInfo.length - 1 &&
              moment(this.state.billInfo[c].billDate)
                .format("MMMM YYYY")
                .toString() ===
                moment(this.state.billInfo[c + 1].billDate)
                  .format("MMMM YYYY")
                  .toString()
            ) {
              getMonth = this.state.billInfo[c];
              getMonths.push(getMonth);
            } else {
              var list = {};
              getMonth = this.state.billInfo[c];
              getMonths.push(getMonth);
              list[
                moment(getMonths[0].billDate)
                  .format("MMMM YYYY")
                  .toString()
              ] = getMonths;
              visitMonths.push(list);
              getMonths = [];
            }
          }
          for (var i = 0; i < visitMonths.length; i++) {
            billingMonthDetails.push(visitMonths[i]);
          }
          this.setState({ billingDetails: billingMonthDetails });

          if (this.state.billInfo.length == 0) {
            this.setState({ billingDetails: [] });
          }
        }
      });
  };
  billingDetailsInfo = () => {
    var listOfLabel = [],
      i;
    if (this.state.billInfo.length > 0) {
      for (i = 0; i < this.state.billInfo.length; i++) {
        listOfLabel.push(
          <View key={this.state.billInfo[i]}>
            {this.BillingSubDetails(this.state.billInfo[i])}
          </View>
        );
      }
    }
    if (this.state.billInfo.length == 0) {
      listOfLabel = [];
    }
    return listOfLabel;
  };
  navigate = itemValues => {
    const { navigate } = this.props.navigation;
    navigate("Procedure", { data: itemValues.billId });
  };

  renderItem = item => {
    let value = item.totalBilledAmount * 100;
    let rem = value % 100;
    let integer = parseInt(item.totalBilledAmount);
    return (
      <View key={item}>
        <TouchableOpacity onPress={() => this.navigate(item)}>
          <Card
            containerStyle={{
              padding: 6,
              borderRadius: 6
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#efa41b",
                      marginTop: 5
                    }}
                  >
                    {moment(item.visitDate).format("ll")}
                    {"\n"}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ marginTop: 5, marginLeft: 100, marginTop: 25 }}
                  >
                    <Text style={{ fontSize: 25, marginLeft: 55 }}>
                      {"\u20B9" + integer + "."}
                    </Text>
                    <Text style={{ fontSize: 20 }}>
                      {rem == 0 ? "00" : rem}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Badge
                  containerStyle={{
                    backgroundColor: "#aedd13",
                    height: 30,
                    width: 100,
                    paddingLeft: 0,
                    marginBottom: 5
                  }}
                >
                  <Text style={{ fontSize: 18, marginTop: 3, color: "#FFFF" }}>
                    {" Paid"}
                  </Text>
                </Badge>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  renderItems = item => {
    let value = item.totalBilledAmount * 100;
    let rem = value % 100;
    let integer = parseInt(item.totalBilledAmount);
    return (
      <View key={item}>
        <TouchableOpacity onPress={() => this.navigate(item)}>
          <Card
            containerStyle={{
              padding: 6,
              borderRadius: 6
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#efa41b",
                      marginTop: 5
                    }}
                  >
                    {moment(item.visitDate).format("ll")}
                    {"\n"}
                  </Text>
                </View>
                <View>
                  <Text style={{ marginTop: 5, marginLeft: 100 }}>
                    <Text style={{ fontSize: 20 }}>{"\u20B9" + integer}</Text>
                    <Text style={{ fontSize: 18 }}>
                      {rem == 0 ? "00" : rem}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Badge
                  containerStyle={{
                    backgroundColor: "#aedd13",
                    height: 30,
                    width: 100,
                    paddingLeft: 0,
                    marginBottom: 5
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{"Pending"}</Text>
                </Badge>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  BillingSubDetails = values => {
    const { navigate } = this.props.navigation;
    var visitValues = Object.keys(values);
    let dec = values.totalBilledAmount;

    if (values.paymentStatus == 1) {
      return this.renderItem(values);
    } else {
      return this.renderItems(values);
    }
  };

  uploadDocument = async () => {
    try {
        // IOS File formats
        if (Platform.OS === 'ios') {
            results = await DocumentPicker.pickMultiple({
                type: [
                    'org.openxmlformats.wordprocessingml.document',
                    'com.adobe.pdf',
                    'public.image',
                    'org.openxmlformats.spreadsheetml.sheet',
                    DocumentPicker.types.images,
                    DocumentPicker.types.pdf
                ]
            });
        }
        // results.map((item) => {
        //     return (
        //         console.warn(`res : ${JSON.stringify(item)}`),
        //         console.warn(`File Size (MB): ${item.size / 1048576.0}`) // bytes to MB
        //     );
        // });
        // Setting the state to show multiple file attributes
        if (results.length > maxFileLimit) {
          Alert.alert("You have exceeded the maximum attachment limit");
           // this.setState({ showFileError: true, erFileMessage: `You can attach only ${maxFileLimit} file` });
           // this.setState({ showFileError: true, erFileMessage: `You have exceeded the maximum attachment limit` });
        } else {
            // const { onSelectedFiles } = this.props;
            // onSelectedFiles(results);
           
           // this.setState({ showFileError: false });
        }
    } catch (err) {
        // Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
            // If user canceled the document selection
            Alert.alert("Error:", 'Canceled from multiple doc picker', "Ok");
        } else {
            // For Unknown Error
            Alert.alert("Error:", `Unknown Error: ${JSON.stringify(err)}`, "Ok");
            throw err;
        }
    }
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <ScrollView>
          <View>
            
              <Card
                containerStyle={{
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 5,
                  height: 100,
                  margin: 0,
                  borderRadius: 5
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                 <Image source={require('../images/sample.png')} style={{width:"20%",height:"40%"}}/>
                 <Text style={{marginTop:'10%',marginLeft:'2%'}}>{"Document Uploaded on 02/04/2020"}</Text>
                </View>
              </Card>
              
              <Card
                containerStyle={{
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 5,
                  height: 100,
                  margin: 0,
                  borderRadius: 5
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                 <Image source={require('../images/test.png')} style={{width:"20%",height:"40%"}}/>
                 <Text style={{marginTop:'10%',marginLeft:'2%'}}>{"Document Uploaded on 27/02/2020"}</Text>
                </View>
              </Card>
            

<TouchableOpacity style={{height: 40,
    width: "50%",
    marginTop: 45,
    borderRadius: 30,
    marginLeft: 75,
    backgroundColor: "#0066ff"}} onPress={this.uploadDocument}>
            <Text style={{
              fontSize: 20,
              color: "#FFF",
              paddingTop: 5,
              width: "100%",
              // fontFamily: "raleway",
              fontWeight: "500",
              textAlign: "center"
            }}>Upload Document</Text>
          </TouchableOpacity>
          </View>
          
        </ScrollView>
      </View>
    );
  }
}
