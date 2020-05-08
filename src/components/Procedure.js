import React, { Component } from "react";
import { baseURL } from "../Utils/properties";
import { Avatar, List, ListItem, SearchBar } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Icons,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-fontawesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
var dis = 0.0;

export default class Procedure extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    title: "Procedures",
    headerStyle: {
      height: 50,
      backgroundColor: "#1E90FF"
    },
    headerTitleStyle: {
      fontSize: 20,
      marginRight: 60,
      alignSelf: "center"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      billId: this.props.navigation.state.params.data,
      billResponse: {},
      patientInfo: {},
      billDetailInfo: [],
      paymentStatusCode: 0
    };
  }
  componentWillMount() {
    this.disFun();
  }
  procedureList = () => {
    let procedures = [];
    var j = 0;
    did = 0.0;
    this.state.billDetailInfo.forEach(function(i, index) {
      dis = dis + parseFloat(i.discountAmount);
      procedures.push(
        <View key={{ index }}>
          <Collapse
            style={{
              marginBottom: 0,
              marginLeft: 4,
              marginRight: 4,
              marginTop: 8,
              width: "98%",
              paddingBottom: 0,

              paddingLeft: 5,
              borderColor: "#999",
              borderRadius: 6,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1
            }}
          >
            <CollapseHeader
              style={{
                paddingTop: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 0,
                  width: "100%"
                }}
              >
                <View
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: 2
                    //  backgroundColor: "red"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#0066ff",
                      paddingBottom: 5
                      //  backgroundColor: "red"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "black",
                        paddingBottom: 10
                        //  backgroundColor: "blue"
                      }}
                    />{" "}
                    {i.procedureName}
                  </Text>
                </View>

                <View
                  style={{
                    width: "50%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignSelf: "flex-start",
                    marginLeft: 2,
                    paddingBottom: 10

                    //  backgroundColor: "blue"
                  }}
                >
                  <MaterialIcon
                    style={styles.textIcon}
                    size={22}
                    name="more-vert"
                    color="#0066ff"
                  />
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      justifyContent: "center",
                      textAlign: "left",
                      color: "#efa41b",
                      marginLeft: 20
                      //  backgroundColor: "grey"
                    }}
                  >
                    Qty {" (" + i.unit + ")"}{" "}
                  </Text>
                  <View
                    style={{ flexDirection: "row", alignSelf: "flex-start" }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        justifyContent: "center",
                        textAlign: "right",
                        color: "#0066ff",
                        marginRight: 10,
                        //  backgroundColor: "red",
                        marginLeft: 129
                      }}
                    >
                      <Text style={{ color: "black" }}>{":    "}</Text>
                      {"\u20B9"}
                      {i.unit * i.unitPrice}
                      {".00"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      justifyContent: "center",
                      textAlign: "left",
                      color: "#efa41b",
                      marginLeft: 20
                      //  backgroundColor: "grey"
                    }}
                  >
                    Discount
                  </Text>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        justifyContent: "center",
                        textAlign: "right",
                        color: "#0066ff",
                        marginRight: 10,
                        //  backgroundColor: "red",
                        marginLeft: 122
                      }}
                    >
                      <Text style={{ color: "black" }}>{":    "}</Text>
                      {"\u20B9"}
                      {i.discountAmount}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      justifyContent: "center",
                      textAlign: "left",
                      color: "#efa41b",
                      marginLeft: 20,
                      marginBottom: 7
                      //  backgroundColor: "grey"
                    }}
                  >
                    Amount
                  </Text>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        justifyContent: "center",
                        textAlign: "right",
                        color: "#0066ff",
                        marginRight: 10,
                        //  backgroundColor: "red",
                        marginLeft: 130
                      }}
                    >
                      <Text style={{ color: "black" }}>{":    "}</Text>
                      {"\u20B9"}
                      {i.amount}
                    </Text>
                  </View>
                </View>
              </View>
            </CollapseBody>
          </Collapse>
        </View>
      );

      //  j++;
      //  dis = 0;
    });

    return procedures;
  };
  disFun = () => {
    var url =
      baseURL +
      "/api/Bills/getPreviousBillDetailByBillId?billId=" +
      this.state.billId;
    const self = this;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({ billResponse: response.billResponse });
        this.setState({ patientInfo: response.billResponse.patientInfo });
        this.setState({ billDetailInfo: response.billResponse.billDetailInfo });
        this.setState({
          paymentStatusCode: response.billResponse.patientInfo.paymentStatus
        });
      });
  };

  procedureList1 = () => {
    dis = 0.0;
    this.state.billDetailInfo.forEach(function(i) {
      dis = dis + parseFloat(i.discountAmount);
    });

    return dis;
  };

  billingStyle = data => {
    let value = data * 100;
    let rem = value % 100;
    let integer = parseInt(data);
    return (
      <View>
        <Text
          style={{
            marginLeft: 7,
            color: "black",
            fontSize: 18
            //  alignText: "center"
            //backgroundColor: "blue"
          }}
        >
          {"\u20B9" + integer}
        </Text>
        <Text
          style={{
            marginLeft: 7,
            color: "black",
            fontSize: 14
          }}
        >
          {rem == 0 ? "00" : rem}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          flex: 1
        }}
      >
        <ScrollView>
          {this.state.paymentStatusCode == 0 && (
            <View style={styles.scrollViewStyle}>
              <View style={{ flex: 0.3, backgroundColor: "#c4dafc" }}>
                <View>
                  <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            marginLeft: 7,
                            color: "black",
                            fontSize: 18
                            //  alignText: "left"
                            //  backgroundColor: "blue"
                          }}
                        >
                          Billed amount
                        </Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            //  alignText: "right",
                            marginLeft: 30,
                            //  backgroundColor: "red",
                            fontSize: 18,
                            color: "black"
                          }}
                        >
                          Pending amount
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            marginLeft: 7,
                            color: "black",
                            fontSize: 18
                            //  alignText: "center"
                            //backgroundColor: "blue"
                          }}
                        >
                          {"\u20B9" + this.state.patientInfo.totalBilledAmount}
                          {"\n"}
                          {"\n"}
                          Discount amount {"\n"}
                          {"\u20B9"}
                          {this.procedureList1()}
                        </Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            //  alignText: "center",
                            marginLeft: 30,
                            color: "black",
                            //  backgroundColor: "red",
                            fontSize: 18
                          }}
                        >
                          {"\u20B9" + this.state.patientInfo.patientPayable}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{ marginLeft: 7, color: "#fff", fontSize: 18 }}
                    />
                  </View>
                  <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <View>
                      <Text
                        style={{ marginLeft: 7, color: "#fff", fontSize: 18 }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View>{this.procedureList()}</View>
            </View>
          )}

          {this.state.paymentStatusCode == 1 && (
            <View style={styles.scrollViewStyle}>
              <View style={{ flex: 0.3, backgroundColor: "#c4dafc" }}>
                <View>
                  <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            marginLeft: 7,
                            color: "black",
                            fontSize: 18

                            //  alignText: "left"
                            //  backgroundColor: "blue"
                          }}
                        >
                          Billed amount
                        </Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            //  alignText: "right",
                            marginLeft: 30,
                            //  backgroundColor: "red",
                            fontSize: 18,
                            color: "black"
                          }}
                        >
                          Pending amount
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            marginLeft: 7,
                            color: "black",
                            fontSize: 18
                            //  alignText: "center"
                            //backgroundColor: "blue"
                          }}
                        >
                          {"\u20B9" + this.state.patientInfo.totalBilledAmount}
                          {"\n"}
                          {"\n"}
                          Discount amount {"\n"}
                          {"\u20B9"}
                          {this.procedureList1()}
                        </Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            //  alignText: "center",
                            marginLeft: 30,
                            color: "black",
                            //  backgroundColor: "red",
                            fontSize: 18
                          }}
                        >
                          {"\u20B9"} 0.00
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{ marginLeft: 7, color: "#fff", fontSize: 18 }}
                    />
                  </View>
                  <View style={{ marginTop: 10, flexDirection: "row" }}>
                    <View>
                      <Text
                        style={{ marginLeft: 7, color: "#fff", fontSize: 16 }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View>{this.procedureList()}</View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollViewStyle: { backgroundColor: "white", flex: 1 }
});
