import Autocomplete from 'react-native-autocomplete-input'
import React, { Component } from 'react'
import {
  StyleSheet,
  Button,
  Text,
  KeyboardAvoidingView,
  Picker,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal'
import { baseURL } from '../Utils/properties'
import moment from 'moment'
import PatientId from './PatientId'
import AnimationButton from './AnimationButton'
import { Dropdown } from 'react-native-material-dropdown'
import DropdownAlert from 'react-native-dropdownalert'
import { Card, SearchBar } from 'react-native-elements'

var slotLength = {},
  timeSlot = {},
  dataSlot = [],
  doctorId,
  bookedSlotDate = [],
  selectTime,
  onBookSlots = [],
  listOfSlotData = [],
  doctorSearchId = {}
const listofMinData = ['00', '15', '30', '45']
var appointmentDateTime, time, period
let curDate = moment().format('YYYY-MM-DD'),
  maxDate
let curHour = moment().format('HH')
var patId = new PatientId()
export default class PreRegAppointment extends Component {
  static renderdoctor (doctor) {
    const { doctorName, doctorId, departmentId } = doctor
    doctorSearchId = doctor.doctorId
    departmentSearchId = doctor.departmentId
  }
  constructor (props) {
    super(props)
    this.state = {
      listofDoctor: [],
      doctorSearchValue: '',
      doctorId: [],
      purpose: '',
      time: '',
      date: '',
      slot: '',
      appointmentTime: '',
      departmentId: '',
      appointmentDateTime: '',
      doctorId: '',
      visibleModal: null,
      min: '',
      appType: 1,
      appTypeList: [],
      selectedKey: '',
      status: false,
      isVisible: false,
      dropFlag: false,
      regDetails: this.props.navigation.state.params.personalDetails,
      doctorList: [],
      doctorDetailsValues: [],
      searchValue: '',
      flag: true
    }
    //  this.appTypeList = [];
  }
  componentWillMount () {
    this.patientId = patId.putPatientId()
    this.appoinmentLimit()
    this.fetchAppointmentTypes()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.patientId = patId.putPatientId()
    }
  }
  appoinmentLimit = () => {
    var limitArr = []
    var limitObj = '',
      limit = ''
    var url = baseURL + '/api/AdminUser/getAppointmentSetting'
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.appointmentSettingResponse.responseData) {
          limitArr = response.appointmentSettingResponse.responseData
          limitArr.forEach(function (data) {
            limitObj = data.value
            limit = limitObj - 1
          })
          curDate = moment().format('YYYY-MM-DD')
          maxDate = moment(curDate)
            .add(limit, 'day')
            .format('YYYY-MM-DD')
        }
      })
  }
  fetchAppointmentTypes = () => {
    var url =
      baseURL +
      '/api/AppointmentsData/getAppointmentSubType?fieldType=VisitStatus'
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.appointmentSubTypeResponse.responseData) {
          let responseList = response.appointmentSubTypeResponse.responseData
          if (responseList.length > 0) {
            this.setState({ appTypeList: responseList })
          }
        }
      })
  }
  bookAppointment = () => {
    appointmentDateTime = ''
    const { navigate } = this.props.navigation
    var minutes = parseInt(this.state.min.substring(3, 5))
    var minutes = minutes < 10 ? '0' + minutes : minutes
    // let age;
    // let ageProps = this.state.regDetails.dob;
    // let patientDob = ageProps;
    // let curDate = new Date();
    // patientDob = new Date(patientDob);
    // let month = curDate.getMonth() - patientDob.getMonth();
    // let year = curDate.getFullYear() - patientDob.getFullYear();
    // if (month < 0) {
    //   year = year - 1;
    //   month = 12 + month;
    // }
    // if (year === 0) {
    //   month = month;
    //   age = month + " months";
    // } else {
    //   age = year + " yrs";
    // }

    let datepic = this.state.date.split('-')
    var test = new Date(
      parseInt(datepic[0]),
      parseInt(datepic[1]) - 1,
      parseInt(datepic[2]),
      parseInt(time),
      parseInt(minutes)
    )
    appointmentDateTime = moment(test).format()
    var url = baseURL + '/api/preRegistration/createPreregistration'
    let appointmentObj = {
      firstName: this.state.regDetails.name,
      lastName: this.state.regDetails.lName,
      middleName: '',
      age: this.state.regDetails.age,
      gender: this.state.regDetails.gender,
      mobNo: this.state.regDetails.mobile,
      referralDoctorName: '',
      bloodGroup: '',
      patientType: 6,
      status: 9,
      departmentId: departmentSearchId,
      dob: this.state.regDetails.dob,
      maritalStatus: 1,
      idProof: this.state.regDetails.idProofType,
      proofIdNo: this.state.regDetails.idProofValue,
      doctorId: doctorSearchId,
      paymentType: '',
      email: this.state.regDetails.email,
      appointmentDateTime: appointmentDateTime,
      appointmentType: this.state.appType,
      appointmentNotes: this.state.purpose,
      isVideoCall: 0,
      isWalkIn: 0
    }
    console.log('appointmentObj:', appointmentObj)
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointmentObj)
    })
      .then(Response => Response.json())
      .then(Response => {
        if (
          Object.keys(Response.registrationResponse).includes('responseData')
        ) {
          this.setState({ selectedKey: '', slot: '', searchValue: '' })
          doctorSearchId = ''
          departmentSearchId = ''
          navigate('Login')
        }
      })
  }
  bookSlot (status, key, value) {
    this.setState(
      {
        selectedKey: key,
        slot: status ? value : '',
        isVisible: false,
        dropFlag: false
      },
      () => {
        this.forceUpdate()
      }
    )
    var selectTime,
      onBookSlots = [],
      bookedSlotsminute = []
    listOfSlotData = []
    let curMin = Math.ceil(moment().format('mm') / 15) * 15
    let curHour = moment().format('HH')
    let appDateTime = moment(this.state.date).format('YYYY-MM-DD')
    let timeCheck = this.timeChangeFunction(value)
    let curDate = moment().format('YYYY-MM-DD')
    if (status) {
      if (curDate == appDateTime && curHour > timeCheck) {
        this.setState({ dropFlag: true, visibleModal: null })
        this.showAlert('info', 'Invalid Slot', 'Cannot select past time')
      }
      time = parseInt(value.substring(0, 2))
      period = value.substring(2)
      if (period == 'PM') {
        time = time + 12
      }
      selectTime = parseInt(value.substring(0, 2))
      if (bookedSlotDate.length == 0) {
        // let listOfMinuteSlots = [];
        listOfSlotData = []
        var listOfMinuteSlots = listofMinData
        listOfMinuteSlots.forEach(function (iter) {
          var minuteSlots = {}
          minuteSlots['value'] = selectTime + ':' + iter
          if (curDate == appDateTime) {
            if (curHour == time) {
              if (curMin <= iter) {
                listOfSlotData.push(minuteSlots)
              }
            } else if (curHour < time) {
              listOfSlotData.push(minuteSlots)
            }
          } else {
            listOfSlotData.push(minuteSlots)
          }
        })
      } else {
        bookedSlotDate.forEach(function (onBookSlots) {
          if (moment(onBookSlots).format('HH') == time) {
            bookedSlotsminute.push(
              moment(onBookSlots).format('mm') < 10
                ? moment(onBookSlots).format('mm') + '0'
                : moment(onBookSlots).format('mm')
            )
          }
        })
        if (bookedSlotsminute.length == 0) {
          // let listOfMinuteSlots = [];
          listOfSlotData = []
          var listOfMinuteSlots = listofMinData
          listOfMinuteSlots.forEach(function (iter) {
            var minuteSlots = {}
            minuteSlots['value'] = selectTime + ':' + iter
            if (curDate == appDateTime) {
              if (curHour == time) {
                if (curMin <= iter) {
                  listOfSlotData.push(minuteSlots)
                }
              } else if (curHour < time) {
                listOfSlotData.push(minuteSlots)
              }
            } else {
              listOfSlotData.push(minuteSlots)
            }
          })
        } else {
          let listofMin = []
          listOfSlotData = []
          for (var i = 0; i < listofMinData.length; i++) {
            if (!JSON.stringify(bookedSlotsminute).includes(listofMinData[i])) {
              listofMin.push(listofMinData[i])
            }
          }
          listofMin.forEach(function (iter) {
            var minuteSlots = {}
            minuteSlots['value'] = selectTime + ':' + iter
            if (curDate == appDateTime) {
              if (curHour == time) {
                if (curMin <= iter) {
                  listOfSlotData.push(minuteSlots)
                }
              } else if (curHour < time) {
                listOfSlotData.push(minuteSlots)
              }
            } else {
              listOfSlotData.push(minuteSlots)
            }
          })
        }
      }
    }
  }
  appointmentDateInfo (date) {
    this.setState({ date: date }, () => {
      var doctorList = [],
        timeSlot = [],
        bookedSlottime = []
      var url =
        baseURL +
        '/api/DoctorAvailability/AvailabilityData?doctorId={"doctorList":[' +
        doctorSearchId +
        ']}&appointmentDate=' +
        this.state.date
      fetch(url)
        .then(response => response.json())
        .then(jsonData => {
          if (jsonData.availabilityDataResponse.length > 0) {
            jsonData.availabilityDataResponse.forEach(function (data) {
              var doctorId = Object.keys(data)
              var doctordetails = Object.keys(data[doctorId])
              var patientSchedule = data[doctorId].patient_Schedule
              patientSchedule.forEach(function (Slot) {
                availableTimeSlots = Object.keys(Slot)
                var bookedSlotInfo = Slot[availableTimeSlots]
                var lengthOfBookedSlots = bookedSlotInfo.length
                if (lengthOfBookedSlots < 4) {
                  timeSlot[availableTimeSlots] = lengthOfBookedSlots
                }
                if (lengthOfBookedSlots > 0) {
                  bookedSlotInfo.forEach(function (bookedSlot) {
                    bookedSlottime.push(bookedSlot.appointmentDateTime)
                  })
                }
              })
              dataSlot = Object.keys(timeSlot)
            })
            bookedSlotDate = []
            bookedSlottime.forEach(function (bookedSlotcount) {
              bookedSlotDate.push(
                moment(bookedSlotcount).format('YYYY-MM-DDTHH:mmZZ')
              )
            })
            this.setState({ visibleModal: 1 })
          }
        })
    })
  }
  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.modalButton}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  )
  purpos = text => {
    this.setState({ purpose: text })
  }
  timeChangeFunction = selectedHours => {
    var slotTimeStr = ''
    var slotTime = selectedHours.split(' ')
    if (slotTime[1] == 'PM' && slotTime[0] !== '12') {
      slotTime[0] = parseInt(slotTime[0]) + 12
    } else if (parseInt(slotTime[0]) < 10) {
      slotTime[0] = '0' + parseInt(slotTime[0])
    }
    slotTimeStr = String(slotTime[0])
    return slotTimeStr
  }
  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message)
  }
  modalSlots () {
    let _this = this
    let minute = this.state.min.split(':')
    let curDate = moment().format('YYYY-MM-DD'),
      appDateTime = moment(this.state.date).format('YYYY-MM-DD')
    let curHour = moment().format('HH')
    var slots = dataSlot
    var dataslotvalue = []
    var slotsarr = Object.keys(slots).map(function (k) {
      var slotTime = _this.timeChangeFunction(slots[k])
      dataslotvalue.push(
        <View key={k}>
          <AnimationButton
            countCheck={0}
            selectedKey={k}
            buttonStyle={{
              width: 90,
              margin: 10,
              marginLeft: 45,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
              borderColor: '#0066ff',
              borderWidth: 1,
              paddingLeft: 10,
              backgroundColor:
                _this.state.selectedKey == k
                  ? curDate == appDateTime && curHour > slotTime
                    ? '#0066ff'
                    : '#0066ff'
                  : 'white',
              borderRadius: 8
            }}
            textStyle={{
              color: _this.state.selectedKey == k ? 'white' : '#696969',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
            effect={'pulse'}
            text={dataSlot[k]}
            _onPress={(status, selkey) => {
              _this.bookSlot(status, selkey, dataSlot[k])
            }}
          />
        </View>
      )
    })
    return dataslotvalue
  }
  renderModalContent () {
    return (
      <View>
        <View style={styles.modalContent}>
          <Text style={styles.modaltext}>Choose a Slot</Text>
          <View style={styles.wrap}>{this.modalSlots()}</View>
          {this.renderButton('Book', () => {
            this.setState({ visibleModal: null })
          })}
        </View>
      </View>
    )
  }
  doctorSearch = doctorSearchValue => {
    this.setState({
      searchValue: doctorSearchValue,
      doctorSearchValue,
      flag: false
    })
    var listofDoctor = []
    var url = baseURL + '/api/Staffs/getDoctorListWithDepartment'
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response.doctorList && response.doctorList.length > 0) {
          listofDoctor = response.doctorList.map(user => ({
            doctorName: user.doctorName,
            doctorId: user.doctorId,
            departmentId: user.departmentId,
            departmentName: user.departmentName,
            picture: user.picture
          }))

          this.setState({ listofDoctor })
          this.arrayholder = this.state.listofDoctor
          const newData = this.arrayholder.filter(item => {
            const itemData = item.doctorName.toUpperCase()
            const textData = doctorSearchValue.toUpperCase()
            return itemData.indexOf(textData) > -1
          })
          this.setState({ doctorDetailsValues: newData })
        }
      })
  }

  doctorSummary = ({ item }) => {
    var listofDoctors = []
    listofDoctors = item
    if (!item.length) {
      return (
        <View
          key={item}
          style={{ elevation: 1, marginTop: -5, backgroundColor: 'FFFF' }}
        >
          <TouchableOpacity
            onPress={() =>
              this.setState(
                {
                  searchValue: item.doctorName,
                  flag: true,
                  doctorDetailsValues: []
                },
                () => {
                  PreRegAppointment.renderdoctor(item)
                }
              )
            }
          >
            <Card containerStyle={{ padding: 6, borderRadius: 6 }}>
              <View style={styles.listStyles}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 15,
                    display: 'flex',
                    borderRadius: 100
                  }}
                  source={{
                    uri: item.picture
                  }}
                />
                <Text style={{ marginTop: -40, marginLeft: 100, fontSize: 18 }}>
                  Dr.{item.doctorName}
                </Text>
              </View>
              <View>
                <Text style={{ marginLeft: 120, marginTop: 5, fontSize: 16 }}>
                  {item.departmentName}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      )
    }
  }

  finddoctor (doctorSearchValue) {
    if (doctorSearchValue === '') {
      return []
    }
    const { listofDoctor } = this.state
    const regex = new RegExp(`${doctorSearchValue.trim()}`, 'i')
    return listofDoctor.filter(doctor => doctor.doctorName.search(regex) >= 0)
  }
  render () {
    const { doctorSearchValue } = this.state
    const listofDoctor = this.finddoctor(doctorSearchValue)
    const comp = (fetchDoctorName, onchangeDoctorName) =>
      fetchDoctorName.toLowerCase().trim() ===
      onchangeDoctorName.toLowerCase().trim()
    return (
      <View styles={{ backgroundColor: '#FFFF' }}>
        <KeyboardAwareScrollView styles={{ backgroundColor: '#FFFF' }}>
          <View style={styles.container}>
            <View
              style={{
                display: this.state.dropFlag ? 'flex' : 'none',
                backgroundColor: '#FFFF'
              }}
            >
              <DropdownAlert
                ref={ref => (this.dropdown = ref)}
                containerStyle={{
                  backgroundColor: 'red'
                }}
              />
            </View>

            <Text style={styles.label}>Doctor Name</Text>
            <View style={styles.searchBarStyle}>
              <SearchBar
                containerStyle={{
                  padding: 0,
                  borderRadius: 20,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 0.5
                }}
                inputStyle={{ backgroundColor: 'white' }}
                inputContainerStyle={{
                  backgroundColor: '#FFF',
                  borderRadius: 50,
                  height: 20
                }}
                placeholder='Search Doctor'
                onChangeText={doctorSearchValue =>
                  this.doctorSearch(doctorSearchValue)
                }
                autoCorrect={false}
                value={this.state.searchValue}
              />
              <FlatList
                data={this.state.doctorDetailsValues}
                renderItem={this.doctorSummary}
                keyExtractor={(item, index) => item.doctorName}
              />
            </View>
            <View style={styles.descriptionContainer} />
            <View display={this.state.flag ? 'flex' : 'none'}>
              <Text style={styles.datelabel}>Appointment Date and Time</Text>
              <View>
                <DatePicker
                  style={styles.appDatePicker}
                  date={this.state.date}
                  minDate={curDate}
                  maxDate={maxDate}
                  mode='date'
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      backgroundColor: '#FFF',
                      borderRadius: 5
                    }
                  }}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  onDateChange={this.appointmentDateInfo.bind(this)}
                  value={this.state.date}
                />
                <Text style={styles.label}>
                  Appointment Slot {this.state.slot}
                </Text>
                <View style={styles.slot}>
                  <Dropdown
                    label={this.state.slot === '' ? 'Select Slot' : ''}
                    containerStyle={{
                      height: 40,
                      paddingLeft: 10,
                      marginTop: 10,
                      paddingBottom: 20,
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#aaa',
                      borderRadius: 5
                    }}
                    inputContainerStyle={{
                      borderBottomColor: 'transparent',
                      justifyContent: 'center'
                    }}
                    data={listOfSlotData}
                    value={this.state.min}
                    onChangeText={text => this.setState({ min: text })}
                  />
                </View>
                <Text style={styles.label}>Appointment Type </Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={this.state.appType}
                    onValueChange={appType =>
                      this.setState({
                        appType
                      })
                    }
                    mode='dropdown'
                  >
                    {this.state.appTypeList.map((i, index) => (
                      <Picker.Item
                        key={index}
                        label={i.appointmentSubType}
                        value={i.appointmentSubTypeId}
                      />
                    ))}
                  </Picker>
                </View>
                <View>
                  <Modal
                    isVisible={this.state.visibleModal === 1}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutRight'}
                  >
                    {this.renderModalContent()}
                  </Modal>
                </View>
                <Text style={styles.label}>Purpose</Text>
                <KeyboardAvoidingView style={styles.purpose}>
                  <TextInput
                    style={styles.purposetext}
                    multiline={true}
                    textAlignVertical={'top'}
                    numberOfLines={5}
                    underlineColorAndroid='transparent'
                    onChangeText={this.purpos.bind(this)}
                    value={this.state.purpose}
                  />
                </KeyboardAvoidingView>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={this.bookAppointment.bind(this)}
                    underlayColor='#fff'
                  >
                    <Text style={styles.submitText}> Book </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  slot: {
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15
  },
  picker: {
    backgroundColor: '#fff',
    marginLeft: 15,
    height: 40,
    borderRadius: 5,
    marginRight: 15,
    borderWidth: 0.5,
    justifyContent: 'center'
  },
  datelabel: {
    marginTop: -20,
    fontSize: 16,
    fontWeight: '300',
    color: '#0066ff',
    marginRight: 30,
    fontWeight: '400',
    marginLeft: 15
  },
  iconPowerOff: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 20,
    marginRight: 20
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#0066ff',
    fontWeight: '400',
    marginLeft: 15,
    marginTop: 6.5,
    marginBottom: 6.5
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  modaltext: {
    fontSize: 18,
    alignSelf: 'center'
  },
  purposetext: {
    fontSize: 18,
    borderRadius: 5
  },
  button: {
    marginTop: 3,
    width: '60%',
    alignSelf: 'center',
    paddingBottom: 30
  },
  submitText: { marginLeft: 10, fontSize: 18, color: '#fff' },
  submit: {
    marginTop: 7.5,
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 5,
    paddingLeft: 40,
    height: 40,
    backgroundColor: '#1B81E5',
    borderRadius: 5
  },
  purpose: {
    marginLeft: 15,
    marginRight: 15,
    height: 70,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  searchBarStyle: {
    marginLeft: 10,
    flex: 0,
    marginRight: 10,
    padding: 0
  },
  autocompleteContainer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    paddingTop: 37.5,
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#000'
  },
  itemText: {
    fontSize: 18,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5F5F5',
    marginTop: 25
  },
  appointmentcontainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'column'
  },
  infoText: {
    textAlign: 'center'
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
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  appDatePicker: {
    width: '96%',
    paddingTop: 10,
    paddingLeft: 15
  }
})
