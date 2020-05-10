import { StyleSheet } from "react-native";
module.exports = StyleSheet.create({
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
    margin: '8%',
    marginTop: '30%',
    width: "85%",
    height: "35%" ,
    resizeMode: 'stretch'
  },
  logoContainer: {
    backgroundColor: "#0066ff",
    height: 300
  },
  textin: { flexDirection: "row" },
  textIcon: {
    marginTop: 20
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
  newUser: {
    fontSize: 14,
    color: "#efa41b"
  },
  forgetPassword: {
    fontSize: 14,
    color: "#efa41b"
  },
  col: {
    flexDirection: "column",
    alignSelf: "center"
  },
  loginContainer: {
    marginTop: 20,
    marginRight: 10,
    paddingHorizontal: 40
  },
  inputTextStyle: {
    height: 60,
    fontSize: 18,
    color: "#0066ff",
    borderRadius: 20,
    width: "100%"
  },
  row: {
    marginTop: 40,
    justifyContent: "space-around",
    flexDirection: "row"
  },
  title: {
    fontSize: 40,
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
    height: 40,
    width: "50%",
    marginTop: 45,
    borderRadius: 30,
    marginLeft: 75,
    backgroundColor: "#0066ff"
  },
  submitTextStyle: {
    fontSize: 20,
    color: "#FFF",
    paddingTop: 5,
    width: "100%",
    // fontFamily: "raleway",
    fontWeight: "500",
    textAlign: "center"
  }
});
