import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  CheckBox,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'
import { Divider } from 'react-native-elements'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card, CardContent } from 'react-native-card-view'
import PatientId from './PatientId'
import { baseURL } from '../Utils/properties'
import FontAwesome, { Icons, signOutAlt } from 'react-native-fontawesome'
var patId = new PatientId()
export default class MedicationsCopy extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerTintColor: '#fff',
      title: 'Payment',
      headerStyle: {
        height: 50,
        backgroundColor: '#1E90FF'
      },
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: 70,
        alignSelf: 'center'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('VisitNote')}>
          <FontAwesome
            style={{
              fontSize: 20,
              color: 'white',
              marginRight: 14,
              marginLeft: 15
            }}
          >
            {Icons.arrowLeft}
          </FontAwesome>
        </TouchableOpacity>
      )
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      mor: false,
      noon: false,
      eve: false,
      night: false,
      patientId: '',
      prescriptionsArray: [],
      doctorName: '',
      activeSections: false
    }
  }
  componentWillMount () {
    this.patientId = patId.putPatientId()
    this.fetchPreviousPrescription()
  }

  renderHeader = () => {
    var headerPrescriptionArray = []
    let startDate = []
    let endDate = []
    let flag = 1
    if (this.state.prescriptionsArray.length > 0) {
      this.state.prescriptionsArray.forEach(function (prescriptionIns, i) {
        flag = flag > 3 ? 1 : flag
        if (flag > 3) {
        }
        let mealKey = ''
        if (prescriptionIns.withMeal == 1) {
          mealKey = 'Before Meal'
        } else if (prescriptionIns.withMeal == 0) {
          mealKey = 'After Meal'
        }

        startDate =
          prescriptionIns.effectiveStartDate != null
            ? prescriptionIns.effectiveStartDate.split('T')
            : ''
        endDate =
          prescriptionIns.expiryDate != null
            ? prescriptionIns.expiryDate.split('T')
            : ''
        headerPrescriptionArray.push(
          <View style={{ paddingTop: 7 }} key={{ i }}>
            <Collapse
              style={{
                marginBottom: 10,
                marginLeft: 15,
                marginRight: 15,
                width: '92%',
                paddingBottom: 10,
                paddingLeft: 10,
                borderColor: '#DCDCDC',
                borderRadius: 6,
                borderWidth: 1
              }}
            >
              <CollapseHeader
                style={{
                  paddingTop: 8
                }}
              >
                <View style={styles.medicamentDose}>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      marginLeft: 5,
                      marginRight: 5,
                      display: 'flex'
                    }}
                    source={
                      flag == 1
                        ? require('../images/pill2.png')
                        : flag == 2
                        ? require('../images/pill.png')
                        : require('../images/pill3.png')
                    }
                  />
                  <View style={styles.leftaligneditems}>
                    <Text
                      style={{
                        color: '#0066ff',
                        fontSize: 18
                      }}
                    >
                      {prescriptionIns.medicament != null &&
                        (prescriptionIns.medicament.length > 20
                          ? prescriptionIns.medicament.substring(0, 20) +
                            '\n' +
                            prescriptionIns.medicament.substring(21, 30)
                          : prescriptionIns.medicament)}
                    </Text>
                  </View>
                </View>
                <View style={styles.medicationdate}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: '#efa41b'
                      }}
                    >
                      Start Date:
                    </Text>
                    <Text
                      style={{
                        color: '#0066ff',
                        marginLeft: 5
                      }}
                    >
                      {moment(startDate[0]).format('MMM DD')}
                    </Text>
                  </View>
                  <View style={styles.rightaligneditems}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          color: '#efa41b'
                        }}
                      >
                        End Date:
                      </Text>
                      <Text
                        style={{
                          color: '#0066ff',
                          marginLeft: 5
                        }}
                      >
                        {moment(endDate[0]).format('MMM DD')}
                      </Text>
                    </View>
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.medicationdate}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: '#efa41b'
                      }}
                    >
                      Qty:
                    </Text>
                    <Text style={{ color: '#0066ff', marginLeft: 5 }}>
                      {prescriptionIns.quantityPerSession}
                    </Text>
                  </View>
                  <View style={styles.rightaligneditems}>
                    <Text
                      style={{
                        color: '#0066ff'
                      }}
                    >
                      {prescriptionIns.frequency}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: '#efa41b'
                      }}
                    >
                      Session:
                    </Text>
                    <Text
                      style={{
                        color: '#0066ff',
                        marginLeft: 5
                      }}
                    >
                      {prescriptionIns.morningSession}-
                      {prescriptionIns.noonSession}-
                      {prescriptionIns.nightSession}
                    </Text>
                  </View>
                  <View style={styles.rightaligneditems}>
                    <Text
                      style={{
                        backgroundColor: '#FFF',
                        color: '#0066ff'
                      }}
                    >
                      {mealKey}
                    </Text>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        )
        flag++
      })

      return headerPrescriptionArray
    }
  }
  // renderContent = () => {
  //   var contentPrescriptionArray = [];
  //
  //   if (this.state.prescriptionsArray.length > 0) {
  //     this.state.prescriptionsArray.forEach(function(prescriptionIns) {
  //       contentPrescriptionArray.push(<View />);
  //     });
  //     return contentPrescriptionArray;
  //   }
  //   this.setState({ contentPrescriptionArray: contentPrescriptionArray });
  // };

  // BodyFunc = () => {
  //   var headerPrescriptionObj = {};
  //   var contentPrescriptionObj = {};
  //   headerPrescriptionObj.push(this.state.headerPrescriptionArray);
  //   contentPrescriptionObj.push(this.state.contentPrescriptionArray);
  //   if (
  //     contentPrescriptionObj.prescriptionLineId ==
  //     headerPrescriptionObj.prescriptionLineId
  //   ) {
  //     this.renderContent();
  //   }
  // };
  fetchPreviousPrescription = () => {
    const self = this
    let array = []
    //TODO visitId make it dynamic
    const visitId = 1
    var url =
      baseURL +
      '/api/prescriptions/getPreviousPrescription/' +
      this.patientId +
      '/' +
      visitId
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let prescriptionsArray = []
        if (
          response.previousPrescription &&
          response.previousPrescription.length > 0
        ) {
          // response.previousPrescription.forEach(function(data) {
          const prescriptionHeader = response.previousPrescription
          // const doctorName = data.staffName;
          // const prescriptionSubData = data.prescriptionSubData;
          prescriptionHeader.forEach(function (header) {
            if (header.hasOwnProperty('prescriptionLine')) {
              header.prescriptionLine.forEach(function (prescLine) {
                let prescriptionsObj = {
                  prescriptionLineId: prescLine.prescriptionLineId,
                  medicament: prescLine.medicament,
                  //medicineFormKey: prescLine.medicineFormKey,
                  // dose: prescLine.dose,
                  // doseUnit: prescLine.doseUnit,
                  // doseUnitKey: prescLine.doseUnitKey,
                  effectiveStartDate: prescLine.effectiveStartDate,
                  expiryDate: prescLine.expiryDate,
                  // morningSessionKey: prescLine.morningSessionKey,
                  morningSession: prescLine.morningSession,
                  // noonSessionKey: prescLine.noonSessionKey,
                  noonSession: prescLine.noonSession,
                  // nightSessionKey: prescLine.nightSessionKey,
                  nightSession: prescLine.nightSession,
                  // withMealKey: prescLine.withMealKey,
                  withMeal: prescLine.withMeal,
                  // withoutMealKey: prescLine.withoutMealKey,
                  withoutMeal: prescLine.withoutMeal,
                  quantityPerSession: prescLine.quantityPerSession
                  // frequency: prescLine.frequency
                }
                prescriptionsArray.push(prescriptionsObj)
              })
            }

            //self.setState({ doctorName: doctorName });
            // });
          })
          this.setState({ prescriptionsArray: prescriptionsArray })
        }
      })
  }
  render () {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: '#FFF' }}>
        <View>{this.renderHeader()}</View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    position: 'absolute'
  },
  medicamentDose: { paddingTop: 10, flexDirection: 'row' },
  rightaligneditems: {
    paddingBottom: 4,
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 20
  },
  medicationdate: {
    flexDirection: 'row',
    paddingTop: 10
  }
})
