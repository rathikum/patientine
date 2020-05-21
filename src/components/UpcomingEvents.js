import React, { Component } from 'react'
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Platform,
  Linking
} from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import {
  Avatar,
  List,
  Divider,
  ListItem,
  SearchBar,
  Badge,
  Card
} from 'react-native-elements'
import { Alert } from 'react-native'
import { AppointmentStatus } from '../Utils/commonConstants'
import moment from 'moment'
import PatientId from './PatientId'
import { baseURL } from '../Utils/properties'
import DocumentPicker from 'react-native-document-picker'
import { scaledHeight } from '../Utils/Resolution'
import StyledConstants from '../constants/styleConstants'

var DetailsOfBilling = []
var patId = new PatientId()
var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height
var color

const appointmentTypeIcon = {
  'Video Call': Icons.videoCamera,
  'Audio Call': Icons.phone,
  Consultation: Icons.hospitalO,
  'Evaluation:': Icons.hospitalO
}
const defaultAppointmentTypeIcon = Icons.hospitalO
const maxFileLimit = 10

export default class UpcomingEvents extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerTintColor: '#fff',
      title: 'Upcoming Events',
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor: StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontSize: 20,
        //  marginLeft: 90,
        alignSelf: 'center'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome
            style={{
              fontSize: scaledHeight(20),
              color: StyledConstants.colors.WHITE_COLOR,
              marginRight: scaledHeight(15),
              marginLeft: scaledHeight(15)
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
      billInfo: [],
      billDetailInfo: [],
      billingDetails: [],
      color: ['#E53935', '#E53935', '#E53935'],
      scheduledAppointments: [],
      selectedAppointmentType: ''
    }
  }

  componentWillMount () {
    this.patientId = patId.putPatientId()
  }

  componentDidMount () {
    this.basicFetch()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.patientId = patId.putPatientId()
    }
  }

  navigate = itemValues => {
    const { navigate } = this.props.navigation
    navigate('Procedure', { data: itemValues.billId })
  }

  renderItem = item => {
    let value = item.totalBilledAmount * 100
    let rem = value % 100
    let integer = parseInt(item.totalBilledAmount)
    return (
      <View key={item}>
        <TouchableOpacity onPress={() => this.navigate(item)}>
          <Card
            containerStyle={{
              padding: scaledHeight(6),
              borderRadius: 6
            }}
          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text
                    style={{
                      fontSize: scaledHeight(18),
                      color: StyledConstants.colors.FONT_COLOR,
                      marginTop: 5
                    }}
                  >
                    {moment(item.visitDate).format('ll')}
                    {'\n'}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: scaledHeight(5),
                      marginLeft: 100,
                      marginTop: scaledHeight(25)
                    }}
                  >
                    <Text
                      style={{
                        fontSize: scaledHeight(25),
                        marginLeft: scaledHeight(50)
                      }}
                    >
                      {'\u20B9' + integer + '.'}
                    </Text>
                    <Text style={{ fontSize: scaledHeight(20) }}>
                      {rem == 0 ? '00' : rem}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Badge
                  containerStyle={{
                    backgroundColor: '#aedd13',
                    height: scaledHeight(30),
                    width: scaledHeight(100),
                    paddingLeft: 0,
                    marginBottom: scaledHeight(5)
                  }}
                >
                  <Text
                    style={{
                      fontSize: scaledHeight(18),
                      marginTop: scaledHeight(3),
                      color: StyledConstants.colors.WHITE_COLOR
                    }}
                  >
                    {' Paid'}
                  </Text>
                </Badge>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    )
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
          const scheduledAppointments = response.patientSummary.appointmentInfo.filter(
            appointmentInfo => {
              const appointmentStatus =
                appointmentInfo.appointmentStatus.enumValue
              return (
                appointmentStatus === AppointmentStatus.SCHEDULED &&
                new Date(appointmentInfo.appointmentDateTime) -
                  new Date().getTime() >=
                  0
              )
            }
          )
          this.setState({
            scheduledAppointments: scheduledAppointments
          })
        }
      })
      .catch(err => console.log(err))
  }

  renderItems = item => {
    let value = item.totalBilledAmount * 100
    let rem = value % 100
    let integer = parseInt(item.totalBilledAmount)
    return (
      <View key={item}>
        <TouchableOpacity onPress={() => this.navigate(item)}>
          <Card
            containerStyle={{
              padding: 6,
              borderRadius: 6
            }}
          >
            <View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text
                    style={{
                      fontSize: scaledHeight(18),
                      color: '#efa41b',
                      marginTop: scaledHeight(18)
                    }}
                  >
                    {moment(item.visitDate).format('ll')}
                    {'\n'}
                  </Text>
                </View>
                <View>
                  <Text style={{ marginTop: scaledHeight(5), marginLeft: 100 }}>
                    <Text style={{ fontSize: scaledHeight(20) }}>
                      {'\u20B9' + integer}
                    </Text>
                    <Text style={{ fontSize: scaledHeight(18) }}>
                      {rem == 0 ? '00' : rem}
                    </Text>
                  </Text>
                </View>
              </View>
              <View>
                <Badge
                  containerStyle={{
                    backgroundColor: '#aedd13',
                    height: scaledHeight(30),
                    width: scaledHeight(100),
                    paddingLeft: 0,
                    marginBottom: scaledHeight(5)
                  }}
                >
                  <Text style={{ fontSize: scaledHeight(18) }}>
                    {'Pending'}
                  </Text>
                </Badge>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  BillingSubDetails = values => {
    const { navigate } = this.props.navigation
    var visitValues = Object.keys(values)
    let dec = values.totalBilledAmount

    if (values.paymentStatus == 1) {
      return this.renderItem(values)
    } else {
      return this.renderItems(values)
    }
  }

  dialCall = () => {
    let phoneNumber = ''

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1456789023}'
    } else {
      phoneNumber = 'telprompt:${1456789023}'
    }

    Linking.openURL(phoneNumber)
  }

  renderAppointmentCards = () => {
    const { navigate } = this.props.navigation
    const { scheduledAppointments } = this.state
    if (scheduledAppointments.length === 0) {
      return (
        <Card
          containerStyle={{
            marginLeft: '3%',
            marginTop: scaledHeight(30),
            marginBottom: scaledHeight(10),
            marginRight: '3%',
            height: 100,
            margin: 0,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#8BC105'
          }}
        >
          <Text
            style={{
              marginTop: '4%',
              marginLeft: '2%',
              flexShrink: 1,
              color: StyledConstants.colors.FONT_COLOR,
              fontSize: scaledHeight(18)
            }}
          >
            No appointments scheduled yet.
          </Text>
        </Card>
      )
    }
    return scheduledAppointments.map(function (appointment) {
      const doctorName =
        'Dr.' + appointment.doctor.firstName + ' ' + appointment.doctor.lastName
      const appointmentTime = new Date(
        appointment.appointmentDateTime
      ).toLocaleString()
      const appointmentType = appointment.visitType.enumValue
      return (
        <Card
          containerStyle={{
            marginLeft: '3%',
            marginTop: scaledHeight(30),
            marginBottom: scaledHeight(10),
            marginRight: '3%',
            height: 100,
            margin: 0,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#8BC105'
          }}
        >
          <View style={{ height: 200, width: '100%', flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={appointmentType => {
                // TODO depending on appointment type, it should invoke video/audio or nothing.
                Linking.openURL("https://demo.patientine.com/client/?id=100001&&Fid=Video-Call-Robert-15"
                // this.getVideoURL(n.doctorName, n.doctorId)
              )
              }}
            >
              <FontAwesome
                style={{
                  fontSize: scaledHeight(60),
                  color: StyledConstants.colors.primaryColor,
                  marginRight: scaledHeight(15),
                  marginLeft: scaledHeight(15)
                }}
              >
                {appointmentTypeIcon[appointmentType] ||
                  defaultAppointmentTypeIcon}
              </FontAwesome>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: '4%',
                marginLeft: '2%',
                flexShrink: 1,
                color: StyledConstants.colors.FONT_COLOR,
                fontSize: scaledHeight(18)
              }}
            >
              {`${doctorName} on ${appointmentTime} `}
            </Text>
          </View>
        </Card>
      )
    })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View
        style={{
          backgroundColor: StyledConstants.colors.WHITE_COLOR,
          height: '100%'
        }}
      >
        <ScrollView>
          <View>
            {}

            {/* <Card
                containerStyle={{
                  marginLeft: "3%",
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: "3%",
                  height: 100,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:"#8BC105" 
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Medications")}>
          <FontAwesome
            style={{
              fontSize: 60,
              color: "#33ACFF",
              marginRight: 14,
              marginLeft: 15
            }}
          >
            {Icons.envelope}
          </FontAwesome>
        </TouchableOpacity>
                 <Text style={{marginTop:'6%',marginLeft:'2%'}}>{"Send an Message to doctor"}</Text>
                </View>
              </Card>

              <Card
                containerStyle={{
                  marginLeft: "3%",
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: "3%",
                  height: 100,
                  margin: 0,
                  borderRadius: 5,
                  borderWidth:2 ,borderColor:"#8BC105" 
                }}
              >
                <View style={{height:200,width:"100%", flexDirection:'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate("Medications")}>
          <FontAwesome
            style={{
              fontSize: 60,
              color: "#33ACFF",
              marginRight: 14,
              marginLeft: 15
            }}
          >
            {Icons.wechat}
          </FontAwesome>
        </TouchableOpacity>
                 <Text style={{marginTop:'6%',marginLeft:'2%'}}>{"Do Message chat now"}</Text>
                </View>
        </Card> */}
            {this.renderAppointmentCards()}
            {/* <Card
              containerStyle={{
                marginLeft: '3%',
                marginTop: 30,
                marginBottom: 10,
                marginRight: '3%',
                height: 100,
                margin: 0,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#8BC105'
              }}
            >
              <View
                style={{ height: 200, width: '100%', flexDirection: 'row' }}
              >
                <TouchableOpacity>
                  <FontAwesome
                    style={{
                      fontSize: scaledHeight(60),
                      color: StyledConstants.colors.primaryColor,
                      marginRight: scaledHeight(15),
                      marginLeft: scaledHeight(15)
                    }}
                  >
                    {Icons.videoCamera}
                  </FontAwesome>
                </TouchableOpacity>
                <Text
                  style={{
                    marginTop: '4%',
                    marginLeft: '2%',
                    flexShrink: 1,
                    color: StyledConstants.colors.FONT_COLOR,
                    fontSize: scaledHeight(18)
                  }}
                >
                  {'Video call scheduled with Dr.Justin on 27/04/2020'}
                </Text>
              </View>
            </Card> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}
