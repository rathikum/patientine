import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import IconBadge from "react-native-icon-badge";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Icons } from "react-native-fontawesome";
import StyledConstants from "../constants/styleConstants";
import { scaledHeight } from "../Utils/Resolution";

export default class HomePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTintColor: "#fff",
      title: "Home",
      headerStyle: {
        height: scaledHeight(50),
        backgroundColor:StyledConstants.colors.primaryColor
      },
      headerTitleStyle: {
        fontWeight: "500",
        fontSize: scaledHeight(20),
        alignSelf: "center"
      },
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <FontAwesome style={styles.iconPowerOff}>
                {Icons.powerOff}
              </FontAwesome>
            </TouchableOpacity>
          </View>
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnMount() {
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.availabilityContainer}>

           
              <View style={styles.menuContainer}>

              <TouchableWithoutFeedback onPress={() => navigate('Profile')}>
                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={60}
                            name="dashboard"
                            color={StyledConstants.colors.primaryColor}   
                        />
                        <Text style={styles.menuItemText}>Dashboard</Text>
                    </View>
                    </TouchableWithoutFeedback>

               

                <TouchableWithoutFeedback  onPress={() => navigate('Appointment')}>
                    <View style={styles.menuItems}>
                        <FontAwesome
                            size={60}
                            name="calendar"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    <Text style={styles.menuItemText}>Appointments</Text>
                    </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.menuContainer}>
                <TouchableWithoutFeedback  onPress={() => navigate('VisitNote')}>
                    <View style={styles.menuItems}>
                        <FontAwesome
                            size={60}
                            name="file-text-o"
                            color={StyledConstants.colors.primaryColor}   
                        />
                        <Text style={styles.menuItemText}>Visit Notes</Text>
                    </View>
                    </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigate('Billing')}>
                <View style={styles.menuItems}>
                    <MaterialCommunityIcons
                        size={60}
                        name="folder-upload"
                        color={StyledConstants.colors.primaryColor}   
                    />
                    <Text style={styles.menuItemText}>Image and Doc</Text>
                </View>
                </TouchableWithoutFeedback>
                
              </View>

              <View style={styles.menuContainer}>
                <TouchableWithoutFeedback onPress={()=>{navigate('UpComing')}}>
                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={60}
                            name="event"
                            color={StyledConstants.colors.primaryColor}   
                        />
                        <Text style={styles.menuItemText}>Upcoming Events</Text>
                    </View>
                    </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigate('VisitNoteDetails',{visitId : 3})}>
                    <View style={styles.menuItems}>
                        <MaterialCommunityIcons
                            size={60}
                            name="google-classroom"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    <Text style={styles.menuItemText}>Diagnosis</Text>
                    </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.menuContainer}>

              <TouchableWithoutFeedback  onPress={() => navigate('Notification')}>
                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={60}
                            name="notifications"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    <Text style={styles.menuItemText}>Notification</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigate('Online')}>

                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={60}
                            name="payment"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={styles.menuContainer}>
                
              {/*<TouchableWithoutFeedback  onPress={() => navigate('Profile')}>
                    <View style={styles.menuItems}>
                        <MaterialIcon
                            size={50}
                            name="developer-board"
                            color={StyledConstants.colors.primaryColor}   
                        />
                        <Text style={styles.menuItemText}>Onboarding</Text>
                    </View>
                    </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <View style={styles.menuItems}>
                        <FontAwesome
                            size={50}
                            name="users"
                            color={StyledConstants.colors.primaryColor}    
                        />
                    <Text style={styles.menuItemText}>E-Consultation</Text>
                    </View>
    </TouchableWithoutFeedback>*/}
              </View>


            
          </View>
        
          </View>
      </KeyboardAwareScrollView>
    );
  }
}


const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: StyledConstants.colors.BACKGROUND_GRAY,
  },
  headingLiner: {
    backgroundColor:  StyledConstants.colors.BLACK,
    height: scaledHeight(1.5),
    marginTop: scaledHeight(10),
    marginBottom: scaledHeight(20),
    marginHorizontal:'4%'
  },
  
  contentContainer:{
    backgroundColor:StyledConstants.colors.BACKGROUND_GRAY,
    paddingHorizontal:"4%",

  },
  availabilityContainer:{
    marginTop:scaledHeight(10)
  },
  iconPowerOff: {
    fontSize: scaledHeight(20),
    marginTop: scaledHeight(3),
    color: StyledConstants.colors.WHITE_COLOR,
    marginLeft: scaledHeight(20),
    marginRight: scaledHeight(20)
  },
  menuContainer:{
      flex:1,
      flexDirection:'row' ,
      marginTop:scaledHeight(60)  
 },
menuItems:{
    flex:0.5,
    alignItems:'center'
},
menuItemText:{
    fontSize:scaledHeight(20),
    fontWeight:'500',
    marginTop:scaledHeight(10),
    color:StyledConstants.colors.FONT_COLOR
}
});
