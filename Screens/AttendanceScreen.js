import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header.js";
import AttendanceButton from "../components/AttendanceButton.js";
import database from "../config.js";

var i = 0;

export default class AttendanceScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      student: [],
      i: 0,
    };
  }

  navigateScreen = () => {
    this.props.navigation.navigate("Summary");
  };

  showStudents = () => {
    var StudentRef = database.ref("classA/");
    var students = [];
    StudentRef.on("value", (data) => {
      var studentList = data.val();

      for (var stud in studentList) {
        students.push(studentList[stud]);
      }
    });

    this.setState({
      student: students,
    });
    students.sort(function (a, b) {
      return a.roll - b.roll;
    });
    students = [];
  };

  componentDidMount() {
    setInterval(this.showStudents, 1000);
  }

  render() {
    return (
      <View>
        <Header myTitle="Attendance App"></Header>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            textAlign: "center",
            marginLeft: 15,
            marginTop: 150,
          }}
        >
          {this.state.student.map((student) => (
            <View style={{ marginTop: 50 }} key={student + "" + student.roll}>
              <AttendanceButton rollno={student.roll}></AttendanceButton>
              <Text style={{ fontSize: 20, marginTop: -30 }}>
                {student.roll}. {student.name}
              </Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={this.navigateScreen}
          style={{
            borderRadius: 6,
            marginTop: 180,
            backgroundColor: "#FFF0E2",
            width: 112,
            height: 56,
            alignSelf: "center",
            borderColor: "black",
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#FF9055",
              textAlign: "center",
              marginTop: 12,
              fontWeight: "bold",
            }}
          >
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
