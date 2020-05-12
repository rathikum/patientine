import React from "react";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { TabNavigator } from "react-navigation";
import ProfileScreen from "./Profile";
import VisittNoteScreen from "./VisitNote";
import BillingScreen from "./Billing";
import Medications from "./Medications";
import { Dimensions } from "react-native";
import AppointmentScreen from "./Appointment";
import { scaledHeight, scaledWidth } from '../Utils/Resolution';
import StyledConstants from "../constants/styleConstants";

export const Tabs = TabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Dashboard",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize:scaledHeight(16), color: StyledConstants.colors.WHITE_COLOR }}>
            {Icons.user}
          </FontAwesome>
        )
      }
    },
    Appointment: {
      screen: AppointmentScreen,
      navigationOptions: {
        tabBartabBarLabel: "Appointment",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize:scaledHeight(16), color: StyledConstants.colors.WHITE_COLOR }}>
            {Icons.calendar}
          </FontAwesome>
        )
      }
    },
    VisitNote: {
      screen: VisittNoteScreen,
      navigationOptions: {
        tabBarLabel: "VisitNote",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize:scaledHeight(16), color: StyledConstants.colors.WHITE_COLOR }}>
            {Icons.clipboard}
          </FontAwesome>
        )
      }
    },
    Medications: {
      screen: Medications,
      navigationOptions: {
        tabBarLabel: " Payment",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize:scaledHeight(16), color: StyledConstants.colors.WHITE_COLOR }}>
            {Icons.dollar}
          </FontAwesome>
        )
      }
    },
    Billing: {
      screen: BillingScreen,
      navigationOptions: {
        tabBarLabel: "Documents",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize:scaledHeight(16), color: StyledConstants.colors.WHITE_COLOR }}>
            {Icons.fileText}
          </FontAwesome>
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      labelStyle: {
        fontSize: scaledHeight(12),
        margin: 0
      },
      allowFontScaling: true,
      activeTintColor: "white",
      tabStyle: {
        width: Dimensions.get("window").width / 5,
        height: scaledHeight(50)
      },
      showIcon: true,
      style: {
        backgroundColor: StyledConstants.colors.primaryColor
      }
    }
  }
);
export default Tabs;
