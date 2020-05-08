import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextField} from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import {baseURL} from '../Utils/properties';
import styles from './Style';
export default class PrimaryInsurance extends Component {
  static navigationOptions = {
    headerTintColor: '#fff',
    title: 'Primary Insurance',
    headerStyle: {
      height: 50,
      backgroundColor: '#1B81E5',
    },
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 20,
      marginRight: 50,
      alignSelf: 'center',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      payerName: '',
      payerId: '',
      policyName: '',
      policyId: '',
      relationship: '',
      expirationDate: '',
      nameOfInsured: '',
      planName: '',
      effectiveDate: '',
      Details: this.props.navigation.state.params.personalDetails,
    };
  }
  primaryInsuranceInfo = () => {
    const {navigate} = this.props.navigation;
    this.state.Details.push({
      nameOfInsured: this.state.nameOfInsured,
      expirationDate: this.state.expirationDate,
      relationship: this.state.relationship,
      policyId: this.state.policyId,
      payerName: this.state.payerName,
      payerId: this.state.payerId,
      policyName: this.state.policyName,
      effectiveDate: this.state.effectiveDate,
      planName: this.state.planName,
    });
    navigate('SecondaryInsurance', {Details: this.state.Details});
  };
  render() {
    return (
      <KeyboardAwareScrollView
        behaviour="padding"
        style={styles.registercontainer}
      >
        <View style={styles.border}>
          <TextField
            style={styles.input}
            label="Payer Name "
            clearTextOnFocus={true}
            value={this.state.payerName}
            onChangeText={text => this.setState({payerName: text})}
          />

          <TextField
            label="Payer Id "
            clearTextOnFocus={true}
            value={this.state.payerId}
            onChangeText={text => this.setState({payerId: text})}
          />
          <View style={styles.row}>
            <Text style={styles.PrimaryInsuText}>Expiration Date</Text>
            <DatePicker
              style={styles.primaryInsuDatePicker}
              date={this.state.expirationDate}
              mode="date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                },
                dateIcon: {
                  width: 25,
                  paddingLeft: 7,
                  tintColor: '#00000099',
                  height: 25,
                },
              }}
              onDateChange={date => {
                this.setState({expirationDate: date});
              }}
              value={this.state.expirationDate}
            />
          </View>
          <TextField
            label="Policy Name "
            clearTextOnFocus={true}
            value={this.state.policyName}
            onChangeText={text => this.setState({policyName: text})}
          />

          <TextField
            label="Policy Id"
            clearTextOnFocus={true}
            value={this.state.policyId}
            onChangeText={text => this.setState({policyId: text})}
          />
          <View style={styles.row}>
            <Text style={styles.PrimaryInsuText}>Effective Date</Text>
            <DatePicker
              style={styles.primaryInsuDatePicker}
              date={this.state.effectiveDate}
              mode="date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                },
                dateIcon: {
                  width: 25,
                  paddingLeft: 7,
                  tintColor: '#00000099',
                  height: 25,
                },
              }}
              onDateChange={date => {
                this.setState({effectiveDate: date});
              }}
              value={this.state.effectiveDate}
            />
          </View>
          <TextField
            label="PlanName"
            clearTextOnFocus={true}
            value={this.state.planName}
            onChangeText={text => this.setState({planName: text})}
          />
          <TextField
            label="Name of Insured "
            clearTextOnFocus={true}
            value={this.state.nameOfInsured}
            onChangeText={text => this.setState({nameOfInsured: text})}
          />
          <TextField
            label="Relationship"
            clearTextOnFocus={true}
            value={this.state.relationship}
            onChangeText={text => this.setState({relationship: text})}
          />
          <View style={styles.submitcontainer}>
            <TouchableOpacity
              style={styles.submit}
              onPress={this.primaryInsuranceInfo.bind(this)}
              underlayColor="#fff"
            >
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>{'\n'}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
