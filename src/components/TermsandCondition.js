import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextField } from 'react-native-material-textfield'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { baseURL } from '../Utils/properties'
import styles from './Style'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { scaledHeight } from '../Utils/Resolution'
import StyledConstants from "../constants/styleConstants";


export default class Registration extends Component {
  static navigationOptions = ({ navigation }) => {
      return{
    headerTintColor: StyledConstants.colors.WHITE_COLOR,
    title: "Telehealth Consent Form",
    headerStyle: {
      height: scaledHeight(50),
      backgroundColor: StyledConstants.colors.primaryColor
    },
    headerTitleStyle: {
        fontWeight: "500",
        fontSize: scaledHeight(22),
        alignSelf: "center"
      },
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <FontAwesome
                    style={{
                      fontSize: 18,
                      color: "white",
                      marginRight: 14,
                      marginLeft: 5,
                      marginTop: 5
                    }}
                  >
                    {Icons.arrowLeft}
                  </FontAwesome>
            </View>
          </TouchableOpacity>
        </View>
      )
  };
  };  
  constructor (props) {
    super(props)
    this.onAccessory = this.onAccessory.bind(this)
    this.renderPassword = this.renderPassword.bind(this)
    this.onAccessoryPress = this.onAccessoryPress.bind(this)
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this)
    this.state = {
      name: '',
      lName: '',
      age: '',
      gender: 1,
      mobile: '',
      email: '',
      ssn: '',
      dob: '',
      password: '',
      confirmPassword: '',
      res: '',
      error: '',
      loading: false,
      response: [],
      secureTextEntry: true,
      secureText: true,
      appointmentSubTypeId: 1,
      idProofValue: '',
      idProofData: [],
      messageText : ''
    }
  }
  onAccessoryPress () {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry
    }))
  }
  componentWillMount () {
    this.fetchIdProofType()
  }
  fetchIdProofType = () => {
    let url =
      baseURL +
      '/api/AppointmentsData/getAppointmentSubType?fieldType=IdProofType'
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (
          response.appointmentSubTypeResponse.responseData &&
          response.appointmentSubTypeResponse.responseData.length > 0
        ) {
          this.setState({
            idProofData: response.appointmentSubTypeResponse.responseData
          })
        }
      })
  }
  onAccessory () {
    this.setState(({ secureText }) => ({
      secureText: !secureText
    }))
  }
  renderPassword () {
    let { secureText } = this.state
    let name = secureText ? 'visibility' : 'visibility-off'
    return (
      <MaterialIcon
        size={24}
        name={name}
        color='#0066ff'
        onPress={this.onAccessory}
      />
    )
  }
  renderPasswordAccessory () {
    let { secureTextEntry } = this.state
    let name = secureTextEntry ? 'visibility' : 'visibility-off'
    return (
      <MaterialIcon
        size={24}
        name={name}
        color='#0066ff'
        onPress={this.onAccessoryPress}
      />
    )
  }
  mobileNumber = () => {
    return <MaterialIcon size={scaledHeight(24)} name='smartphone' color={StyledConstants.colors.primaryColor} />
  }
  eMail = () => {
    return <MaterialIcon size={scaledHeight(24)} name='mail' color={StyledConstants.colors.primaryColor} />
  }
  sSn = () => {
    return <MaterialIcon size={scaledHeight(24)} name='local-library' color={StyledConstants.colors.primaryColor} />
  }
  proName = () => {
    return <MaterialIcon size={scaledHeight(24)} name='person' color={StyledConstants.colors.primaryColor} />
  }

  bookAppointment = () => {
    const { navigate } = this.props.navigation
    let url = baseURL + '/api/preRegistration/mobileRegistration'
    let regObj = {
      firstName: this.state.name,
      lastName: this.state.lName,
      middleName: '',
      gender: this.state.gender,
      mobNo: this.state.mobile,
      dob: this.state.dob,
      email: this.state.email
    }
    console.log('regObj:', regObj)
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regObj)
    })
      .then(response => response.json())
      .then(response => {
        console.log('response:', response)
        if (
          response != null &&
          Object.keys(response).includes('registrationResponse')
        ) {
          let registrationResponse = response.registrationResponse
          if (
            registrationResponse != null &&
            Object.keys(registrationResponse).includes('responsData')
          ) {
            navigate('Login')
          } else {
            // TODO
            console.log('show exception on the screeon')
          }
        } else {
          // TODO
          console.log('show exception on the screeon')
        }
      })
      .catch(error => console.log('exception caught:', error))
  }

  registerPatientInfo = () => {
    const { navigate } = this.props.navigation
    console.log('cc', this.state.dob)

    var personalDetails = {
      name: this.state.name,
      lName: this.state.lName,
      age: this.state.age,
      gender: this.state.gender,
      mobile: this.state.mobile,
      email: this.state.email,
      idProofType: this.state.appointmentSubTypeId,
      dob: this.state.dob,
      idProofValue: this.state.idProofValue
    }
    navigate('PreRegAppointment', { personalDetails: personalDetails })
  }
  messageTextMethod = text => {
    this.setState({ messageText: text })
  }

  render () {
    let { secureTextEntry, secureText } = this.state
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView
        behaviour='padding'
        style={styles.registercontainer}
      >
        <View style={styles.border}>
            <Text style={{marginTop:scaledHeight(20),fontSize:scaledHeight(24)}}>
                {"I, Mitchelle, have read and understand the information provided above regarding telehealth, have discussed it with my provider or such assistants as may be designated, and all of my questions have answered to my satisfaction. I hereby give my informed consent for the use of telehealth in my care."}
            </Text>
          <TextField
            tintColor = {StyledConstants.colors.primaryColor}
            textColor = {StyledConstants.colors.FONT_COLOR}
            baseColor = {StyledConstants.colors.BORDER_GRAY}
            style={styles.input}
            label='Patient Name'
            value={this.state.name}
            //   renderAccessory={this.proName}
            onChangeText={text => this.setState({ name: text })}
          />
       
<Text style={{marginTop:scaledHeight(20),marginBottom:scaledHeight(20),fontSize:scaledHeight(24)}}> 
    {"Patient Signature"}
</Text>
      
     <View style={{
            flex: 0.2,
            flexDirection: 'row',
            height: scaledHeight(200),
            width: '100%'
          }}
        >
          <KeyboardAvoidingView
            style={{
              borderWidth: 2,
              borderRadius: 5,
              borderColor: 'black',
              width: '100%'
            }}
          >
<TextInput
              style={{
                fontSize: 18,
                borderRadius: 5
              }}
              multiline={true}
              textAlignVertical={'top'}
              numberOfLines={5}
              underlineColorAndroid='transparent'
              onChangeText={this.messageTextMethod}
              value={this.state.messageText}
            />

</KeyboardAvoidingView>
</View>

<View  style={{alignContent:'center',alignItems:'center',marginTop:scaledHeight(30)}}>

            <TouchableOpacity
              style={styles.submitButtonContainer}
              // onPress={()=>{navigate('TermsCondition')}}
              underlayColor='#fff'
            >
              <Text style={styles.submitTextStyle}>Submit Form</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
