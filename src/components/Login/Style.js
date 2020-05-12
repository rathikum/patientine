import { StyleSheet } from "react-native";
import { scaledHeight, scaledWidth } from '../../Utils/Resolution';
import StyledConstants from "../../constants/styleConstants";

module.exports = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  containerimage: {
    backgroundColor: StyledConstants.colors.WHITE_COLOR,
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 0.35,
    justifyContent: 'flex-end'
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  overLay: {
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "white"
  },
  imageBackground: {
    alignSelf: 'center',
    marginBottom: scaledHeight(20)
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: scaledHeight(20)
    // height: scaledHeight(300)
  },
  textin: {
    flexDirection: "row",
    marginTop: scaledHeight(10)
  },
  textIcon: {
    marginTop: scaledHeight(20)
  },
  containerSignIn: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 0.65,
    backgroundColor: StyledConstants.colors.primaryColor,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  signInContainer: {
    alignSelf: 'stretch',
    flex: 1
  },
  newUser: {
    fontSize: scaledHeight(14),
    color: StyledConstants.colors.ORANGE,
    marginTop: scaledHeight(10),
    textAlign: 'center'
  },
  forgetPassword: {
    fontSize: scaledHeight(14),
    color:  StyledConstants.colors.primaryColor,
    marginTop: scaledHeight(30),
    textAlign: 'center'
  },
  signUpText: {
    fontSize: scaledHeight(20),
    color:  StyledConstants.colors.primaryColor,
    marginTop: scaledHeight(20),
    marginBottom: scaledHeight(30),
    textAlign: 'center'
  },
  col: {
    flexDirection: "column",
    alignSelf: "center"
  },
  loginContainer: {
    marginTop: scaledHeight(10),
    marginRight: "4%",
    marginBottom: scaledHeight(20),
    marginLeft: "4%",
    alignSelf: 'stretch',
    flex: 1,

  },
  inputTextStyle: {
    height: scaledHeight(52),
    fontSize: scaledHeight(18),
    color:  StyledConstants.colors.LBL_FIELD_COLOR,
    width: "85%",
    borderBottomWidth: 1,
    borderBottomColor:  StyledConstants.colors.FONT_COLOR,
    marginLeft: "4%",
  },
  row: {
    marginTop: scaledHeight(40),
    justifyContent: "space-around",
    flexDirection: "row"
  },
  title: {
    fontSize: scaledHeight(40),
    fontFamily: "blackadder itc",
    color: "#5e91f8",
    opacity: 1
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonContainer: { marginLeft: 55, marginRight: 34, marginTop: -5 },
  submitButtonContainer: {
    height: scaledHeight(50),
    width: scaledWidth(250),
    marginTop: scaledHeight(30),
    borderRadius: 8,
    backgroundColor: "#486D90",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  submitTextStyle: {
    fontSize: 20,
    color: "#FFF",
    // paddingTop: 5,
    width: "100%",
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  },
  signInContent: {
    marginTop: scaledHeight(50),
    marginBottom: scaledHeight(50),
    marginLeft: '6%',
    marginRight: '6%',
    "borderRadius": 15,
    backgroundColor: StyledConstants.colors.BACKGROUND_GRAY
  },
  loginText: {
    color:  StyledConstants.colors.primaryColor,
    alignSelf: 'center',
    fontSize: scaledHeight(20),
    marginTop: scaledHeight(30)

  },
  headingLiner: {
    backgroundColor:  StyledConstants.colors.GREEN,
    height: scaledHeight(1.5),
    marginTop: scaledHeight(20),
    marginLeft: '6%',
    marginRight: '6%'
  },
  headingLinerBottom: {
    backgroundColor: StyledConstants.colors.FONT_COLOR,
    height: scaledHeight(1),
    marginTop: scaledHeight(20),
    marginLeft: '6%',
    marginRight: '6%'
  },
});
