import React, { Component } from 'react'
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View
} from 'react-native'
import styles from './Style'
import { baseURL } from '../../Utils/properties'
import { Card } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import PatientId from '../PatientId'
import DropdownAlert from 'react-native-dropdownalert'

var patId = new PatientId()
export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'kailasam@yaalsys.com',
      patientId: '',
      password: 'HIS@2k19',
      error: '',
      loading: false
    }
  }
  static navigationOptions = {
    header: null
  }
  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message)
  }
  onLoginPress () {
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
                    navigate('DashBoard')
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
  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.overLay}>
        <KeyboardAwareScrollView>
          <View style={styles.logoContainer}>
            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              containerStyle={{
                backgroundColor: 'red'
              }}
            />
            <Image
              source={require('../../images/mylabconnect-logo.png')}
              style={styles.imageBackground}
            />
          </View>
          <Card
            containerStyle={{
              height: 250,
              width: 300,
              borderRadius: 10,
              marginLeft: 30,
              marginTop: -60,
              elevation: 10
            }}
          >
            <View style={{ color: '0066ff', alignSelf: 'center' }}>
              <Text style={{ fontSize: 23, color: '#0066ff' }}>Login</Text>
            </View>
            <View style={styles.loginContainer}>
              <View style={styles.textin}>
                <MaterialIcon
                  style={styles.textIcon}
                  size={22}
                  name='email'
                  color='#0066ff'
                />
                <TextInput
                  style={styles.inputTextStyle}
                  onChangeText={email => this.setState({ email })}
                  placeholder='Email'
                  placeholderTextColor='#858f90'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid='#0066ff'
                  keyboardType='email-address'
                />
              </View>
              <View style={styles.textin}>
                <MaterialIcon
                  style={styles.textIcon}
                  size={22}
                  name='lock'
                  color='#0066ff'
                />
                <TextInput
                  style={styles.inputTextStyle}
                  onChangeText={password => this.setState({ password })}
                  placeholder='Password'
                  placeholderTextColor='#858f90'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid='#0066ff'
                  secureTextEntry={true}
                />
              </View>
            </View>
            <View>
              <View>
                <TouchableOpacity
                  style={styles.submitButtonContainer}
                  onPress={this.onLoginPress.bind(this)}
                  underlayColor='#fff'
                >
                  <Text style={styles.submitTextStyle}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text
                  style={styles.newUser}
                  onPress={() => navigate('Registration')}
                >
                  New Patient Register
                </Text>
              </View>
              <View style={styles.col}>
                <Text
                  style={styles.forgetPassword}
                  onPress={() => navigate('ForgetPassword')}
                >
                  Forgot password?
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
