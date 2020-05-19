import React, { Component } from 'react'
import {
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Modal,
  WebView
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
      title: 'Payment Details',
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor: StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontSize: 20,
        // marginLeft: 70,
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
      visitDetailValues: [],
      showModal: true
    }
  }

  handleResponse = data => {
    const { navigate } = this.props.navigation;
    if (data.title === 'success') {
        navigate('Appointment',{pay: true});
    } else if (data.title === 'cancel') {
        navigate('Appointment',{pay : false});
    } else {
      return
    }
  }

  setGoBack = () => {
    const { navigate } = this.props.navigation
  this.setState({ showModal: false });
  navigate('Appointment');
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={{ backgroundColor: '#FFF' }}>

          <Modal
            visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
          >

            <TouchableOpacity style={{flexDirection:'row',flex:1, marginTop:scaledHeight(50)}} onPress={this.setGoBack}>
            <FontAwesome
              style={{
                fontSize: scaledHeight(20),
                color: StyledConstants.colors.primaryColor,
                marginRight: scaledHeight(14),
                marginLeft: scaledHeight(14)
              }}
            >
              {Icons.arrowLeft}
            </FontAwesome>
            <Text style={{fontSize:scaledHeight(20),color:StyledConstants.colors.primaryColor }}>Back</Text>
          </TouchableOpacity>
           

            <WebView
              source={{ uri: 'http://localhost:3001' }}
              onNavigationStateChange={data => this.handleResponse(data)}
              injectedJavaScript={`document.f1.submit()`}
            />
          </Modal>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: { backgroundColor: '#FFF' },
  visitDate: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: '#486D90',
    fontWeight: '900',
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
    color: '#486D90',
    textAlign: 'left',
    paddingTop: 5
  },
  label: {
    color: '#486D90',
    fontSize: 18,
    fontWeight: '800',
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
