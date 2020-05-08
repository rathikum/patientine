import React, { Component } from "react";
import { StyleSheet, View, Text, CheckBox } from "react-native";
import { Divider } from "react-native-elements";
import { Card, CardContent } from "react-native-card-view";
export default class ForgetPassword extends Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      check: true
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Card
          styles={{
            card: { marginLeft: 15, borderRadius: 10, marginBottom: 10 }
          }}
        >
          <CardContent>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  width: 150,
                  marginTop: 10,
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: 10
                }}
              >
                Medications
              </Text>
              <Divider style={{ backgroundColor: "blue" }} />
            </View>
            <View
              style={{
                marginTop: 15,
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  width: 150
                }}
              >
                Arthane
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  width: 150
                }}
              >
                Prescribed By
              </Text>
              <Text style={{ fontSize: 18, width: 5, fontWeight: "500" }}>
                :
              </Text>
              <Text style={{ fontSize: 18, width: 195, paddingLeft: 50 }}>
                Surya
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  width: 150
                }}
              >
                Prescribed Date
              </Text>
              <Text style={{ fontSize: 18, width: 5, fontWeight: "500" }}>
                :
              </Text>
              <Text style={{ fontSize: 18, width: 195, paddingLeft: 60 }}>
                21/02/2018
              </Text>
            </View>
          </CardContent>
        </Card>
        <View>
          <Card
            styles={{
              card: { marginLeft: 15, borderRadius: 10, marginBottom: 10 }
            }}
          >
            <CardContent>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    width: 150,
                    marginTop: 10,
                    justifyContent: "center",
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                />

                <View style={{ flexDirection: "row" }}>
                  <CheckBox
                    value={this.state.checked}
                    onValueChange={() =>
                      this.setState({ checked: !this.state.checked })
                    }
                  />
                  <Text style={{ marginTop: 5 }}> Morning</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      value={this.state.check}
                      onValueChange={() =>
                        this.setState({ checked: !this.state.check })
                      }
                    />
                    <Text style={{ marginTop: 5 }}>Afternoon</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      value={this.state.check}
                      onValueChange={() =>
                        this.setState({ checked: !this.state.check })
                      }
                    />
                    <Text style={{ marginTop: 5 }}>Evening</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      value={this.state.check}
                      onValueChange={() =>
                        this.setState({ checked: !this.state.check })
                      }
                    />
                  </View>
                  <Text style={{ marginTop: 5 }}>Night</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    position: "absolute"
  }
});
