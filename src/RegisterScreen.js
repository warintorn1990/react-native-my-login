import React, { Component } from "react";
import {
  StyleSheet,
  Alert,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  async onRegisterPressed() {
    try {
      // const {username, password} = this.state
      // await AsyncStorage.setItem('username', username)
      // await AsyncStorage.setItem('password', password)

      const { username, password } = this.state;
      const data = { username: username, password: password };

      axios
        .post("http://192.168.64.1:8082/api/v1/register", data)
        .then((response) => {
          const result = response.data.result;

          if (result == "success") {
            Alert.alert("Register Successful", "", [
              { text: "OK", onPress: () => this.props.navigation.goBack() },
            ]);
          } else {
            Alert.alert("Register Failed");
          }
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert(JSON.stringify(error));
        });
    } catch (error) {}

    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <TextInput
          onChangeText={(text) => this.setState({ username: text })}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          autoCorrect={false}
          style={styles.input}
          placeholder="Email"
        ></TextInput>
        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          style={styles.input}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
        ></TextInput>
        <TouchableHighlight
          onPress={this.onRegisterPressed.bind(this)}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableHighlight>
        <Text style={styles.error}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10,
    paddingTop: 80,
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 10,
    padding: 4,
    borderRadius: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48bbec33",
  },
  registerButton: {
    height: 50,
    backgroundColor: "#EB6663",
    alignSelf: "stretch",
    marginTop: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
  registerButtonText: {
    fontSize: 22,
    color: "#FFF",
    alignSelf: "center",
  },

  heading: {
    fontSize: 30,
    marginBottom: 40,
  },
  error: {
    color: "red",
    paddingTop: 10,
  },
  success: {
    color: "green",
    paddingTop: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default RegisterScreen;
