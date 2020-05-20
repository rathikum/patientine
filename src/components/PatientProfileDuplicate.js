import React, { Component } from 'react'
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
  Button
} from 'react-native'
import { Divider } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import DatePicker from 'react-native-datepicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import {
  Card,
  CardTitle,
  CardImage,
  CardContent,
  CardAction
} from 'react-native-card-view'
import PatientId from './PatientId'
import { baseURL } from '../Utils/properties'
const patientDetails = {}
var patId = new PatientId()
export default class PatientProfileDuplicate extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      patientId: '',
      picture: '',
      bloodGroup: '',
      ssn: '',
      name: '',
      emailId: '',
      mobileNumber: '',
      address: [],
      visible: false,
      status: true,
      primaryPayerName: '',
      primaryPolicyId: '',
      primaryPayerId: '',
      primaryExpirationDate: '',
      primaryNameOfInsured: '',
      primarypolicyHolder: '',
      secondaryPayerName: '',
      secondaryPolicyId: '',
      secondaryPayerId: '',
      secondaryExpirationDate: '',
      secondaryNameOFInsured: '',
      secondarypolicyHolder: ''
    }
  }
  componentWillMount () {
    this.patientId = patId.putPatientId()
    var url =
      baseURL +
      '/api/PatientRegistrationData/getPatientSummary?patientId=' +
      this.patientId
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        patientDetails['name'] =
          resultData.patientSummary.patientInfo.patientName
        patientDetails['picture'] =
          resultData.patientSummary.profilePictureInfo[0].picture
        patientDetails['patientId'] =
          resultData.patientSummary.insuranceInfo[0].patientId
        patientDetails['primaryPayerName'] =
          resultData.patientSummary.insuranceInfo[0].payerName
        patientDetails[
          'primaryPolicyId'
        ] = resultData.patientSummary.insuranceInfo[0].policyId.toString()
        patientDetails['primarypolicyHolder'] =
          resultData.patientSummary.insuranceInfo[0].policyHolder

        patientDetails['primaryNameOfInsured'] =
          resultData.patientSummary.insuranceInfo[0].insuredName
        patientDetails[
          'primaryPayerId'
        ] = resultData.patientSummary.insuranceInfo[0].payerId.toString()
        patientDetails['primaryExpirationDate'] =
          resultData.patientSummary.insuranceInfo[0].expirationDate
        if (resultData.patientSummary.insuranceInfo[1] != undefined) {
          patientDetails['secondaryPayerName'] =
            resultData.patientSummary.insuranceInfo[1].payerName
          patientDetails[
            'secondaryPolicyId'
          ] = resultData.patientSummary.insuranceInfo[1].policyId.toString()
          patientDetails['secondarypolicyHolder'] =
            resultData.patientSummary.insuranceInfo[1].policyHolder
          patientDetails['secondaryNameOFInsured'] =
            resultData.patientSummary.insuranceInfo[1].insuredName
          patientDetails[
            'secondaryPayerId'
          ] = resultData.patientSummary.insuranceInfo[1].payerId.toString()
          patientDetails['secondaryExpirationDate'] =
            resultData.patientSummary.insuranceInfo[1].expirationDate
        }
        patientDetails['bloodGroup'] =
          resultData.patientSummary.patientInfo.bloodGroup
        patientDetails['ssn'] = resultData.patientSummary.patientInfo.sSN
        patientDetails['emailId'] = resultData.patientSummary.patientInfo.email
        patientDetails['mobileNumber'] =
          resultData.patientSummary.patientInfo.mobilePhoneNo
        patientDetails['addressId'] =
          resultData.patientSummary.addressInfo.addressId
        patientDetails['address1'] =
          resultData.patientSummary.addressInfo.address1
        patientDetails['address2'] =
          resultData.patientSummary.addressInfo.addressId2
        patientDetails['city'] = resultData.patientSummary.addressInfo.city
        patientDetails['state'] = resultData.patientSummary.addressInfo.state
        patientDetails['country'] =
          resultData.patientSummary.addressInfo.country
        patientDetails['zip'] = resultData.patientSummary.addressInfo.zip

        var address =
          patientDetails['addressId'] +
          patientDetails['address1'] +
          patientDetails['city'] +
          patientDetails['state'] +
          patientDetails['country'] +
          patientDetails['zip']
        this.setState({
          name: patientDetails['name'],
          bloodGroup: patientDetails['bloodGroup'],
          ssn: patientDetails['ssn'],
          emailId: patientDetails['emailId'],
          patientId: patientDetails['patientId'],
          mobileNumber: patientDetails['mobileNumber'],
          address: address,
          picture: patientDetails['picture'],
          primaryPayerName: patientDetails['primaryPayerName'],
          primaryPolicyId: patientDetails['primaryPolicyId'],
          primaryPayerId: patientDetails['primaryPayerId'],
          primaryExpirationDate: patientDetails['primaryExpirationDate'],
          primaryNameOfInsured: patientDetails['primaryNameOfInsured'],
          primarypolicyHolder: patientDetails['primarypolicyHolder'],

          secondaryPayerName: patientDetails['secondaryPayerName'],
          secondaryPolicyId: patientDetails['secondaryPolicyId'],
          secondaryPayerId: patientDetails['secondaryPayerId'],
          secondaryExpirationDate: patientDetails['secondaryExpirationDate'],
          secondaryNameOFInsured: patientDetails['secondaryNameOFInsured'],
          secondarypolicyHolder: patientDetails['secondarypolicyHolder']
        })
      })
  }

  editSecondaryNameOfInsured = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.secondaryNameOFInsured}
          onChangeText={secondaryNameOFInsured =>
            this.setState({ secondaryNameOFInsured })
          }
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.secondaryNameOFInsured}
        </Text>
      )
    }
  }
  editPrimaryNameOfInsured = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.primaryNameOfInsured}
          onChangeText={primaryNameOfInsured =>
            this.setState({ primaryNameOfInsured })
          }
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.primaryNameOfInsured}
        </Text>
      )
    }
  }
  editSecondarypolicyHolder = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.secondarypolicyHolder}
          onChangeText={secondarypolicyHolder =>
            this.setState({ secondarypolicyHolder })
          }
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.secondarypolicyHolder}
        </Text>
      )
    }
  }
  editPrimarypolicyHolder = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.primarypolicyHolder}
          onChangeText={primarypolicyHolder =>
            this.setState({ primarypolicyHolder })
          }
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.primarypolicyHolder}
        </Text>
      )
    }
  }
  editSecondaryPolicyId = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.secondaryPolicyId}
          onChangeText={secondaryPolicyId =>
            this.setState({ secondaryPolicyId })
          }
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.secondaryPolicyId}
        </Text>
      )
    }
  }
  editPrimaryPolicyId = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.primaryPolicyId}
          onChangeText={primaryPolicyId => this.setState({ primaryPolicyId })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.primaryPolicyId}
        </Text>
      )
    }
  }
  editSecondaryExpirationDate = () => {
    if (this.state.visible) {
      return (
        <View>
          <DatePicker
            style={styles.expireDate}
            date={this.state.secondaryExpirationDate}
            mode='date'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            onDateChange={date => {
              this.setState({ secondaryExpirationDate: date })
            }}
            value={this.state.secondaryExpirationDate}
          />
        </View>
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.secondaryExpirationDate}
        </Text>
      )
    }
  }
  editPrimaryExpirationDate = () => {
    if (this.state.visible) {
      return (
        <View>
          <DatePicker
            style={styles.expireDate}
            date={this.state.primaryExpirationDate}
            mode='date'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            onDateChange={date => {
              this.setState({ primaryExpirationDate: date })
            }}
            value={this.state.primaryExpirationDate}
          />
        </View>
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.primaryExpirationDate}
        </Text>
      )
    }
  }
  editSecondaryPayerName = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.secondaryPayerName}
          onChangeText={secondaryPayerName =>
            this.setState({ secondaryPayerName })
          }
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.secondaryPayerName}
        </Text>
      )
    }
  }
  editPrimaryPayerName = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.primaryPayerName}
          onChangeText={primaryPayerName => this.setState({ primaryPayerName })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.primaryPayerName}
        </Text>
      )
    }
  }
  editPrimaryPayerId = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.primaryPayerId}
          onChangeText={primaryPayerId => this.setState({ primaryPayerId })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.primaryPayerId}
        </Text>
      )
    }
  }
  editSecondaryPayerId = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.secondaryPayerId}
          onChangeText={secondaryPayerId => this.setState({ secondaryPayerId })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.secondaryPayerId}
        </Text>
      )
    }
  }
  editEmail = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.emailId}
          onChangeText={emailId => this.setState({ emailId })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>{this.state.emailId}</Text>
      )
    }
  }
  editMobile = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.mobileNumber}
          onChangeText={mobileNumber => this.setState({ mobileNumber })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>
          {this.state.mobileNumber}
        </Text>
      )
    }
  }
  editAddress = () => {
    if (this.state.visible) {
      return (
        <TextInput
          style={styles.insureTextStyle}
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
        />
      )
    } else {
      return (
        <Text style={styles.insureTextElseStyle}>{this.state.address}</Text>
      )
    }
  }
  edit = () => {
    this.setState({ visible: true })
  }
  UpdatePatientInfo = () => {
    var insurance = []
    if (
      this.state.secondaryPayerId != '' ||
      this.state.secondarypolicyHolder != '' ||
      this.state.secondaryPolicyId != '' ||
      this.state.secondaryPayerName != '' ||
      this.state.secondaryRelationship != '' ||
      this.state.secondaryExpirationDate != '' ||
      this.state.secondaryNameOFInsured != ''
    ) {
      insurance = [
        {
          insuranceId: 8,
          carrier: 'ds',
          payerId: this.state.primaryPayerId,
          payerName: this.state.primaryPayerName,
          policyId: this.state.primaryPolicyId,
          policyHolder: this.state.primarypolicyHolder,
          insurancePayerTraceNumber: 'eedfg',
          planName: 'bxcb',
          groupName: 'sxvd',
          groupId: 1,
          isInNetwork: 1,
          effectiveDate: '2018-01-17',
          expirationDate: this.state.primaryExpirationDate,
          isExpired: 1,
          insurancePhone: '45352141',
          insuranceFax: '3243254',
          nameOfInsured: 'dfdzfv',
          insuredName: this.state.primaryNameOfInsured,
          insuredDob: '2018-01-17',
          insuredSsn: 'adcdsafcd',
          insuranceType: 1,
          isEligible: 1,
          insuranceCategory: null,
          copayCoinsID: null,
          patientId: 'PAT2'
        },
        {
          insuranceId: 89,
          carrier: 'ds',
          payerId: parseInt(this.state.secondaryPayerId),
          payerName: this.state.secondaryPayerName,
          policyId: parseInt(this.state.secondaryPolicyId),
          policyHolder: this.state.secondarypolicyHolder,
          insurancePayerTraceNumber: 'eedfg',
          planName: 'bxcb',
          groupName: 'sxvd',
          groupId: 1,
          isInNetwork: 1,
          effectiveDate: '2018-01-17',
          expirationDate: this.state.secondaryExpirationDate,
          isExpired: 1,
          insurancePhone: '45352141',
          insuranceFax: '3243254',
          nameOfInsured: 'dfdzfv',
          insuredName: this.state.secondaryNameOfInsured,
          insuredDob: '2018-01-17',
          insuredSsn: 'adcdsafcd',
          insuranceType: 1,
          isEligible: 1,
          insuranceCategory: null,
          copayCoinsID: null,
          patientId: 'PAT2'
        }
      ]
    } else {
      insurance = [
        {
          insuranceId: 8,
          carrier: 'ds',
          payerId: parseInt(this.state.primaryPayerId),
          payerName: this.state.primaryPayerName,
          policyId: parseInt(this.state.primaryPolicyId),
          policyHolder: this.state.primarypolicyHolder,
          insurancePayerTraceNumber: 'eedfg',
          planName: 'bxcb',
          groupName: 'sxvd',
          groupId: 1,
          isInNetwork: 1,
          effectiveDate: '2018-01-17',
          expirationDate: this.state.primaryExpirationDate,
          isExpired: 1,
          insurancePhone: '45352141',
          insuranceFax: '3243254',
          insuredName: this.state.primaryNameOfInsured,
          insuredDob: '2018-01-17',
          insuredSsn: 'adcdsafcd',
          insuranceType: 1,
          isEligible: 1,
          insuranceCategory: null,
          copayCoinsID: null,
          patientId: 'PAT2'
        }
      ]
    }
    const { navigate } = this.props.navigation
    var url =
      baseURL +
      '/api/PatientRegistrationData/updatePatientProfileForReceptionist'
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patientId: 'PAT2',
        mobilePhoneNo: this.state.mobileNumber,
        emergencyContactNo1: '54654674',
        emergencyContactNo2: '54654674',
        emergencyContactNo3: '54654111',
        emergencyContactName1: 'fesfe',
        emergencyContactName2: 'fesdasfe',
        emergencyContactName3: 'fdd',
        email: this.state.emailId,
        relationship1: 'dssf',
        relationship2: 'dsf',
        addressId: 59,
        address1: this.state.address,
        city: 'fsdf',
        state: 'fesdasfe',
        country: 'ffffffff',
        zip: 111222,

        insurance: insurance
      })
    })
      .then(Response => Response.json())
      .then(result => {
        navigate('Login')
      })
  }
  clear = () => {
    this.setState({ visible: false })
  }
  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <View style={styles.container}>
          <Swiper style={styles.wrapper}>
            <View style={styles.slide1}>
              <View style={styles.flexcontainer}>
                <View>
                  <Image
                    style={{
                      marginTop: 40,
                      width: 100,
                      height: 100,
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: '#fff',
                      display:
                        this.state.picture !== null && this.state.picture !== ''
                          ? 'flex'
                          : 'none',
                      alignSelf: 'center'
                    }}
                    source={{
                      uri:
                        this.state.picture !== null && this.state.picture !== ''
                          ? this.state.picture
                          : 'https://www.google.co.in/search?q=gravatar&rlz=1C1CHBD_enIN781IN781&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjvk4y79cvdAhWPTn0KHU3-BFwQ_AUIDigB&biw=1242&bih=597#imgrc=c4p8oAdPwQXIYM:'
                    }}
                  />

                  <View
                    style={{
                      marginTop: 40,
                      width: 100,
                      height: 100,
                      marginRight: 30,
                      marginLeft: 10,
                      position: 'absolute',
                      borderRadius: 100,
                      borderWidth: 2,
                      display:
                        this.state.picture === null || this.state.picture === ''
                          ? 'flex'
                          : 'none',
                      backgroundColor: '#ffffff',
                      borderColor: '#fff',
                      alignSelf: 'center'
                    }}
                  >
                    <Text
                      style={{
                        color: '#71b2f4',
                        fontSize: 59,
                        textAlign: 'center'
                      }}
                    >
                      {this.state.name.charAt(0)}
                    </Text>
                  </View>
                  <Text style={styles.text}>{this.state.name}</Text>
                </View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Patient Id</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{this.state.patientId}</Text>
                <TouchableOpacity onPress={this.edit}>
                  <FontAwesome
                    style={{ fontSize: 24, color: '#000', marginLeft: 5 }}
                  >
                    {Icons.edit}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Blood Group</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{this.state.bloodGroup}</Text>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>SSN</Text>
                <Text style={styles.colonStyle}>:</Text>
                <Text style={styles.valueStyle}>{this.state.ssn}</Text>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Email Id</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editEmail()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Mobile Number</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editMobile()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Address</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editAddress()}</View>
              </View>
            </View>
            <View style={styles.slide2}>
              <View>
                <Text style={styles.headerStyle}>
                  Primary Insurance Details
                </Text>
                <Divider style={{ backgroundColor: '#00000099' }} />
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Payer Name</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editPrimaryPayerName()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Payer Id</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editPrimaryPayerId()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Expiration Date</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editPrimaryExpirationDate()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Policy Holder</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editPrimarypolicyHolder()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Policy Id</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editPrimaryPolicyId()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.textStyle}>Name of Insured</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editPrimaryNameOfInsured()}</View>
              </View>
            </View>
            <View style={styles.slide3}>
              <View>
                <Text style={styles.headerStyle}>
                  SECONDARY INSURANCE DETAILS
                </Text>
                <Divider style={{ backgroundColor: '#00000099' }} />
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.primaryText}>Payer Name</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editSecondaryPayerName()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.primaryText}>Payer Id</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editSecondaryPayerId()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.primaryText}>Expiration Date</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editSecondaryExpirationDate()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.primaryText}>Policy Holder</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editSecondarypolicyHolder()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.primaryText}>Policy Id</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editSecondaryPolicyId()}</View>
              </View>
              <View style={styles.contentMainView}>
                <Text style={styles.primaryText}>Name of Insured</Text>
                <Text style={styles.colonStyle}>:</Text>
                <View>{this.editSecondaryNameOfInsured()}</View>
              </View>
              <View style={styles.rowStyle}>
                <View style={styles.secButtonViewSkip}>
                  <TouchableOpacity
                    style={styles.secButtonSkip}
                    onPress={this.clear.bind(this)}
                    underlayColor='#fff'
                  >
                    <Text style={styles.secureTextSkip}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.secButtonViewSkip}>
                  <TouchableOpacity
                    style={styles.secButtonSkip}
                    onPress={this.UpdatePatientInfo.bind(this)}
                    underlayColor='#fff'
                  >
                    <Text style={styles.secTextRegister}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Swiper>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 667,
    width: 420,
    position: 'absolute',
    backgroundColor: '#F5F5F5'
  },
  slide2: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  slide3: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },

  secButtonViewSkip: {
    width: '44%',
    paddingTop: 5,
    alignSelf: 'center'
  },
  secButtonSkip: {
    marginTop: 5,
    height: 40,
    backgroundColor: '#1B81E5',
    borderRadius: 5
  },
  secureTextSkip: {
    padding: 5,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  secButtonViewRegister: {
    width: '44%',
    paddingTop: 5,
    alignSelf: 'center'
  },
  secButtonRegister: {
    height: 40,
    backgroundColor: '#1B81E5',
    borderRadius: 5
  },
  secTextRegister: {
    padding: 5,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    flex: 1,
    position: 'absolute'
  },
  flexcontainer: {
    backgroundColor: '#1E90FF',
    height: 200
  },

  text: {
    marginTop: 150,
    fontSize: 18,
    fontWeight: '300',
    color: '#ffffff',
    alignSelf: 'center'
  },
  primaryText: {
    fontSize: 18,
    width: 150
  },
  insureTextStyle: { fontSize: 18, width: 195, paddingLeft: 50 },
  insureTextElseStyle: { fontSize: 18, width: 195, paddingLeft: 60 },
  expireDate: { marginLeft: 4, width: 185 },
  textStyle: {
    fontSize: 18,
    color: '#808080',
    paddingLeft: 15,
    width: 150
  },
  colonStyle: { fontSize: 18, width: 5, fontWeight: '500' },
  valueStyle: { fontSize: 18, width: 195, paddingLeft: 60 },
  contentMainView: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10
  },
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 5
  }
})
