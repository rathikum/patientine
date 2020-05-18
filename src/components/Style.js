import { StyleSheet } from "react-native";
import { scaledHeight } from "../Utils/Resolution";
import StyledConstants from "../constants/styleConstants";

module.exports = StyleSheet.create({
  border: {
    marginLeft:  scaledHeight(25),
    marginRight: scaledHeight(25),
  },
  submitTextStyle: {
    fontSize: scaledHeight(20),
    color: StyledConstants.colors.WHITE_COLOR,
    paddingTop: scaledHeight(5),
    width: "100%",
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  },
  input: {
    // marginTop:scaledHeight(20),
    marginBottom: scaledHeight(5),
    color: StyledConstants.colors.FONT_COLOR
  },
  genderlabel: {
    marginLeft: scaledHeight(5),
    marginRight:scaledHeight(15),
  },
  submitButtonContainer: {
    height: scaledHeight(40),
    width: "50%",
    marginTop: scaledHeight(15),
    // alignItems:'center',
    // marginLeft: 100,
    backgroundColor: StyledConstants.colors.primaryColor,
    borderRadius: 5
  },
  rowgender: {
    marginTop:scaledHeight(30),
    flexDirection: "row"
  },
  inputstyle: {
    fontSize: scaledHeight(18),
    marginBottom: scaledHeight(20),
    color: StyledConstants.colors.FONT_COLOR
  },
  Calendar: {
    paddingTop: scaledHeight(10),
    marginLeft: scaledHeight(20),
    marginRight:  scaledHeight(20),
  },
  date: {
    fontSize:  scaledHeight(18),
    // paddingTop:  scaledHeight(8),
    borderBottomColor: StyledConstants.colors.COMP_BORDER_COLOR,
    borderBottomWidth: 0.5,
    color: StyledConstants.colors.FONT_COLOR
  },
  submitcontainer: {
    marginTop:scaledHeight(8),
    width: "100%",
    alignSelf: "center"
  },
  submit: {
    paddingTop: scaledHeight(5),
    height:scaledHeight(40),
    backgroundColor: "#1B81E5",
    borderRadius: 5
  },
  submitText: {
    width: "100%",
    fontSize:  scaledHeight(18),
    color: StyledConstants.colors.WHITE_COLOR,
    textAlign: "center"
  },
  row: {
    marginTop:  scaledHeight(20),
    flexDirection: "row"
  },
  datepick: {
    width:  scaledHeight(300),
    paddingHorizontal:  scaledHeight(50),
  },
  inputrow: {
    marginLeft:  scaledHeight(90),
  },
  registercontainer: {
    flexGrow: 1,
    backgroundColor:StyledConstants.colors.WHITE_COLOR
  },
  patientcontainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor:StyledConstants.colors.WHITE_COLOR
  },
  calendarcontainer: {
    flex: 1
  },
  patientinput: {
    padding: scaledHeight(20),
  },
  patientinputstyle: {
    marginBottom:  scaledHeight(10),
  },
  patienttitlestyle: {
    fontSize:  scaledHeight(35),
    textAlign: "center",
    margin:  scaledHeight(10),
  },
  profilecontainer: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  profilebuttoncontainerstyle: {
    marginBottom:  scaledHeight(20),
  },
  logocontainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  profilebuttoncontainer: {
    marginBottom: scaledHeight(20),
    paddingHorizontal:  scaledHeight(20),
  },
  title: {
    fontSize: scaledHeight(25),
    color:StyledConstants.colors.WHITE_COLOR
  },
  datepickerWidth: {
    width: "100%",
    borderBottomColor: "rgba(0,0,0,0.38)",
    borderBottomWidth: 0.5
  },
  datepicker: {
    width: "70%",
    borderBottomColor: "rgba(0,0,0,0.38)",
    borderBottomWidth: 0.5
  },
  secButtonViewSkip: {
    width: "44%",
    paddingTop: scaledHeight(5),
    marginTop:scaledHeight(20),
    alignSelf: "center"
  },
  secButtonSkip: {
    marginTop: scaledHeight(5),
    height: scaledHeight(40),
    backgroundColor: StyledConstants.colors.primaryColor,
    borderRadius: 5
  },
  secureTextSkip: {
    padding: scaledHeight(5),
    fontSize: scaledHeight(18),
    color: "#fff",
    textAlign: "center"
  },
  secButtonViewRegister: {
    width: "44%",
    paddingTop: 5,
    alignSelf: "center"
  },
  secButtonRegister: {
    height:scaledHeight(40),
    backgroundColor: "#1B81E5",
    borderRadius: 5
  },
  secTextRegister: {
    fontSize: scaledHeight(20),
    color: StyledConstants.colors.WHITE_COLOR,
    paddingTop: scaledHeight(5),
    paddingBottom: scaledHeight(5),
    width: "100%",
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  // Primary Insurance //
  PrimaryInsuText: {
    fontSize: scaledHeight(18),
    paddingTop: scaledHeight(12),
    borderBottomColor: "rgba(0,0,0,0.38)",
    borderBottomWidth: 0.5,
    color: "rgba(0,0,0,0.38)"
  },
  primaryInsuDatePicker: {
    width: "68%",
    borderBottomColor: "rgba(0,0,0,0.38)",
    borderBottomWidth: 0.5
  },
  headingLiner: {
    backgroundColor:  StyledConstants.colors.BORDER_GRAY,
    height: scaledHeight(1),
    marginTop: scaledHeight(15),
    // marginLeft: '4%',
    // marginRight: '4%'
  },
  // Primary Insurance //
});
