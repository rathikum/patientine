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
import { scaledHeight } from "../Utils/Resolution";
import StyledConstants from "../constants/styleConstants";

var DetailsOfBilling = [];
var patId = new PatientId();
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
var color;

const maxFileLimit = 10;

export default class UpcomingEvents extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "UpComing Events",
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor:StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontSize: 20,
       //  marginLeft: 90,
        alignSelf: "center"
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            style={{
              fontSize: scaledHeight(20),
              color:StyledConstants.colors.WHITE_COLOR,
              marginRight: scaledHeight(15),
              marginLeft:scaledHeight(15)
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
              padding: scaledHeight(6),
              borderRadius: 6
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: scaledHeight(18),
                      color: StyledConstants.colors.FONT_COLOR,
                      marginTop: 5
                    }}
                  >
                    {moment(item.visitDate).format("ll")}
                    {"\n"}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ marginTop: scaledHeight(5), marginLeft: 100, marginTop: scaledHeight(25) }}
                  >
                    <Text style={{ fontSize: scaledHeight(25), marginLeft: scaledHeight(50) }}>
                      {"\u20B9" + integer + "."}
                    </Text>
                    <Text style={{ fontSize: scaledHeight(20) }}>
                      {rem == 0 ? "00" : rem}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Badge
                  containerStyle={{
                    backgroundColor: "#aedd13",
                    height: scaledHeight(30),
                    width:scaledHeight(100),
                    paddingLeft: 0,
                    marginBottom:scaledHeight(5)
                  }}
                >
                  <Text style={{ fontSize: scaledHeight(18), marginTop: scaledHeight(3), color: StyledConstants.colors.WHITE_COLOR }}>
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
                      fontSize: scaledHeight(18),
                      color: "#efa41b",
                      marginTop: scaledHeight(18)
                    }}
                  >
                    {moment(item.visitDate).format("ll")}
                    {"\n"}
                  </Text>
                </View>
                <View>
                  <Text style={{ marginTop:scaledHeight(5), marginLeft: 100 }}>
                    <Text style={{ fontSize: scaledHeight(20) }}>{"\u20B9" + integer}</Text>
                    <Text style={{ fontSize: scaledHeight(18) }}>
                      {rem == 0 ? "00" : rem}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Badge
                  containerStyle={{
                    backgroundColor: "#aedd13",
                    height:scaledHeight(30),
                    width: scaledHeight(100),
                    paddingLeft: 0,
                    marginBottom: scaledHeight(5)
                  }}
                >
                  <Text style={{ fontSize: scaledHeight(18) }}>{"Pending"}</Text>
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


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: StyledConstants.colors.WHITE_COLOR, height: "100%" }}>
        <ScrollView>
          <View>
            
              <Card
                containerStyle={{
                  marginLeft: "3%",
                  marginTop: scaledHeight(30),
                  marginBottom: scaledHeight(10),
                  marginRight: "3%",
                  height: 100,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:"#8BC105" 
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                <TouchableOpacity >
          <FontAwesome
            style={{
              fontSize: scaledHeight(60),
              color: StyledConstants.colors.primaryColor,
              marginRight: scaledHeight(15),
              marginLeft: scaledHeight(15),
            }}
          >
            {Icons.phone}
          </FontAwesome>
        </TouchableOpacity>
                 <Text style={{marginTop:'4%',marginLeft:'2%', flexShrink: 1,color:StyledConstants.colors.FONT_COLOR,fontSize:scaledHeight(18)}}>{"Call scheduled with Dr.Mohan at 8.00 PM on 22/05/2020"}</Text>
                </View>
              </Card>
              
             {/* <Card
                containerStyle={{
                  marginLeft: "3%",
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: "3%",
                  height: 100,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:"#8BC105" 
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Medications")}>
          <FontAwesome
            style={{
              fontSize: 60,
              color: "#33ACFF",
              marginRight: 14,
              marginLeft: 15
            }}
          >
            {Icons.envelope}
          </FontAwesome>
        </TouchableOpacity>
                 <Text style={{marginTop:'6%',marginLeft:'2%'}}>{"Send an Message to doctor"}</Text>
                </View>
              </Card>

              <Card
                containerStyle={{
                  marginLeft: "3%",
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: "3%",
                  height: 100,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:"#8BC105" 
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Medications")}>
          <FontAwesome
            style={{
              fontSize: 60,
              color: "#33ACFF",
              marginRight: 14,
              marginLeft: 15
            }}
          >
            {Icons.wechat}
          </FontAwesome>
        </TouchableOpacity>
                 <Text style={{marginTop:'6%',marginLeft:'2%'}}>{"Do Message chat now"}</Text>
                </View>
        </Card> */}
              
              <Card
                containerStyle={{
                  marginLeft: "3%",
                  marginTop: 30,
                  marginBottom: 10,
                  marginRight: "3%",
                  height: 100,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:"#8BC105" 
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                <TouchableOpacity >
          <FontAwesome
            style={{
              fontSize: scaledHeight(60),
              color: StyledConstants.colors.primaryColor,
              marginRight: scaledHeight(15),
              marginLeft: scaledHeight(15),
            }}
          >
            {Icons.videoCamera}
          </FontAwesome>
        </TouchableOpacity>
                 <Text style={{marginTop:'4%',marginLeft:'2%',flexShrink: 1,color:StyledConstants.colors.FONT_COLOR,fontSize:scaledHeight(18)}}>{"Video call scheduled with Dr.Ravi on 27/04/2020"}</Text>
                </View>
              </Card>
          </View>
          
        </ScrollView>
      </View>
    );
  }
}
