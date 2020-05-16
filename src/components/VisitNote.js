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
        fontSize: scaledHeight(20),
       //  marginLeft: scaledHeight(50),
        alignSelf: 'center'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            style={{
              fontSize: scaledHeight(20),
              color: StyledConstants.colors.WHITE_COLOR,
              marginRight: scaledHeight(14),
              marginLeft: scaledHeight(14)
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
              .format('MMMM YYYY')
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
                marginTop: scaledHeight(10),
                padding: scaledHeight(10),
                marginBottom: scaledHeight(10),
                borderRadius: 6,
                borderWidth: 2,
                borderColor: StyledConstants.colors.GREEN
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', flex: 0.8 }}>
                  <Text style={styles.doctorName}>
                    {' '}
                    Dr.{data.staff.firstName || data.staff.lastName}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 0.2 }}>
                  <Text style={styles.visitInfoStyle}>
                    {moment(data.checkIn).format('MMM DD')}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.label}>Visit Type : </Text>
                  <Text style={styles.value}>Consultation</Text>
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
                  {Object.keys(data.appointment).length > 0 &&
                    data.appointment.appointmentNotes}
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
    fontSize: scaledHeight(18),
    color: StyledConstants.colors.primaryColor,
    fontWeight: '700',
    marginLeft: '4%',
    marginTop: scaledHeight(20),
    marginBottom: scaledHeight(10)
  },
  cardContentMainView: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  visitNoteLink: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: '4%'
  },
  contentMain: {
    marginTop: scaledHeight(5)
  },
  doctorName: {
    color: StyledConstants.colors.primaryColor,
    fontSize: scaledHeight(18)
    // marginTop: 5,
    // marginLeft: 3
  },
  checkInDate: {
    fontSize: scaledHeight(1),
    fontWeight: '400',
    color: '#efa41b',
    textAlign: 'left',
    paddingTop: scaledHeight(5)
  },
  label: {
    color: StyledConstants.colors.primaryColor,
    fontSize: scaledHeight(18),
    fontWeight: '400',
    textAlign: 'left',
    paddingTop: scaledHeight(10)
    // marginLeft: 4
  },
  value: {
    color: StyledConstants.colors.primaryColor,
    fontSize: scaledHeight(18),
    fontWeight: '400',
    textAlign: 'left',
    paddingTop: scaledHeight(10)
    // marginLeft: 3
  },
  siderIconMain: {
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 5
  },
  visitInfoStyle: {
    fontSize: scaledHeight(14),
    // marginTop: 5,
    // marginLeft: 3,
    // paddingTop: scaledHeight(10),
    color: StyledConstants.colors.primaryColor
  },
  siderIcon: {
    fontSize: 30,
    color: '#86939e',
    alignItems: 'flex-end'
  }
})
