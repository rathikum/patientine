/*
This file is to maintain following, which to be used accross app.
  color constants
  font size
  padding and margin size
  #TODO::: 
*/
import {
    scaledHeight
  } from "../Utils/Resolution";
  
  const StyleConstants = {
    
    colors: {
      transparent: 'transparent',
      primaryColor: "#486D90", // blue
      GREEN:'#8BC105', // green
      ORANGE: '#EA7400', // orange
      RED: "#C71C2D",
      GRAY: '#8f8f8f',
      WHITE_COLOR: '#FFFFFF',
      BLACK: "#000000",

      BACKGROUND_GRAY: "#F7F7F7", // screen bg
      BACKGROUND_GRAY_1: "#FAFAFA",
      BACKGROUND_GRAY_2: "#EFEFEF",
      BACKGROUND_GRAY_3: "#F5F5F5",
      BORDER_GRAY: "#242623",
      ERROR_RED: "#FF0000",

      FONT_COLOR: '#56565A', // label field font color
      LBL_FIELD_COLOR: '#49494A', // label field font colo

      LIGHT_TRANSPARENT_GRAY: 'rgba(0,0,0,0.1)',
      COMP_BORDER_COLOR: "#D2D2D2",
    },

    fontSize: {
      heading3: scaledHeight(18),
      title: scaledHeight(36),
      ten: scaledHeight(10),
      eleven: scaledHeight(11),
      twelve: scaledHeight(12),
      thirteen: scaledHeight(13),
      fourteen: scaledHeight(14),
      fifteen: scaledHeight(15),
      sixteen: scaledHeight(16),
      eighteen: scaledHeight(18),
      twenty: scaledHeight(20),
      twentyTwo: scaledHeight(22),
      twentyFour: scaledHeight(24),
      twentyEight: scaledHeight(28),
      thirty: scaledHeight(30),
      thirtyTwo: scaledHeight(32),
      thirtySix: scaledHeight(36),
      fourtyEight: scaledHeight(48),
  
      inputLabel:scaledHeight(14), // input label font size
      inputText:scaledHeight(16), // input Text font size
     
    }
  };
  
  export default StyleConstants;