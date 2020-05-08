import React from "react";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { TabNavigator } from "react-navigation";
import ProfileScreen from "./Profile";
import VisittNoteScreen from "./VisitNote";
import BillingScreen from "./Billing";
import Medications from "./Medications";
import { Dimensions } from "react-native";
import AppointmentScreen from "./Appointment";

export const Tabs = TabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Dashboard",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize: 14, color: "#fff" }}>
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
          <FontAwesome style={{ fontSize: 14, color: "#fff" }}>
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
          <FontAwesome style={{ fontSize: 14, color: "#fff" }}>
            {Icons.clipboard}
          </FontAwesome>
        )
      }
    },
    Medications: {
      screen: Medications,
      navigationOptions: {
        tabBarLabel: " Medications",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize: 14, color: "#fff" }}>
            {Icons.medkit}
          </FontAwesome>
        )
      }
    },
    Billing: {
      screen: BillingScreen,
      navigationOptions: {
        tabBarLabel: "Billing",
        tabBarIcon: () => (
          <FontAwesome style={{ fontSize: 14, color: "#fff" }}>
            {Icons.dollar}
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
        fontSize: 8,
        margin: 0
      },
      allowFontScaling: true,
      activeTintColor: "white",
      tabStyle: {
        width: Dimensions.get("window").width / 5,
        height: 50
      },
      showIcon: true,
      style: {
        backgroundColor: "#1B81E5"
      }
    }
  }
);
export default Tabs;
