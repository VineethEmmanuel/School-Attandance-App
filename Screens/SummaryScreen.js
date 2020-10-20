import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Header from "../components/Header.js";
import database from "../config.js";

var chk = [];
var stat;

export default class SummaryScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      presentCount: 0,
      absentCount: 0,
      unMarkedCount: 0,
    };
  }

  checkAttendance = () => {
    var attendRef = database.ref("classA/");
    attendRef.on("value", (data) => {
      chk = data.val();
    });
    var today = new Date();
    var day = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();

    today = day + "-" + mm + "-" + yy;

    for (var i in chk) {
      if (chk["" + i][today] === "present") {
        this.setState({ presentCount: this.state.presentCount + 1 });
      } else if (chk["" + i][today] === "absent") {
        this.setState({ absentCount: this.state.absentCount + 1 });
      } else if (chk[i][today] === undefined) {
        console.log(chk[i]);
        this.setState({ unMarkedCount: this.state.unMarkedCount + 1 });
      }
    }
  };

  componentDidMount() {
    var timeout = setInterval(this.checkAttendance, 1000);
    setTimeout(function () {
      clearInterval(timeout);
    }, 1100);
  }

  render() {
    return (
      <View>
        <Header myTitle="Summary"></Header>

        <Text style={style.textStyle}>
          Students Present :
          <Text style={{ color: "#1CA773" }}>{this.state.presentCount}</Text>
        </Text>

        <Text style={style.textStyle}>
          Students Absent :
          <Text style={{ color: "#EF7B76" }}>{this.state.absentCount}</Text>
        </Text>

        <Text style={style.textStyle}>
          Students Unmarked :
          <Text style={{ color: "#5F93E3" }}>{this.state.unMarkedCount}</Text>
        </Text>

        <Text style={{ fontSize: 25, textAlign: "center", marginTop: 30 }}>
          Total Students:{"\n"}
          <Text style={{ fontSize: 35, color: "purple" }}>
            {this.state.presentCount +
              this.state.absentCount +
              this.state.unMarkedCount}
          </Text>
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    marginTop: 40,
  },
});
