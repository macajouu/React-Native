import React from 'react';
import {Button, Text, View} from 'react-native';
import {StatusBar} from "react-native"
import {Card} from "../utils/Card";
import {CardSection} from "../utils/CardSection";
import {Input} from "../utils/Input";
import firebase from 'firebase';
import { CheckBox } from 'react-native-elements'
import {Spinner} from "../utils/Spinner";

export class LoginScreen extends React.Component
{
    static navigationOptions = {
        title: 'Login/Sign up',
        headerStyle: {paddingTop: StatusBar.currentHeight}
    }

    constructor(props)
    {
        super(props);

        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.state = {email: "", password: "", loginError: "", signUpError: "", user: null, viewOnly: false, loading: false}
    }

    onEmailChange(text) {
        this.setState({email: text});
    }

    onPasswordChange(text) {
        this.setState({password: text});
    }

    _loginUser(email, password)
    {
        this.setState({loading: true});
        console.log("login user");
        this.setState({loginError: "", signUpError: ""});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {

                this.setState({loading: false});
                this.props.navigation.navigate('Main');
            })
            //Can't login
            .catch(error => {
                console.log("Login failed! --- " + error);
                this.setState({loginError: error.message, loading: false});
            })
    }

    _signUpUser(email, password)
    {
        console.log("sign up user");
        this.setState({loginError: "", signUpError: ""});

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {//Created new user
                //console.log("Created new user: " + user.uid);

                firebase.database().ref("/users")
                    .child(user.uid).set({viewOnly: this.state.viewOnly});
            })
            .catch((error) => {
                console.log("Sign up failed! --- " + error);
                this.setState({signUpError: error.message});
            });
    }

    renderLoginError() {
        if (this.state.loginError) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.state.loginError}
                    </Text>
                </View>
            );
        }
    }

    renderSignUpError() {
        if (this.state.signUpError) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.state.signUpError}
                    </Text>
                </View>
            );
        }
    }

    renderLoginButton() {
        if (this.state.loading) {
            return <Spinner size='large' />;
        }
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Button
                    onPress={() => this._loginUser(this.state.email, this.state.password)}
                    title={"Login"}
                >
                </Button>
            </View>
        );
    }

    renderSignUpButton()
    {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <CheckBox
                    title='View Only'
                    checked={this.state.viewOnly}
                    onPress={() => this.setState({viewOnly: !this.state.viewOnly})}
                />
                <Button
                    onPress={() => this._signUpUser(this.state.email, this.state.password)}
                    title={"Sign up"}
                >
                </Button>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.state.email}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.state.password}
                        />
                    </CardSection>
                    {this.renderLoginError()}
                    <CardSection>
                        {this.renderLoginButton()}
                    </CardSection>
                </Card>

                <Card>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.state.email}
                        />
                    </CardSection>

                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.state.password}
                        />
                    </CardSection>
                    {this.renderSignUpError()}
                    <CardSection>
                        {this.renderSignUpButton()}
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    chart: {
        height: 300,
        width: 300
    }
};
