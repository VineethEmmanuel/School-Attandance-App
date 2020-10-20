import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

var today = new Date();
var mm = today.getMonth() + 1;
var dd = today.getDate();
var yy = today.getFullYear();

today = dd + " - " + mm + " - " + yy;

export default class Header extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.headerStyle}>{this.props.myTitle}</Text>
        <Text style={styles.classStyle}>Class A </Text>
        <Text style={styles.DateStyle}>{today}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    color: "black",
    backgroundColor: "#FF9055",
    textAlign: "center",
    fontSize: 28,
    textTransform: "uppercase",
  },
  classStyle: {
    fontSize: 21,
    textAlign: "center",
    paddingTop: 50,
  },
  DateStyle: {
    textAlign: "center",
    marginTop: 20,
  },
});
