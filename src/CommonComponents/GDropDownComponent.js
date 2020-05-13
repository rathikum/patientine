import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList,SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from "prop-types";
import { scaledHeight, scaledWidth, getCustomStyle } from '../Utils/Resolution';
import StyleConstants from "../constants/styleConstants";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
      alignSelf: 'stretch',
      backgroundColor: StyleConstants.colors.BACKGROUND_GRAY,
  },
  dividerGreenLine: {
      backgroundColor: StyleConstants.colors.GREEN,
      height: 2,
      margin: 0
  },
  dividerLine: {
      backgroundColor: 'lightgray', height: 1,
      margin: 0
  },
  dropDownTextName: {
      alignSelf: 'flex-start',
      color: StyleConstants.colors.FONT_COLOR,
      fontSize: scaledHeight(14),
      textAlign: "left",
      textAlignVertical: 'center'
  },
  dropwDownImgContainer: {
      alignItems: "center",
      alignSelf: "center",
      // backgroundColor: StyleConstants.colors.DARK_ORANGE,
      flex: 0.1,
      justifyContent: "center",
      marginRight: scaledWidth(10),

  },
  errorTextStyle: {
      color: 'red',
      fontSize: scaledHeight(12),
      marginBottom: scaledHeight(10),
      marginTop: scaledHeight(5),
      textAlignVertical: 'top',
  },
  grayBorderContainer: {
      alignContent: 'center',
      alignSelf: 'stretch',
      backgroundColor: StyleConstants.colors.WHITE_COLOR,
      borderColor: StyleConstants.colors.COMP_BORDER_COLOR,
      borderRadius: scaledHeight(0),
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scaledHeight(10),
      marginTop: scaledHeight(5),
      minHeight: scaledHeight(52)
  },
  headingStyle: {
      color: StyleConstants.colors.primaryColor,
      fontSize: StyleConstants.fontSize.twenty,
      fontWeight: "600",
      marginHorizontal: scaledHeight(15),
      marginVertical: scaledHeight(20),
      textAlign: 'center',
      textAlignVertical: 'center',
  },
  highlightItem: {
      backgroundColor: StyleConstants.colors.primaryColor,
      fontSize: scaledHeight(15),
      justifyContent: 'center',
      minHeight: scaledHeight(50),
  },
  highlightText: {
      alignSelf: 'center',
      color: StyleConstants.colors.WHITE_COLOR,
      marginHorizontal: scaledHeight(5),
      marginVertical: scaledHeight(15),
      textAlign: 'center',
      textAlignVertical: 'center'
  },
  imageStyle: {
      alignItems: "flex-end",
      alignSelf: "center",
      height: scaledHeight(30),
      justifyContent: "flex-end",
      width: scaledWidth(30)
  },
  itemStyle: {
      fontSize:scaledHeight(14),
      justifyContent: 'center',
      minHeight: scaledHeight(50),
  },
  itemTextStyle: {
      alignSelf: 'center',
      marginHorizontal: scaledHeight(5),
      marginVertical: scaledHeight(15),
      textAlign: 'center',
      textAlignVertical: 'center'
  },
  listStyle: {
  },
  modalStyle: {
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      margin: 0,
  },
  modalViewStyle: {
      alignContent: "flex-end",
      backgroundColor: StyleConstants.colors.WHITE_COLOR,
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 'auto',
      justifyContent: 'flex-end',
      width: '100%'
  },
  optionalTxt: {
      color: StyleConstants.colors.FONT_COLOR,
      flexWrap: 'wrap',
      fontSize: scaledHeight(14),
      fontWeight: 'normal',
      textAlign: "left",
      textAlignVertical: 'center',
  },
  safeAreaView: {
      alignSelf: 'flex-end',
      backgroundColor: 'white',
      flex: 0,
      width: '100%'
  },
  selectedTxtStyle: {
      alignSelf: 'center',
      // backgroundColor: StyleConstants.colors.BLUE,
      color: StyleConstants.colors.LBL_FIELD_COLOR,
      flex: 0.9,
      fontSize: scaledHeight(14),
      marginHorizontal: scaledHeight(24),
      marginVertical: scaledHeight(10),
      paddingVertical: scaledHeight(5),
      textAlign: "left",
      textAlignVertical: 'center',
  }
});

class GDropDownComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            scrollYIndex: 0,
            selectedText: this.getInitialItem(props.selectedKey),
            currentKey: props.selectedKey ? props.selectedKey : "-1",
            // disabled: false,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { prompt, itemToDisplay, selectedKey, data, itemToIterate } = nextProps;
        const value1 = data.find(element => element[`${itemToIterate}`] === selectedKey || element[`${itemToDisplay}`] === selectedKey);
        if (selectedKey && selectedKey !== "-1") {
            if (prevState.currentKey !== selectedKey) {
                return ({
                    selectedText: selectedKey ? value1[`${itemToDisplay}`] : prompt,
                    currentKey: selectedKey
                });

            }
        }
        return prevState;
    }

    getInitialItem = (key) => {
        const { data, itemToIterate, itemToDisplay, prompt } = this.props;
        if (key && key !== "-1") {
            const v1 = data.find(element => element[`${itemToIterate}`] === key || element[`${itemToDisplay}`] === key);
            return v1 ? v1[`${itemToDisplay}`] : prompt;
        }
        return prompt;
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }));
    }

    closeModal = async () => {
        this.setState({ showModal: false });
    }

    keyExtractor = (item) => {
        const { itemToIterate } = this.props;
        return item[`${itemToIterate}`];
    }

    setRefForList = ref => { this.flatListD = ref; }

    getItemLayout = (data, index) => (
        { length: scaledHeight(50), offset: scaledHeight(50) * index, index }
    )

    scrollToIndex = (indx) => {
        this.flatListD.scrollToIndex({ animated: true, index: indx, viewPosition: 0 });
    }

    highlightItem = (itm) => () => {
        const { onSelectedItem, itemToDisplay } = this.props;
        this.setState({
            selectedText: itm[`${itemToDisplay}`],
            // error: false
        });
        this.closeModal();
        onSelectedItem(itm);
    };

    renderItem = ({ item, index }) => {
        const { itemToDisplay } = this.props;
        const { selectedText } = this.state;
        const hightLight = selectedText === item[`${itemToDisplay}`];
        if (hightLight) {
            if (index >= 6) {
                if (index > 10) {
                    this.scrollToIndex(index);
                } else {
                    this.setState({ scrollYIndex: index });
                }
            } else {
                this.setState({ scrollYIndex: 0 });
            }
        }
        const itemStyle = hightLight ? styles.highlightItem : styles.itemStyle;
        const itemTextStyle = hightLight ? styles.highlightText : styles.itemTextStyle;

        return (
            <View style={itemStyle}>
                <TouchableOpacity style={itemStyle} onPress={this.highlightItem(item)}>
                    <Text style={itemTextStyle}>{item[`${itemToDisplay}`]}</Text>
                </TouchableOpacity>
                <View style={styles.dividerLine} />
            </View>
        );
    };

    getArrayStyle = (defaultStyle = {}, propStyle = {}, errorStyle = {}) => {
        return {
            ...defaultStyle,
            ...propStyle,
            ...errorStyle
        };
    };

    render() {
        const {
            data,
            title, isOptional, showTitle,
            titleStyle,
            containerStyle,
            selectedTextStyle,
            errorFlag,
            errorTextStyle,
            errorText,
            inputref,
            disable
        } = this.props;

        const { showModal, selectedText, scrollYIndex } = this.state;
       
        return (
            <View style={styles.container} >
                {showTitle && <Text style={getCustomStyle(styles.dropDownTextName, titleStyle)}><Text style={getCustomStyle(styles.dropDownTextName, titleStyle)}>{title}</Text>{isOptional && <Text style={styles.optionalTxt}>{"   [Optional]"}</Text>}</Text>}

                <TouchableOpacity style={errorFlag ? this.getArrayStyle(styles.grayBorderContainer, containerStyle, { borderColor: 'red' }) :
                    getCustomStyle(styles.grayBorderContainer, containerStyle)}
                    onPress={!disable ? this.toggleModal : null}
                    ref={inputref}
                >
                    <Text style={getCustomStyle(styles.selectedTxtStyle, selectedTextStyle)} numberOfLines={1} ellipsizeMode="tail">{selectedText}</Text>
                    <View style={styles.dropwDownImgContainer}>
                      <MaterialIcon
                        style={styles.textIcon}
                        size={22}
                        name='keyboard-arrow-down'
                        color='#194C7D'
                    />
                    </View>
                </TouchableOpacity>
                {errorFlag &&
                    <Text style={getCustomStyle(styles.errorTextStyle, errorTextStyle)}>{errorText}</Text>}
                <Modal style={styles.modalStyle}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    onRequestClose={this.closeModal}
                    onBackdropPress={this.closeModal}
                    backdropOpacity={0.3}
                    isVisible={showModal}
                >
                    <View style={data.length > 5 ? getCustomStyle(styles.modalViewStyle, { maxHeight: "50%" }) : styles.modalViewStyle}>
                        <SafeAreaView style={data.length > 5 ? getCustomStyle(styles.safeAreaView, { maxHeight: "100%" }) : styles.safeAreaView}>
                            <Text style={styles.headingStyle}>{title}</Text>
                            <View style={styles.dividerGreenLine} />
                            <FlatList
                                style={styles.listStyle}
                                data={data}
                                ref={this.setRefForList}
                                disableVirtualization={false}
                                initialScrollIndex={scrollYIndex}
                                showsVerticalScrollIndicator={false}
                                getItemLayout={this.getItemLayout}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                                bounces={false}
                                keyboardShouldPersistTaps="always"
                            />
                        </SafeAreaView>
                    </View>
                </Modal>
            </View>
        );
    }
}
GDropDownComponent.propTypes = {
    inputref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.object })
    ]),
    showTitle: PropTypes.bool,
    title: PropTypes.string,
    data: PropTypes.arrayOf(Array),
    itemToIterate: PropTypes.string,
    itemToDisplay: PropTypes.string,
    onSelectedItem: PropTypes.instanceOf(Object),
    titleStyle: PropTypes.instanceOf(Object),
    containerStyle: PropTypes.instanceOf(Object),
    errorTextStyle: PropTypes.instanceOf(Object),
    selectedTextStyle: PropTypes.instanceOf(Object),
    selectedKey: PropTypes.string,
    prompt: PropTypes.string,
    disable: PropTypes.bool,
    isOptional: PropTypes.bool,
    errorFlag: PropTypes.bool,
    errorText: PropTypes.string
};
GDropDownComponent.defaultProps = {
    inputref: () => { },
    showTitle: true,
    title: "", // M
    data: [], // M
    itemToIterate: "", // M
    itemToDisplay: "", // M
    onSelectedItem: {}, // M
    titleStyle: {},
    containerStyle: {},
    errorTextStyle: {},
    selectedTextStyle: {},
    selectedKey: "-1",
    prompt: "Select",
    disable: false,
    isOptional: false,
    errorFlag: false,
    errorText: "",
};

export default GDropDownComponent;