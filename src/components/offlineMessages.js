import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  Picker,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements'
import { AppointmentStatus } from '../Utils/commonConstants'
import { Avatar, List, ListItem, Divider, Badge } from 'react-native-elements'
import { baseURL } from '../Utils/properties'
import PureChart from 'react-native-pure-chart'
import IconBadge from 'react-native-icon-badge'
import Modal from 'react-native-modal'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import PatientId from './PatientId'
import StyledConstants from '../constants/styleConstants'
var patId = new PatientId(),
  noOfDoc = 0

import FontAwesome, { Icons, signOutAlt } from 'react-native-fontawesome'
import { scaledHeight } from '../Utils/Resolution'

export default class OfflineMessages extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerTintColor: '#fff',
      title: 'Messages',
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor: StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontWeight: '500',
        fontSize: 20,
        marginRight: 50,
        alignSelf: 'center'
      },
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <FontAwesome
                style={{
                  fontSize: 26,
                  color: 'white',
                  marginRight: 14,
                  marginLeft: 11,
                  marginTop: 5
                }}
              >
                {Icons.arrowLeft}
              </FontAwesome>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      patInfo: [],
      basicAppointmentDetails: {},
      notifications: [],
      sampleData: [],
      profile: [],
      visibleModal: null,
      vitalName: '',
      docNumber: 0,
      docAvailData: [],
      filterVisibility: false,
      docData: [],
      flag: 0,
      offSet: 0,
      dropDownErrorFlag: false,
      dropDownErrorMsg: ''
    }
    this.units = []
    this.appointmentStatus = ''
    this.quickData = []
    this.homeFlag = 0
  }

  componentDidMount () {
    this.docAvailabilityFetch()
  }

  payment = () => {
    this.setState({ visibleModal: null })
    const { navigate } = this.props.navigation
    navigate('Billing')
  }
  videoUrl = () => {
    this.setState({ visibleModal: null })
    const { navigate } = this.props.navigation
    navigate('VideoCall')
  }

  basicFetch = () => {
    const url =
      baseURL +
      '/api/PatientSummary/getPatientSummary?patientId=' +
      this.patientId
    const self = this
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (
          response.patientSummary &&
          response.patientSummary != null &&
          response.patientSummary.appointmentInfo != null
        ) {
          let appointmentStatus = ''
          const scheduledAppointments = response.patientSummary.appointmentInfo.filter(
            appointmentInfo => {
              appointmentStatus = appointmentInfo.appointmentStatus.enumValue
              return (
                appointmentStatus === AppointmentStatus.SCHEDULED &&
                Date.parse(appointmentInfo.appointmentDateTime) -
                  new Date().getTime() >=
                  0
              )
            }
          )
          const mostRecentScheduledAppointment =
            scheduledAppointments.length > 0
              ? scheduledAppointments[scheduledAppointments.length - 1]
              : {}
          this.setState({
            basicAppointmentDetails: mostRecentScheduledAppointment,
            profile: response.patientSummary.profilePictureInfo.picture
          })
        }
      })
      .catch(err => console.log(err))
  }
  docAvailabilityFetch = () => {
    const url =
      baseURL +
      '/api/DoctorAvailability/getDoctorAvailability?offset=' +
      this.state.offSet
    fetch(url)
      .then(response => response.json())
      .then(response => {
        let checkResponse = Object.keys(response.doctorAvailabilityResponse)
        if (checkResponse.includes('responseData')) {
          let docAvailData = []
          docAvailData.push(response.doctorAvailabilityResponse.responseData)
          noOfDoc = response.doctorAvailabilityResponse.responseData.noOfDoctors
          this.setState(
            {
              docAvailData: docAvailData
            },
            () => {}
          )
        } else if (checkResponse.includes('errorResponse')) {
          this.setState({ flag: 1 })
        } else {
          this.setState({ flag: 1 })
        }
      })
      .catch(err => console.log(err))
  }
  componentWillMount () {
    this.patientId = patId.putPatientId()
  }

  componentDidMount () {
    this.docAvailabilityFetch()
    this.basicFetch()
  }

  componentWillUnMount () {
    this.setState({ filterVisibility: false })
  }

  cancelFilter = () => {
    this.setState(
      {
        offSet: 0
      },
      () => {
        this.docAvailabilityFetch()
      }
    )
  }
  renderDocAvailability = () => {
    const state = this.state.offSet
    if (this.state.docAvailData.length !== 0 && this.state.flag === 0) {
      return (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginRight: 'auto'
              }}
            >
              <View
                style={{
                  display: this.state.offSet === 0 ? 'none' : 'flex'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.offSet > 0) {
                      this.setState({ offSet: state - 1 }, () => {
                        this.docAvailabilityFetch()
                      })
                    }
                  }}
                >
                  <FontAwesome
                    style={{
                      fontSize: scaledHeight(40),
                      color: StyledConstants.colors.primaryColor
                    }}
                  >
                    {Icons.angleLeft}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ alignItems: 'center', flex: 1, alignSelf: 'stretch' }}
            >
              <View style={{ flexDirection: 'row' }}>
                {this.avatarRendering()}
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.doctorStyle}>
                    Dr.{this.state.docAvailData[0].doctorName}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginLeft: 'auto'
              }}
            >
              <View
                style={{
                  display: this.state.offSet == noOfDoc - 1 ? 'none' : 'flex'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.offSet < noOfDoc) {
                      this.setState({ offSet: state + 1 }, () => {
                        this.docAvailabilityFetch()
                      })
                    }
                  }}
                >
                  <FontAwesome
                    style={{
                      fontSize: scaledHeight(40),
                      color: StyledConstants.colors.primaryColor
                    }}
                  >
                    {Icons.angleRight}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return <Text>Nothing to Display</Text>
    }
  }
  avatarRendering = () => {
    if (this.state.docAvailData.length !== 0) {
      if (
        this.state.docAvailData[0].profilePicture !== '' &&
        this.state.docAvailData[0].profilePicture !== null
      ) {
        return (
          <Image
            style={{
              width: scaledHeight(90),
              height: scaledHeight(90),
              //  borderRadius: 100,
              // marginHorizontal:'2%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center'
            }}
            source={{
              uri: this.state.docAvailData[0].profilePicture
            }}
          />
        )
      } else {
        return (
          <View
            style={{
              width: scaledHeight(90),
              height: scaledHeight(90),
              // borderRadius: 100,
              backgroundColor: StyledConstants.colors.primaryColor,
              marginHorizontal: '4%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: StyledConstants.colors.WHITE_COLOR,
                fontSize: scaledHeight(24),
                textAlign: 'center'
              }}
            >
              {this.state.docAvailData[0].doctorName.charAt(0)}
            </Text>
          </View>
        )
      }
    }
  }
  renderDocAvailability = () => {
    const state = this.state.offSet
    const { navigate } = this.props.navigation
    if (this.state.docAvailData.length !== 0 && this.state.flag === 0) {
      return (
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginRight: 'auto'
              }}
            >
              <View
                style={{
                  display: this.state.offSet === 0 ? 'none' : 'flex'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.offSet > 0) {
                      this.setState({ offSet: state - 1 }, () => {
                        this.docAvailabilityFetch()
                      })
                    }
                  }}
                >
                  <FontAwesome
                    style={{
                      fontSize: scaledHeight(40),
                      color: StyledConstants.colors.primaryColor
                    }}
                  >
                    {Icons.angleLeft}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  navigate('OfflineDetails')
                }}
              >
                {this.avatarRendering()}
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: scaledHeight(8)
                  }}
                >
                  <Text style={styles.doctorStyle}>
                    Dr.{this.state.docAvailData[0].doctorName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginLeft: 'auto'
              }}
            >
              <View
                style={{
                  display: this.state.offSet == noOfDoc - 1 ? 'none' : 'flex'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.offSet < noOfDoc) {
                      this.setState({ offSet: state + 1 }, () => {
                        this.docAvailabilityFetch()
                      })
                    }
                  }}
                >
                  <FontAwesome
                    style={{
                      fontSize: scaledHeight(40),
                      color: StyledConstants.colors.primaryColor
                    }}
                  >
                    {Icons.angleRight}
                  </FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return <Text>Nothing to Display</Text>
    }
  }
  avatarRendering = () => {
    if (this.state.docAvailData.length !== 0) {
      if (
        this.state.docAvailData[0].profilePicture !== '' &&
        this.state.docAvailData[0].profilePicture !== null
      ) {
        return (
          <Image
            style={{
              width: scaledHeight(45),
              height: scaledHeight(45),
              //  borderRadius: 100,
              marginHorizontal: '4%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center'
            }}
            source={{
              uri: this.state.docAvailData[0].profilePicture
            }}
          />
        )
      } else {
        return (
          <View
            style={{
              width: scaledHeight(45),
              height: scaledHeight(45),
              // borderRadius: 100,
              backgroundColor: StyledConstants.colors.primaryColor,
              marginHorizontal: '4%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: StyledConstants.colors.WHITE_COLOR,
                fontSize: scaledHeight(24),
                textAlign: 'center'
              }}
            >
              {this.state.docAvailData[0].doctorName.charAt(0)}
            </Text>
          </View>
        )
      }
    }
  }

  render () {
    const { navigate } = this.props.navigation

    const appointmentStatus =
      Object.keys(this.state.basicAppointmentDetails).length === 0
        ? ''
        : this.state.basicAppointmentDetails.appointmentStatus.enumValue
    let appointmentStatusColor = '#69F0AE'
    if (appointmentStatus === 'Scheduled' || appointmentStatus === 'Arrived') {
      appointmentStatusColor = '#90CAF9'
    } else if (
      appointmentStatus === 'Missed' ||
      appointmentStatus === 'Cancel'
    ) {
      appointmentStatusColor = '#E57373'
    }

    return (
      <View
        style={{
          backgroundColor: StyledConstants.colors.BACKGROUND_GRAY,
          height: '100%'
        }}
      >
        <ScrollView>
          <View style={{ marginTop: scaledHeight(20) }}>
            <Card containerStyle={styles.cardContainerStyle}>
              {this.renderDocAvailability()}
            </Card>

            {/* <Card
                containerStyle={{
                  marginLeft: scaledHeight(15),
                  marginTop: scaledHeight(20),
                  marginBottom: scaledHeight(10),
                  marginRight: scaledHeight(15),
                  height: scaledHeight(100),
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:StyledConstants.colors.GREEN
                }}
              >

                <View style={{height:scaledHeight(120),width:"100%", flexDirection:'row'}}>

              <View style={{ flexDirection:'column'}}>      
              <TouchableWithoutFeedback onPress={() => navigate('OfflineDetails')}>
                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={60}
                            // name="google-classroom"
                            name="message"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    
                    </View>
                </TouchableWithoutFeedback>

              

                </View>
               
                 <Text style={{marginTop:scaledHeight(20),marginLeft:'2%',marginRight:'2%',color:StyledConstants.colors.FONT_COLOR,fontSize:scaledHeight(14)}}>
                     {"Send an Messages to Dr.Justin"}</Text>
                </View>
               
              </Card>
              
              <Card
                containerStyle={{
                  marginLeft: scaledHeight(15),
                  marginTop: scaledHeight(20),
                  marginBottom: scaledHeight(10),
                  marginRight: scaledHeight(15),
                  height: scaledHeight(100),
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:StyledConstants.colors.GREEN
                }}
              >

                <View style={{height:scaledHeight(120),width:"100%", flexDirection:'row'}}>

              <View style={{ flexDirection:'column'}}>      
              <TouchableWithoutFeedback onPress={() => navigate('OfflineDetails')}>
                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={60}
                            // name="google-classroom"
                            name="message"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    
                    </View>
                </TouchableWithoutFeedback>

              

                </View>
               
                 <Text style={{marginTop:scaledHeight(20),marginLeft:'2%',marginRight:'2%',color:StyledConstants.colors.FONT_COLOR,fontSize:scaledHeight(14)}}>
                     {"Send an Messages to Dr.Justin"}</Text>
                </View>
               
              </Card> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slot: {
    backgroundColor: '#fff',
    // marginLeft: 15,
    height: scaledHeight(40),
    borderRadius: 4,
    // marginRight: 15,
    borderWidth: 0.5,
    justifyContent: 'center',
    marginTop: scaledHeight(30),
    marginBottom: scaledHeight(30),
    marginHorizontal: '4%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb'
  },
  headingLiner: {
    backgroundColor: StyledConstants.colors.BLACK,
    height: scaledHeight(1.5),
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(20),
    marginHorizontal: '4%'
  },
  cardContainerStyle: {
    marginHorizontal: '3%',
    height: scaledHeight(100),
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#8BC105'
  },
  contentContainer: {
    backgroundColor: StyledConstants.colors.BACKGROUND_GRAY,
    paddingHorizontal: '2%'
  },
  availabilityContainer: {
    marginTop: scaledHeight(30)
  },
  availabilityText: {
    fontSize: scaledHeight(18),
    color: StyledConstants.colors.primaryColor,
    marginHorizontal: '4%'
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000099',
    width: 200
  },
  iconPower: { fontSize: 16, color: 'red', marginRight: 20 },
  iconPowerOff: {
    fontSize: 26,
    marginTop: 3,
    color: '#fff',
    marginLeft: 20,
    marginRight: 20
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'segoe UI',
    textAlign: 'center',
    marginBottom: 13
  },
  doctorStyle: {
    color: StyledConstants.colors.primaryColor,
    fontSize: scaledHeight(18),
    paddingHorizontal: '2%',
    textAlign: 'left'
  },
  appointmentDateStyle: {
    fontSize: 40,
    textAlign: 'center',
    color: '#1E90FF'
  },

  appointmentDateStyle1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 3
  },
  availabilityContentStyle: {
    fontSize: scaledHeight(14),
    color: StyledConstants.colors.ORANGE
    // marginTop: 5,
    // marginLeft: 3
  },
  pendingAmountValue: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 4,
    color: '#1E90FF'
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  modaltext: {
    fontSize: 20,
    alignSelf: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalButton: {
    marginLeft: 120,
    marginRight: 120,
    backgroundColor: 'lightblue',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  secButtonViewSkip: {
    width: '80%',
    paddingTop: 20,
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
    fontSize: 20,
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
  dropDownTextName: {
    color: StyledConstants.colors.FONT_COLOR,
    fontSize: scaledHeight(14),
    fontWeight: 'normal',
    marginLeft: '0%',
    marginRight: '0%',
    marginTop: scaledHeight(30),
    paddingLeft: '0%',
    paddingRight: '0%'
  },
  contentImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    marginRight: 30,
    marginLeft: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#1B81E5',
    alignSelf: 'center'
  },
  doctorName: {
    color: '#2dc1b3',
    fontSize: 22
  },
  checkInDate: {
    fontSize: 16,
    color: '#32333192',
    fontWeight: '500',
    paddingTop: 12
  },
  purposeContainer: { flexDirection: 'row' },
  purpose: {
    fontSize: 16,
    paddingTop: 12,
    color: '#00000099'
  },
  purposeValues: {
    fontSize: 16,
    paddingTop: 12,
    color: '#32333192',
    fontWeight: '500'
  },
  siderIconMain: {
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 15
  },
  siderIcon: {
    fontSize: 30,
    color: '#00000099',
    alignItems: 'flex-end'
  },
  secTextRegister: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
})
