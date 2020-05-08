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
  Button,
  Picker
} from "react-native";
import { Divider } from "react-native-elements";
import Swiper from "react-native-swiper";
import RadioForm from "react-native-simple-radio-button";
import DatePicker from "react-native-datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome, { Icons } from "react-native-fontawesome";
import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from "react-native-card-view";
import styles from "./Style";
import PatientId from "./PatientId";
import { baseURL } from "../Utils/properties";
var dob1 = "";
var patId = new PatientId();
var maritalStatusArray = [];
var radio_props = [{ label: "Male", value: 2 }, { label: "Female", value: 1 }];

export default class PatientProfile extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      patientId: "",
      idProofData: [],
      maritalStatus: "",
      patientName: "",
      bloodGroupArray: [],
      gender: "",
      dob: "",
      picture: "",
      emailId: "",
      mobileNumber: "",
      idProofType: "",
      sSN: "",
      visible: false,
      status: true,
      enumValue: "",
      enumKey: 0,
      idProofTypeKey: 0,
      maritalStatusKey: 0,
      bloodGroupKey: 0
    };
  }
  componentWillMount() {
    {
      this.FetchFunc();
    }
  }
  FetchFunc = () => {
    {
      this.clear();
    }
    this.patientId = patId.putPatientId();
    var patientDetails = {};
    let dob = [];
    var url =
      baseURL +
      "/api/PatientSummary/getPatientSummary?patientId=" +
      this.patientId;
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        dob = resultData.patientSummary.patientInfo.dob.split("T");
        dob1 = dob[1];
        patientDetails["patientName"] =
          resultData.patientSummary.patientInfo.patientName;
        patientDetails["bloodGroup"] =
          resultData.patientSummary.patientInfo.bloodGroup;
        patientDetails["gender"] = resultData.patientSummary.patientInfo.gender;
        patientDetails["maritalStatus"] =
          resultData.patientSummary.patientInfo.maritalStatus;
        patientDetails["picture"] =
          resultData.patientSummary.profilePictureInfo != null &&
          resultData.patientSummary.profilePictureInfo !== ""
            ? resultData.patientSummary.profilePictureInfo[0].picture
            : "";
        patientDetails["idProofType"] =
          resultData.patientSummary.patientInfo.idProofType;
        patientDetails["sSN"] = resultData.patientSummary.patientInfo.sSN;
        patientDetails["maritalStatusKey"] =
          resultData.patientSummary.patientInfo.maritalStatusKey;
        patientDetails["bloodGroupKey"] =
          resultData.patientSummary.patientInfo.bloodGroupKey;
        patientDetails["idProofTypeKey"] =
          resultData.patientSummary.patientInfo.idProofTypeKey;
        this.setState({
          dob: dob[0],
          idProofTypeKey: patientDetails["idProofTypeKey"],
          bloodGroupKey: patientDetails["bloodGroupKey"],
          maritalStatus: patientDetails["maritalStatus"],
          bloodGroup: patientDetails["bloodGroup"],
          idProofType: patientDetails["idProofType"],
          sSN: patientDetails["sSN"],
          gender: patientDetails["gender"],
          picture: patientDetails["picture"],
          patientName: patientDetails["patientName"],
          maritalStatusKey: patientDetails["maritalStatusKey"]
        });
      });
  };
  editsSN = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={style.datepickerWidth}
          value={this.state.sSN}
          onChangeText={sSN => this.setState({ sSN })}
        />
      );
    } else {
      return (
        <View style={{ paddingLeft: 15 }}>
          <Text style={style.insureTextElseStyleEdit}>{this.state.sSN}</Text>
        </View>
      );
    }
  };
  editIdProofType = () => {
    if (this.state.visible) {
      return (
        <TouchableOpacity style={style.lineStyle}>
          <Picker
            style={style.picker}
            selectedValue={this.state.idProofTypeKey}
            onValueChange={idProofTypeKey => this.setState({ idProofTypeKey })}
            mode="dropdown"
          >
            {this.state.idProofData.map((i, index) => (
              <Picker.Item
                key={index}
                label={i.appointmentSubType}
                value={i.appointmentSubTypeId}
              />
            ))}
          </Picker>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text style={style.insureTextElseStyle}>{this.state.idProofType}</Text>
      );
    }
  };
  editBloodGroup = () => {
    if (this.state.visible) {
      return (
        <TouchableOpacity style={style.lineStyle}>
          <Picker
            style={style.picker}
            selectedValue={this.state.bloodGroupKey}
            onValueChange={bloodGroupKey => this.setState({ bloodGroupKey })}
            mode="dropdown"
          >
            {this.state.bloodGroupArray.map((i, index) => (
              <Picker.Item key={index} label={i.enumValue} value={i.enumKey} />
            ))}
          </Picker>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text style={style.insureTextElseStyle}>{this.state.bloodGroup}</Text>
      );
    }
  };
  editDob = () => {
    const { classes } = this.props;
    if (this.state.visible) {
      return (
        <View>
          <DatePicker
            style={style.datepicker}
            date={this.state.dob}
            mode="date"
            showIcon={true}
            customStyles={{
              dateText: {
                color: "#0869EC",
                fontSize: 16,
                paddingLeft: 1
              },
              dateInput: {
                borderWidth: 0
              },
              dateIcon: {
                width: 25,
                tintColor: "#0066ff",
                height: 25
              }
            }}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => {
              this.setState({ dob: date });
            }}
            value={this.state.dob}
          />
        </View>
      );
    } else {
      return (
        <View style={{ paddingLeft: 15 }}>
          <Text style={style.insureTextElseStyleEdit}>{this.state.dob}</Text>
        </View>
      );
    }
  };
  editMarital = () => {
    if (this.state.visible) {
      return (
        <TouchableOpacity style={style.lineStyle}>
          <Picker
            style={style.picker}
            selectedValue={this.state.maritalStatusKey}
            onValueChange={maritalStatusKey =>
              this.setState({ maritalStatusKey })
            }
            mode="dropdown"
          >
            {this.maritalStatusArray.map((i, index) => (
              <Picker.Item key={index} label={i.enumValue} value={i.enumKey} />
            ))}
          </Picker>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text style={style.insureTextElseStyle}>
          {this.state.maritalStatus}
        </Text>
      );
    }
  };
  editGender = () => {
    if (this.state.visible) {
      return (
        <RadioForm
          style={style.inputrow}
          labelStyle={style.genderlabel}
          radio_props={radio_props}
          initial={0}
          buttonSize={12}
          formHorizontal={true}
          onPress={gender => this.setState({ gender: gender })}
          value={this.state.gender}
        />
      );
    } else {
      return <Text style={style.insureTextElseStyle}>{this.state.gender}</Text>;
    }
  };
  edit = () => {
    var url = baseURL + "/api/GenericEnumValue?filter[where][enumTypeId]=2";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.maritalStatusArray = response;
        this.setState({ visible: true });
      });
    url =
      baseURL +
      "/api/AppointmentsData/getAppointmentSubType?fieldType=IdProofType";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.state.idProofData =
          response.appointmentSubTypeResponse["responseData"];
        this.setState({
          idProofData: response.appointmentSubTypeResponse["responseData"]
        });
      });
    url = baseURL + "/api/GenericEnumValue?filter[where][enumTypeId]=7";
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.state.bloodGroupArray = response;
        this.setState({ bloodGroupArray: response });
      });
  };
  UpdatePatientInfo = () => {
    const { navigate } = this.props.navigation;
    var url =
      baseURL +
      "/api/PatientRegistrationData/updatePatientProfileForReceptionist";
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patientId: this.patientId,
        maritalStatus: this.state.maritalStatusKey,
        idProofType: this.state.idProofTypeKey,
        sSN: this.state.sSN,
        bloodGroup: this.state.bloodGroupKey,
        gender: this.state.gender,
        dob: this.state.dob
      })
    })
      .then(Response => Response.json())
      .then(Response => {
        {
          this.FetchFunc();
        }
      });
  };
  editIconVisible = () => {
    if (!this.state.visible) {
      return (
        <TouchableOpacity onPress={this.edit}>
          <FontAwesome
            style={{ marginLeft: 13, fontSize: 22, color: "#0066ff" }}
          >
            {Icons.pencil}
          </FontAwesome>
        </TouchableOpacity>
      );
    }
  };
  submitFunc = () => {
    if (this.state.visible) {
      return (
        <View style={style.button}>
          <TouchableOpacity
            style={style.submitButtonContainer}
            onPress={this.UpdatePatientInfo.bind(this)}
            underlayColor="#fff"
          >
            <Text style={style.submitTextStyle}> Submit </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  clear = () => {
    this.setState({ visible: false });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "#FFF" }}>
        <View style={{ backgroundColor: "#FFF" }}>
          <View>
            <View>
              <View style={style.flexcontainer}>
                <View>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                      marginRight: 30,
                      marginTop: 10,
                      marginLeft: 30,
                      display: "flex",
                      alignSelf: "center"
                    }}
                    source={
                      this.state.picture !== null && this.state.picture !== ""
                        ? {
                            uri: this.state.picture
                          }
                        : {
                            uri:
                              "https://e2pdf.com/templates/default/img/no_avatar.png"
                          }
                    }
                  />
                </View>
                <Text style={style.nameStyle}>{this.state.patientName}</Text>
              </View>
              <View style={style.editIcon}>{this.editIconVisible()}</View>
              <View style={style.contentMainView}>
                <Text style={style.textStyle}>Blood Group</Text>
                <Text style={style.colonStyle}>:</Text>
                <View>{this.editBloodGroup()}</View>
              </View>
              <View style={style.contentMainView}>
                <Text style={style.textStyle}>ID Proof Type</Text>
                <Text style={style.colonStyle}>:</Text>
                <View>{this.editIdProofType()}</View>
              </View>
              <View style={style.contentMainView}>
                <Text style={style.textStyle}>ID Proof No.</Text>
                <Text style={style.colonStyle}>:</Text>
                <View>{this.editsSN()}</View>
              </View>
              <View style={style.contentMainView}>
                <Text style={style.textStyle}>Date of Birth</Text>
                <Text style={style.colonStyle}>:</Text>
                <View>{this.editDob()}</View>
              </View>
              <View style={style.contentMainView}>
                <Text style={style.textStyle}>Marital Status</Text>
                <Text style={style.colonStyle}>:</Text>
                <View>{this.editMarital()}</View>
              </View>
              <View style={style.contentMainView}>
                <Text style={style.textStyle}>Gender</Text>
                <Text style={style.colonStyle}>:</Text>
                <View>{this.editGender()}</View>
              </View>
              <View>{this.submitFunc()}</View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const style = StyleSheet.create({
  submitTextStyle: {
    fontSize: 18,
    color: "#FFF",
    paddingTop: 5,
    width: "100%",
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  },
  submitButtonContainer: {
    height: 40,
    marginTop: 7,
    marginLeft: 40,
    backgroundColor: "#0066ff",
    borderRadius: 5,
    width: "60%",
    alignSelf: "center",
    paddingBottom: 30
  },
  nameStyle: { paddingTop: 10, alignSelf: "center", color: "#FFF" },
  button: {
    paddingTop: 20,
    width: "60%",
    alignSelf: "center",
    marginRight: 30,
    paddingBottom: 30
  },
  datepicker: {
    marginLeft: 8,
    paddingRight: 10,
    width: 190,
    borderBottomColor: "rgba(0,0,0,0.48)",
    borderBottomWidth: 0.5
  },
  inputrow: {
    marginLeft: 15
  },
  genderlabel: {
    marginLeft: 5,
    marginRight: 5,
    color: "#0066ff"
  },
  image: {
    flex: 1,
    position: "absolute"
  },
  flexcontainer: {
    backgroundColor: "#1E90FF",
    height: 150
  },
  row: {
    marginTop: 10,
    flexDirection: "row"
  },
  text: {
    marginTop: 150,
    fontSize: 18,
    fontWeight: "300",
    color: "#ffffff",
    alignSelf: "center"
  },
  datepickerWidth: {
    marginLeft: 8,
    height: 37,
    borderBottomColor: "rgba(0,0,0,0.48)",
    paddingLeft: 34,
    color: "#0066ff",
    borderBottomWidth: 0.5,
    fontSize: 16,
    width: 190
  },
  insureTextStyle: {
    fontSize: 14,
    width: 155,
    paddingLeft: 50,
    marginBottom: 5
  },
  insureTextElseStyleDob: {
    fontSize: 18,
    width: 150,
    paddingLeft: 60
  },
  insureTextElseStyle: {
    fontSize: 18,
    width: 150,
    paddingLeft: 30,
    color: "#0066ff"
  },
  insureTextElseStyleEdit: {
    fontSize: 18,
    width: 150,
    paddingLeft: 15,
    color: "#0066ff"
  },
  textStyle: {
    fontSize: 18,
    paddingLeft: 15,
    width: 150,
    color: "#efa41b"
  },
  colonStyle: { fontSize: 18, width: 5, fontWeight: "500", color: "#efa41b" },
  editIcon: {
    flexDirection: "row",
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "flex-end"
  },
  contentMainView: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5
  },
  valueStyle: {
    color: "#808080",
    width: 180,
    paddingLeft: 25,
    paddingBottom: 5
  },
  valueStyleDob: {
    color: "#808080",
    width: 180,
    paddingBottom: 5,
    paddingLeft: 15
  },
  picker: {
    color: "#0066ff",
    width: 180,
    marginLeft: 27,
    marginRight: 15,
    height: 20
  },
  lineStyle: {
    marginLeft: 8,
    paddingBottom: 10,
    paddingRight: 20,
    width: "77%",
    borderBottomColor: "rgba(0,0,0,0.48)",
    borderBottomWidth: 0.5
  }
});
