import * as React from "react";
import { Button, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AttendanceScreen from "./Screens/AttendanceScreen.js";
import SummaryScreen from "./Screens/SummaryScreen.js";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppContainer />
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  Home: AttendanceScreen,
  Summary: SummaryScreen,
});

const AppContainer = createAppContainer(AppNavigator);
