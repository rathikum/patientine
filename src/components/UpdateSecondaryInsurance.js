import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextField } from 'react-native-material-textfield'
import DatePicker from 'react-native-datepicker'
import { baseURL } from '../Utils/properties'
import styles from './Style'
export default class UpdateSecondaryInsurance extends Component {
  static navigationOptions = {
    headerTintColor: '#fff',
    title: 'UPDATE SECONDARY INSURANCE ',
    headerStyle: {
      height: 50,
      backgroundColor: '#71B2F4'
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 20,
      marginRight: 50,
      alignSelf: 'center'
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      payerName: '',
      payerId: '',
      policyName: '',
      policyId: '',
      relationship: '',
      expirationDate: '',
      nameOfInsured: '',
      disabled: false,
      registerDetails: this.props.navigation.state.params.Details
    }
  }

  UpdateSecondaryInsuranceInfo = () => {
    var insuranceDetails = [],
      registerinsuranceDetails = {}
    insuranceDetails.push({
      carrier: 'ds',
      nameOfInsured: this.state.registerDetails[1].nameOfInsured,
      expirationDate: this.state.registerDetails[1].expirationDate,
      relationship: this.state.registerDetails[1].relationship,
      policyId: this.state.registerDetails[1].policyId,
      payerName: this.state.registerDetails[1].payerName,
      payerId: this.state.registerDetails[1].payerId,
      policyName: this.state.registerDetails[1].policyName,
      insurancePayerTraceNumber: 'eedfg',
      planName: 'bxcb',
      groupName: 'sxvd',
      groupId: 1,
      isInNetwork: 1,
      effectiveDate: '2018-01-17',
      isExpired: 1,
      insurancePhone: '45352141',
      insuranceFax: '3243254',
      nameOfInsured: 'dfdzfv',
      insuredName: 'vdzbgfx',
      insuredDob: '2018-01-17',
      insuredSsn: 'adcdsafcd',
      insuranceType: 1,
      isEligible: 1
    })
    if (
      !this.state.relationship == '' ||
      !this.state.policyName == '' ||
      !this.state.expirationDate == '' ||
      !this.state.policyId == '' ||
      !this.state.nameOfInsured == '' ||
      !this.state.payerName == '' ||
      !this.state.payerId == ''
    ) {
      insuranceDetails.push({
        carrier: 'ds',
        nameOfInsured: this.state.nameOfInsured,
        expirationDate: this.state.expirationDate,
        relationship: this.state.relationship,
        policyId: this.state.policyId,
        payerName: this.state.payerName,
        payerId: this.state.payerId,
        policyName: this.state.policyName,
        insurancePayerTraceNumber: 'eedfg',
        planName: 'bxcb',
        groupName: 'sxvd',
        groupId: 1,
        isInNetwork: 1,
        effectiveDate: '2018-01-17',
        isExpired: 1,
        insurancePhone: '45352141',
        insuranceFax: '3243254',
        nameOfInsured: 'dfdzfv',
        insuredName: 'vdzbgfx',
        insuredDob: '2018-01-17',
        insuredSsn: 'adcdsafcd',
        insuranceType: 1,
        isEligible: 1
      })
    }
    alert(
      JSON.stringify(this.state.registerDetails) +
        'ada' +
        JSON.stringify(insuranceDetails)
    )
    const { navigate } = this.props.navigation
    var url = baseURL + '/api/PatientRegistrationData/createRegistrationData'
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gender: this.state.registerDetails[0].gender,
        maritalStatus: 0,
        address1: 'dgarwg',
        address2: 'rqe',
        city: 'qwqe',
        state: 'emaile',
        country: 'wqw',
        zip: 4321,
        pharmacyName: 'aaaaa',
        address: 'rqe',
        contactNo: 'qwqe',
        prescribingMethod: 1,
        fax: 'wqw',
        email: this.state.registerDetails[0].email,
        firstName: this.state.registerDetails[0].name,
        middleName: 'd',
        lastName: 'r',
        dob: this.state.registerDetails[0].dob,
        bloodGroup: 2,
        mobilePhoneNo: this.state.registerDetails[0].mobile,
        homePhoneNo: '425425',
        occupation: 'fgsdfg',
        sSN: this.state.registerDetails[0].ssn,
        refferedBy: 'etrwtr',
        emergencyContactName1: 'fszdfgz',
        emergencyContactName2: 'fesfe',
        emergencyContactName3: 'atrwt',
        relationship1: 'erear',
        relationship2: 'erewr',
        emergencyContactNo1: '3454623',
        emergencyContactNo2: '2435454',
        emergencyContactNo3: '2324342',
        createdDate: '2017-12-29',
        createdBy: 1,
        patientEmail: this.state.registerDetails[0].email,
        designation: 'gsfgdf',
        employerName: 'ees',
        employerNumber: '324414134',
        employerAddress: 'gfdhgsxg',
        medicalHistory: [{ questionId: 1, answer: 'gszfgsg' }],

        insuranceData: insuranceDetails,
        familyHistoryData: [
          {
            finding: 'jjijio',
            relationship: 'kokok',
            onSetAge: 23
          },
          {
            finding: 'jjijio',
            relationship: 'kokok',
            onSetAge: 25
          }
        ],
        socialHistoryData: [
          {
            socialHistoryType: 1,
            routine: 'vghvg',
            substance: 'vhhj',
            comment: 'jbjk',
            status: 1
          },
          {
            socialHistoryType: 1,
            routine: 'vghvg',
            substance: 'vhhj',
            comment: 'jbjk',
            status: 1
          }
        ],
        surgeryHistoryData: [
          {
            surgery: 'aaaaa',
            surgeryHistoryType: 1,
            hospitalization: 1,
            fromDate: '2018-01-17',
            toDate: '2018-01-17',
            reason: 'gggg',
            outcome: 'hghguh'
          },
          {
            surgery: 'aaaaa',
            surgeryHistoryType: 1,
            hospitalization: 1,
            fromDate: '2018-01-17',
            toDate: '2018-01-17',
            reason: 'gggg',
            outcome: 'hghguh'
          }
        ],
        medicalHistoryData: [
          {
            diagnosis: 'dfhjk',
            startDate: '2018-01-17',
            endDate: '2018-01-17',
            comment: 'ggggj',
            status: 1
          },
          {
            diagnosis: 'dfhjk',
            startDate: '2018-01-17',
            endDate: '2018-01-17',
            comment: 'ggggj',
            status: 1
          }
        ]
      })
    })
      .then(Response => Response.json())
      .then(result => {
        var pId = {}
        pId['xyz'] = result['registrationDataResponse']
        alert(JSON.stringify(pId))
        navigate('Login')
      })
  }
  skip () {
    this.setState({ disabled: true })
  }
  render () {
    return (
      <KeyboardAwareScrollView
        behaviour='padding'
        style={styles.registercontainer}
      >
        <View style={styles.border}>
          <TextField
            style={styles.input}
            label='Payer Name '
            clearTextOnFocus={true}
            value={this.state.payerName}
            disabled={this.state.disabled}
            onChangeText={text => this.setState({ payerName: text })}
          />
          <TextField
            label='Payer Id '
            clearTextOnFocus={true}
            value={this.state.payerId}
            disabled={this.state.disabled}
            onChangeText={text => this.setState({ payerId: text })}
          />
          <View style={styles.row}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
                marginTop: 20
              }}
            >
              Expiration Date{' '}
            </Text>
            <DatePicker
              style={{ width: 250, paddingHorizontal: 10, marginTop: 20 }}
              date={this.state.expirationDate}
              mode='date'
              disabled={this.state.disabled}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              onDateChange={date => {
                this.setState({ expirationDate: date })
              }}
              value={this.state.expirationDate}
            />
          </View>
          <TextField
            label='Policy Name '
            clearTextOnFocus={true}
            disabled={this.state.disabled}
            value={this.state.policyName}
            onChangeText={text => this.setState({ policyName: text })}
          />
          <TextField
            label='Policy Id'
            clearTextOnFocus={true}
            disabled={this.state.disabled}
            value={this.state.policyId}
            onChangeText={text => this.setState({ policyId: text })}
          />

          <TextField
            label='Name of Insured '
            clearTextOnFocus={true}
            disabled={this.state.disabled}
            value={this.state.nameOfInsured}
            onChangeText={text => this.setState({ nameOfInsured: text })}
          />
          <TextField
            label='Relationship'
            clearTextOnFocus={true}
            disabled={this.state.disabled}
            value={this.state.relationship}
            onChangeText={text => this.setState({ relationship: text })}
          />
          <View style={styles.row}>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  marginTop: 5,
                  paddingTop: 10,
                  paddingBottom: 20,
                  backgroundColor: '#71B2F4',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#fff'
                }}
                onPress={this.skip.bind(this)}
                underlayColor='#fff'
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    marginLeft: 20,
                    marginRight: 20,
                    textAlign: 'center'
                  }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 65, paddingRight: 20 }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  marginTop: 5,
                  paddingTop: 10,
                  paddingBottom: 20,
                  backgroundColor: '#71B2F4',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#fff'
                }}
                onPress={this.UpdateSecondaryInsuranceInfo.bind(this)}
                underlayColor='#fff'
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    marginLeft: 20,
                    marginRight: 20,
                    textAlign: 'center'
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
