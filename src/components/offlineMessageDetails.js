import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Picker,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  TextInput
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "react-native-elements";
import { AppointmentStatus } from "../Utils/commonConstants";
import { Avatar, List, ListItem, Divider, Badge } from "react-native-elements";
import { baseURL } from "../Utils/properties";
import PureChart from "react-native-pure-chart";
import IconBadge from "react-native-icon-badge";
import Modal from "react-native-modal";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import PatientId from "./PatientId";
import StyledConstants from "../constants/styleConstants";
var patId = new PatientId(),
noOfDoc = 0;

import FontAwesome, { Icons, signOutAlt } from "react-native-fontawesome";
import { scaledHeight } from "../Utils/Resolution";

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Send Offline Messages",
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor:StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontWeight: "500",
        fontSize: 20,
        marginRight: 50,
        alignSelf: "center"
      },
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <FontAwesome
                    style={{
                      fontSize: 26,
                      color: "white",
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
    };
  };
  constructor(props) {
    super(props);
    this.state = {
        messageText : ''
    };
  }





  messageTextMethod = (text)=>{
    this.setState({ messageText: text });

  }

  render() {
   
    return (
       
             <View
              style={{ 
                  backgroundColor: "white", 
                  flex:1, 
                  borderWidth:1 }}>
          <View style={{ flex:0.6,marginTop:scaledHeight(20)} }>
            <View style={{backgroundColor:StyledConstants.colors.GREEN,marginLeft:'4%',marginRight:"4%",height:scaledHeight(60),width:"92%", borderRadius:10,flexDirection:'row', borderColor:StyledConstants.colors.GREEN,borderWidth:2}}>
               <Text style={{marginTop:scaledHeight(20),fontWeight:'900',marginLeft:'2%',marginRight:'2%',color:StyledConstants.colors.FONT_COLOR,fontSize:scaledHeight(14)}}>
                     {"Hi Doctor"}
                </Text>
            </View>   
{this.state.draftText ? 
            <View style={{marginTop:scaledHeight(10),backgroundColor:StyledConstants.colors.GREEN,marginLeft:'4%',marginRight:"4%",height:scaledHeight(60),width:"92%", borderRadius:10,flexDirection:'row', borderColor:StyledConstants.colors.GREEN,borderWidth:2}}>
               <Text style={{marginTop:scaledHeight(20),fontWeight:'900',marginLeft:'2%',marginRight:'2%',color:StyledConstants.colors.FONT_COLOR,fontSize:scaledHeight(14)}}>
                     {this.state.draftText}
                </Text>
            </View> 
            : 
            <>
            </>
            }

          </View>

      <View style={{flex:0.2,flexDirection:'row',height:scaledHeight(40), width:"92%",marginLeft:'4%',marginRight:"4%"}}>
      
      <KeyboardAvoidingView style={{borderWidth:2,borderRadius:5,borderColor:'black',width:'94%'}}>
        
        <TextInput
          style={{
            fontSize: 18,
            borderRadius: 5
          }}
          multiline={true}
          textAlignVertical={"top"}
          numberOfLines={5}
          underlineColorAndroid="transparent"
          onChangeText={this.messageTextMethod}
          value={this.state.messageText}
        />
      </KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => this.setState({draftText:this.state.messageText,messageText:''})}>
                    <View style={{flexDirection:'row-reverse',marginRight:'2%'}}>
                        <MaterialIcon
                            size={30}
                            // name="google-classroom"
                            name="send"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    </View>
        </TouchableWithoutFeedback>
      </View>

          </View>
     
    );
  }
}


