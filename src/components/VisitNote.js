import React, { Component } from 'react'
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { Card } from 'react-native-elements'
import moment from 'moment'
import { baseURL } from '../Utils/properties'
import PatientId from './PatientId'
import { scaledHeight } from '../Utils/Resolution'
import StyledConstants from '../constants/styleConstants'

var patId = new PatientId()
export default class VisitNote extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerTintColor: '#fff',
      title: 'Visits',
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor: StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontSize: 20,
        marginLeft: 70,
        alignSelf: 'center'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
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
      doctorName: '',
      date: '',
      purpose: '',
      visitDetailValues: []
    }
  }
  componentWillMount = () => {
    this.patientId = patId.putPatientId()
    let getMonths = []
    let listOfMonthInfo = []
    let listOfVisitDetails = []
    const url =
      baseURL +
      '/api/PatientSummary/getPatientSummary?patientId=' +
      this.patientId
    fetch(url)
      .then(response => response.json())
      .then(resultData => {
        if (resultData.patientSummary != null) {
          let monthVitalInfo = []
          let visitInfo = resultData.patientSummary.visitInfo
          for (let c = 0; c < visitInfo.length; c++) {
            let monthIdx = moment(visitInfo[c].checkIn)
              .format('MMMMYYYY')
              .toString()
            if (monthVitalInfo[monthIdx] == null) {
              monthVitalInfo[monthIdx] = []
            }
            monthVitalInfo[monthIdx].push(visitInfo[c])
          }
          //   if (
          //     c != visitInfo.length - 1 &&
          //     moment(visitInfo[c].checkIn)
          //       .format("MMMMYYYY")
          //       .toString() ===
          //       moment(visitInfo[c + 1].checkIn)
          //         .format("MMMMYYYY")
          //         .toString()
          //   ) {
          //     getMonths.push(visitInfo[c]);
          //   } else {
          //     let list = {};
          //     getMonths.push(visitInfo[c]);
          //     list[
          //       moment(getMonths[0].checkIn)
          //         .format("MMMM YYYY")
          //         .toString()
          //     ] = getMonths;
          //     listOfMonthInfo.push(list);
          //     getMonths = [];
          //   }
          // }
          // for (let i = 0; i < listOfMonthInfo.length; i++) {
          //   listOfVisitDetails.push(listOfMonthInfo[i]);
          // }
          this.setState({ visitDetailValues: monthVitalInfo })
        }
      })
  }
  visitSummary = () => {
    const listOfLabel = []
    const { visitDetailValues } = this.state
    Object.keys(visitDetailValues).forEach(visitMonth => {
      listOfLabel.push(
        <View key={visitDetailValues[visitMonth]}>
          <View>
            <Text style={styles.visitDate}>{visitMonth}</Text>
          </View>
          <View>{this.visitSummaryDetails(visitDetailValues[visitMonth])}</View>
        </View>
      )
    })

    return listOfLabel
  }
  visitSummaryDetails = values => {
    const { navigate } = this.props.navigation
    if (values.length > 0) {
      let listOfDetails = []
      values.forEach(function (data) {
        listOfDetails.push(
          <View key={data}>
            <Card
              containerStyle={{
                marginTop: 6,
                padding: 6,
                marginBottom: 10,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#8BC105'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.doctorName}>
                    {' '}
                    Dr.{data.staff.firstName || data.staff.lastName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 130 }}>
                  <Text style={styles.visitInfoStyle}>
                    {moment(data.checkIn).format('MMM DD')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Visit Type : </Text>
                  <Text style={styles.value}>Consulting</Text>
                </View>
                <View style={styles.visitNoteLink}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('VisitNoteDetails', { visitId: data.visitId })
                    }
                  >
                    <FontAwesome style={styles.siderIcon}>
                      {Icons.angleRight}
                    </FontAwesome>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.label}>Purpose : </Text>
                <Text style={styles.value}>
                  {/* {Object.keys(data.appointment).length > 0 &&
                    data.appointment.appointmentNotes} */}
                  Routine Cleaning
                </Text>
              </View>
            </Card>
          </View>
        )
      })
      return listOfDetails
    } else {
      ;<View>
        <Text>No Data to Display</Text>
      </View>
    }
  }
  render () {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={{ backgroundColor: '#FFF' }}>{this.visitSummary()}</View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: { backgroundColor: '#FFF' },
  visitDate: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: '#058BC1',
    fontWeight: '700',
    marginLeft: 15,
    marginTop: 7.5,
    marginBottom: 10
  },
  cardContentMainView: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  visitNoteLink: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 4
  },
  contentMain: {
    marginTop: 5
  },
  doctorName: {
    color: '#486D90',
    fontSize: 17,
    marginTop: 5,
    marginLeft: 3
  },
  checkInDate: {
    fontSize: 18,
    fontWeight: '400',
    color: '#efa41b',
    textAlign: 'left',
    paddingTop: 5
  },
  label: {
    color: '#486D90',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'left',
    paddingTop: 5,
    marginLeft: 4
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
    color: '#486D90',
    textAlign: 'left',
    paddingTop: 5,
    marginLeft: 3
  },
  siderIconMain: {
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 5
  },
  visitInfoStyle: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 3,
    color: '#486D90'
  },
  siderIcon: {
    fontSize: 30,
    color: '#86939e',
    alignItems: 'flex-end'
  }
})
