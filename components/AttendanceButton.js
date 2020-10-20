import * as React from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import database from "../config.js";

var presentBtnClicked = 0;
var absentBtnClicked = 0;

export default class AttendanceButton extends React.Component {
  constructor() {
    super();

    this.state = {
      presentStyle: {
        color: "black",
        backgroundColor: "white",
        borderColor: "black",
        padding: 15,
        width: 80,
        height: 20,
        textAlign: "center",
        marginRight: 10,
        marginLeft: 150,
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        zIndex: 1,
      },
      absentStyle: {
        color: "black",
        backgroundColor: "white",
        borderColor: "black",
        padding: 15,
        width: 80,
        height: 20,
        textAlign: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderWidth: 2,
        marginLeft: 15,
      },
    };
  }

  checkAttend = () => {
    var roll = this.props.rollno;
    var id = "";
    if (roll <= 9) {
      id = "0" + roll;
    } else {
      id = id + roll;
    }

    var today = new Date();
    var day = today.getDate();
    var mm = today.getMonth();
    var yy = today.getFullYear();

    today = day + "-" + mm + "-" + yy;

    var attendRef = database.ref("classA/" + id);
    attendRef.on("value", (data) => {
      var i = data.val();

      if (i[today] === "present") {
        presentBtnClicked = 1;
        absentBtnClicked = 1;
        this.setState({
          presentStyle: {
            ...this.state.presentStyle,
            color: "white",
            backgroundColor: "#1CA773",
          },
        });
      } else if (i[today] === "absent") {
        absentBtnClicked = 1;
        presentBtnClicked = 1;
        this.setState({
          absentStyle: {
            ...this.state.absentStyle,
            color: "white",
            backgroundColor: "#EF7B76",
          },
        });
      }
    });
  };

  componentDidMount() {}

  updateAttendance(roll, status) {
    var id = "";
    if (roll <= 9) {
      id = "0" + roll;
    } else {
      id = id + roll;
    }

    var today = new Date();
    var day = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();

    today = day + "-" + mm + "-" + yy;

    var attendRef = database.ref("classA/" + id);
    attendRef.update({
      [today]: status,
    });
  }

  markPresent = () => {
    Alert.alert("Present");
    if (absentBtnClicked === 0) {
      this.setState({
        presentStyle: {
          ...this.state.presentStyle,
          color: "white",
          backgroundColor: "#1CA773",
        },
      });
    } else {
      this.setState({
        presentStyle: {
          ...this.state.presentStyle,
          color: "white",
          backgroundColor: "#1CA773",
        },
        absentStyle: {
          ...this.state.absentStyle,
          color: "black",
          backgroundColor: "white",
        },
      });
    }
    absentBtnClicked = 0;
    presentBtnClicked = 1;
    this.updateAttendance(this.props.rollno, "present");
  };

  markAbsent = () => {
    Alert.alert("Absent");
    if (presentBtnClicked === 0) {
      this.setState({
        absentStyle: {
          ...this.state.absentStyle,
          color: "white",
          backgroundColor: "#EF7B76",
        },
      });
    } else {
      this.setState({
        absentStyle: {
          ...this.state.absentStyle,
          color: "white",
          backgroundColor: "#EF7B76",
        },
        presentStyle: {
          ...this.state.presentStyle,
          color: "black",
          backgroundColor: "white",
        },
      });
    }
    presentBtnClicked = 0;
    absentBtnClicked = 1;
    this.updateAttendance(this.props.rollno, "absent");
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={this.markPresent}
          style={[this.state.presentStyle, { marginTop: -20 }]}
          roll={this.props.rollno}
        >
          <Text style={{ fontSize: 8 }}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[this.state.absentStyle, { marginTop: -20 }]}
          roll={this.props.rollno}
          onPress={this.markAbsent}
        >
          <Text style={{ fontSize: 8 }}>Absent</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
