import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  CheckBox,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal, WebView
} from "react-native";
import PatientId from "./PatientId";
import FontAwesome, { Icons } from "react-native-fontawesome";
var patId = new PatientId();
export default class OnlinePayment extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Online Payment",
      headerStyle: {
        height: 50,
        backgroundColor: "#1E90FF"
      },
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: 70,
        alignSelf: "center"
      },
      headerLeft: (
        <TouchableOpacity>
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
      mor: false,
      noon: false,
      eve: false,
      night: false,
      patientId: "",
      prescriptionsArray: [],
      doctorName: "",
      activeSections: false
    };
  }
  state = {
    showModal: false,
    status: "Pending"
};
handleResponse = data => {
    if (data.title === "success") {
        this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
        this.setState({ showModal: false, status: "Cancelled" });
    } else {
        return;
    }
};
render() {
    return (
        <View style={{ marginTop: 100 }}>
            <Modal
                visible={this.state.showModal}
                onRequestClose={() => this.setState({ showModal: false })}
            >
                <WebView
                    source={{ uri: "http://localhost:3000" }}
                    onNavigationStateChange={data =>
                        this.handleResponse(data)
                    }
                    injectedJavaScript={`document.f1.submit()`}
                />
            </Modal>
            <TouchableOpacity
                style={{ width: 300, height: 100 }}
                onPress={() => this.setState({ showModal: true })}
            >
                <Text style={{alignSelf:'center'}}>Online Payment</Text>
            </TouchableOpacity>
            {/* <Text>Payment Status: {this.state.status}</Text> */}
        </View>
    );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    position: "absolute"
  },
  medicamentDose: { paddingTop: 10, flexDirection: "row" },
  rightaligneditems: {
    paddingBottom: 4,
    alignSelf: "flex-end",
    marginLeft: "auto",
    marginRight: 20
  },
  medicationdate: {
    flexDirection: "row",
    paddingTop: 10
  }
});
