import React from 'react';
import {Linking, Button, Text, TextInput, View} from 'react-native';

export class GameForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleProducerChange = this.handleProducerChange.bind(this);
        this.handleSendMail = this.handleSendMail.bind(this);

        this.state = { nameText: '', yearText: '', producerText: ''};
    }

    handleNameChange(nameText)
    {
        this.setState({nameText});
    }

    handleYearChange(yearText)
    {
        this.setState({yearText});
    }

    handleProducerChange(producerText)
    {
        this.setState({producerText});
    }

    handleSendMail()
    {
        //Send email
        let body = `Added a game with name: ${this.state.nameText}, release year: ${this.state.yearText}, producer: ${this.state.producerText}`;

        Linking.openURL('mailto:macajouu@yahoo.com?subject=React&body=' + body);

        this.setState({ nameText: '', yearText: '', producerText: ''});
    }

    handleAddGame()
    {
        let game = {    name: this.state.nameText,
                        releaseYear: this.state.yearText,
                        producer: this.state.producerText
        };

        this.setState({ nameText: '', yearText: '', producerText: ''});

        this.props.addGame(game);
    }


    render() {
        return (
            <View>
                <Text>Introduce input for a game:</Text>


                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    name='NameInput'
                    onChangeText={this.handleNameChange}
                    value={this.state.nameText}
                    placeholder='Name'
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    name='YearInput'
                    onChangeText={this.handleYearChange}
                    value={this.state.yearText}
                    placeholder='Release year'
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    name='ProducerInput'
                    onChangeText={this.handleProducerChange}
                    value={this.state.producerText}
                    placeholder='Producer'
                />

                <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}>
                    <Button
                        title='Send email'
                        onPress={this.handleSendMail}
                        disabled={this.props.viewOnly}
                    />
                </View>

                <Button
                    title='Add game'
                    onPress={this.handleAddGame.bind(this)}
                />
            </View>
        );
    }
}