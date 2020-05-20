import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextField } from 'react-native-material-textfield'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import DatePicker from 'react-native-datepicker'
import { baseURL } from '../Utils/properties'
import styles from './Style'
export default class Insurance extends Component {
  static navigationOptions = {
    headerTintColor: '#fff',
    title: 'UPDATE PRIMARY INSURANCE ',
    headerStyle: {
      height: 50,
      backgroundColor: '#71B2F4'
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 20,
      marginRight: 50,
      alignSelf: 'center'
    },
    headerRight: (
      <FontAwesome style={{ fontSize: 24, color: '#fff', marginRight: 20 }}>
        {Icons.edit}
      </FontAwesome>
    )
  }
  constructor (props) {
    super(props)
    this.state = {
      payerName: '',
      payerId: '',
      policyName: '',
      policyId: '',
      disabled: true,
      relationship: '',
      expirationDate: '',
      nameOfInsured: ''
    }
  }
  edit () {
    this.setState({ disabled: false })
  }
  UpdatePrimaryInsuranceInfo = () => {
    var Details = []
    const { navigate } = this.props.navigation
    Details = [
      {
        nameOfInsured: this.state.nameOfInsured,
        expirationDate: this.state.expirationDate,
        relationship: this.state.relationship,
        policyId: this.state.policyId,
        payerName: this.state.payerName,
        payerId: this.state.payerId,
        policyName: this.state.policyName
      }
    ]
    navigate('UpdateSecondaryInsurance', { Details: Details })
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
            disabled={this.state.disabled}
            value={this.state.payerName}
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
              confirmBtnText='Confirm'
              disabled={this.state.disabled}
              cancelBtnText='Cancel'
              onDateChange={date => {
                this.setState({ expirationDate: date })
              }}
              value={this.state.expirationDate}
            />
          </View>
          <TextField
            label='Policy Name '
            disabled={this.state.disabled}
            value={this.state.policyName}
            onChangeText={text => this.setState({ policyName: text })}
          />
          <TextField
            label='Policy Id'
            disabled={this.state.disabled}
            value={this.state.policyId}
            onChangeText={text => this.setState({ policyId: text })}
          />
          <TextField
            label='Name of Insured '
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
        </View>
        <View style={{ paddingLeft: 60, paddingRight: 60 }}>
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
            onPress={() => navigate('UpdateSecondaryInsurance')}
            underlayColor='#fff'
          >
            <Text
              style={{
                fontSize: 25,
                color: '#fff',
                marginLeft: 20,
                marginRight: 20,
                paddingBottom: 5,
                textAlign: 'center'
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
