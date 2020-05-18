import React, { Component } from 'react'
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView, KeyboardAvoidingView,
  Platform,
  View
} from 'react-native'
import styles from './Style'
import { baseURL } from '../../Utils/properties'
// import { Card } from 'react-native-elements'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import PatientId from '../PatientId'
import DropdownAlert from 'react-native-dropdownalert'
import StyleConstants from '../../constants/styleConstants'
import { scaledHeight } from '../../Utils/Resolution'

var patId = new PatientId()
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
     // email: 'kailasam@yaalsys.com',
     email : 'debbieg@gmail.com',
      patientId: '',
      password: 'HIS@2k19',
      error: '',
      loading: false
    }
  }
  static navigationOptions = {
    header: null
  }
  showAlert(type, title, message) {
    this.dropdown.alertWithType(type, title, message)
  }
  onLoginPress() {
    const { navigate } = this.props.navigation
    const { email, password } = this.state
    var url = baseURL + '/api/PatientLogins/login'
    const self = this
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(Response => Response.json())
      .then(Response => {
        console.log("------>",Response);
        if (Response.id) {
          const url =
            baseURL +
            '/api/PatientRegistrationData/getPatientByEmailId?emailId=' +
            this.state.email
          const self = this
          fetch(url)
            .then(response => response.json())
            .then(response => {
              if (response.patientResponse.length > 0) {
                this.setState(
                  {
                    patientId: response.patientResponse[0].patientRegistrationId
                  },
                  () => {
                    patId.getPatientId(this.state.patientId)
                    navigate('Home')
                  }
                )
              }
            })
            .catch(err => console.log(err))
        } else {
          this.showAlert(
            'info',
            'Invalid input',
            'Enter a valid email and password'
          )
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.containerimage}>
          {<DropdownAlert
            ref={ref => (this.dropdown = ref)}
            containerStyle={{
              backgroundColor: 'red'
            }}
          />}
          <Image
            source={require('../../images/mylabconnect-logo.png')}
            style={styles.imageBackground}
          />
        </View>

        <KeyboardAvoidingView style={styles.containerSignIn} behavior="padding" enabled={Platform.OS === 'ios'}>
          <ScrollView style={styles.signInContainer} bounces={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">

            <View style={styles.signInContent}>

              <Text style={styles.loginText}>Login</Text>

              <View style={styles.headingLiner} />

              <View style={styles.loginContainer}>
                <View style={styles.textin}>
                  <MaterialIcon
                    style={styles.textIcon}
                    size={scaledHeight(22)}
                    name='email'
                    color={StyleConstants.colors.primaryColor}
                  />
                  <TextInput
                    style={styles.inputTextStyle}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    placeholderTextColor='#858f90'
                    autoCapitalize='none'
                    autoCorrect={false}
                    // underlineColorAndroid='#0066ff'
                    keyboardType='email-address'
                  />
                </View>
                <View style={styles.textin}>
                  <MaterialIcon
                    style={styles.textIcon}
                    size={scaledHeight(22)}
                    name='lock'
                    color={StyleConstants.colors.primaryColor}
                  />
                  <TextInput
                    style={styles.inputTextStyle}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    placeholderTextColor='#858f90'
                    autoCapitalize='none'
                    autoCorrect={false}
                    // underlineColorAndroid='#0066ff'
                    secureTextEntry={true}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.submitButtonContainer}
                onPress={this.onLoginPress.bind(this)}
                underlayColor='#fff'
              >
                <Text style={styles.submitTextStyle}>Login</Text>
              </TouchableOpacity>

              <Text
                style={styles.forgetPassword}
                onPress={() => navigate('ForgetPassword')}
              >
                Forgot password?
                </Text>

              <View style={styles.headingLinerBottom} />

              <Text style={styles.newUser}>
                New Patient Register
                </Text>

              <Text
                style={styles.signUpText}
                onPress={() => navigate('Registration')}
              >
                Sign Up
              </Text>

              <View style={styles.buttonContainer}>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* <Card
            containerStyle={{
              height: 250,
              width: 300,
              borderRadius: 10,
              marginLeft: 40,
              marginTop: -60,
              elevation: 10
            }}
          >
          </Card> */}
      </View>
    )
  }
}
